import { FastifyRequest, FastifyReply } from "fastify";
import { BaseController } from "./BaseController";
import { FilesService } from "../services/FilesService";
import { FileRepository } from "../repositories/FileRepository";
import { RequestWithLogging } from "../middleware/loggingMiddleware";
import { createVkAuthMiddleware } from "../middleware/authMiddleware";
import { AuthService } from "../services/AuthService";
import {
  createRateLimitMiddleware,
  getRateLimitConfig,
} from "../middleware/rateLimitMiddleware";

const UPLOAD_ERROR_MAPPINGS: ReadonlyArray<{
  patterns: string[];
  status: number;
  message?: string;
}> = [
  { patterns: ["не поддерживается", "Формат"], status: 400 },
  { patterns: ["Пустое имя"], status: 400 },
  { patterns: ["без расширения"], status: 400 },
  { patterns: ["временно недоступна", "Конвертация"], status: 503 },
  { patterns: ["повреждён", "пуст"], status: 400 },
  { patterns: ["Ошибка конвертации"], status: 400 },

  {
    patterns: ["Unknown or unsupported file type"],
    status: 400,
    message: "Формат не поддерживается",
  },
  { patterns: ["Invalid filename"], status: 400, message: "Некорректное имя" },
  {
    patterns: ["LibreOffice not found"],
    status: 503,
    message: "Конвертация недоступна",
  },
  {
    patterns: ["Failed to read document", "corrupted"],
    status: 400,
    message: "Файл повреждён",
  },
  {
    patterns: ["Failed to convert document to PDF"],
    status: 400,
    message: "Ошибка конвертации",
  },
];

const DEFAULT_UPLOAD_ERROR = { message: "Ошибка загрузки", status: 500 };

export class FilesController extends BaseController {
  constructor(
    fastify: any,
    private filesService: FilesService,
    private fileRepository: FileRepository,
    private authService: AuthService
  ) {
    super(fastify);
  }

  registerRoutes(): void {
    const vkAuthMiddleware = createVkAuthMiddleware(this.authService);

    const uploadRateLimit = createRateLimitMiddleware(
      getRateLimitConfig("/upload")!
    );

    this.fastify.post(
      "/upload",
      {
        preHandler: [uploadRateLimit, vkAuthMiddleware] as any,
        config: {
          bodyLimit: 50 * 1024 * 1024,
        },
      },
      this.uploadFile.bind(this)
    );
  }

  private async uploadFile(request: any, reply: FastifyReply) {
    try {
      this.logInfo("File upload requested", {
        userId: request.dbUser.id,
        vkId: request.dbUser.vkId,
      });

      const data = await (request as any).file();

      if (!data) {
        return this.sendError(reply, "Файл не выбран", 400, request);
      }

      const maxSize = 50 * 1024 * 1024;
      if (data.file.bytesRead > maxSize) {
        return this.sendError(
          reply,
          "Файл слишком большой. Максимальный размер файла 50 МБ",
          413,
          request
        );
      }

      const fileBuffer = await data.toBuffer();
      const arrayBuffer = fileBuffer.buffer.slice(
        fileBuffer.byteOffset,
        fileBuffer.byteOffset + fileBuffer.byteLength
      );

      this.logInfo("Processing file", {
        fileName: data.filename,
        fileSize: data.file.bytesRead,
        mimeType: data.mimetype,
      });

      const existingFile =
        await this.fileRepository.findByNameAndSizeOrOriginal(
          data.filename,
          data.file.bytesRead
        );

      if (existingFile) {
        this.logInfo("File already exists, returning cached file", {
          fileId: existingFile.id,
          fileName: existingFile.name,
          url: existingFile.url,
          wasConverted: existingFile.converted,
          originalName: existingFile.originalName,
        });

        return this.sendSuccess(reply, {
          message: existingFile.converted
            ? "File already converted and cached!"
            : "File already exists!",
          file: {
            id: existingFile.id,
            name: existingFile.name,
            type: existingFile.type,
            url: existingFile.url,
            size: existingFile.size,
            createdAt: existingFile.createdAt,
          },
          converted: existingFile.converted,
          fromCache: true,
          timestamp: new Date().toISOString(),
        });
      }

      const result = await this.filesService.optimizeAndUploadFile(
        arrayBuffer,
        data.filename
      );

      let finalMimeType = data.mimetype;
      let finalFileName = data.filename;
      let wasConverted = false;

      if (result.finalFileName !== data.filename) {
        wasConverted = true;
        finalMimeType = "application/pdf";
        finalFileName = result.finalFileName;

        this.logInfo("File was converted to PDF", {
          originalName: data.filename,
          originalType: data.mimetype,
          originalSize: data.file.bytesRead,
          finalName: finalFileName,
          finalType: finalMimeType,
        });
      }

      // Сохраняем файл с информацией об оригинале (если был конвертирован)
      const savedFile = await this.fileRepository.create({
        userId: request.dbUser.id,
        type: finalMimeType,
        name: finalFileName,
        url: result.url,
        size: data.file.bytesRead, // Сохраняем оригинальный размер для правильного кеширования
        originalName: wasConverted ? data.filename : undefined,
        originalSize: wasConverted ? data.file.bytesRead : undefined,
        converted: wasConverted,
      });

      this.logInfo("File uploaded successfully", {
        fileId: savedFile.id,
        fileName: savedFile.name,
        url: savedFile.url,
        userId: request.dbUser.id,
        wasConverted: wasConverted,
        originalName: savedFile.originalName,
        originalSize: savedFile.originalSize,
      });

      return this.sendSuccess(reply, {
        message: wasConverted
          ? "File converted to PDF and uploaded successfully!"
          : "File uploaded successfully!",
        file: {
          id: savedFile.id,
          name: savedFile.name,
          type: savedFile.type,
          url: savedFile.url,
          size: savedFile.size,
          createdAt: savedFile.createdAt,
        },
        converted: wasConverted,
        fromCache: false,
        ...(wasConverted && {
          originalFile: {
            name: savedFile.originalName,
            size: savedFile.originalSize,
          },
        }),
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logError("File upload failed", error);

      const { message, status } = this.mapUploadError(error);
      return this.sendError(reply, message, status, request);
    }
  }

  private mapUploadError(error: unknown): { message: string; status: number } {
    if (!(error instanceof Error)) {
      return DEFAULT_UPLOAD_ERROR;
    }

    const errorMessage = error.message;

    for (const mapping of UPLOAD_ERROR_MAPPINGS) {
      if (mapping.patterns.some((pattern) => errorMessage.includes(pattern))) {
        return {
          message: mapping.message ?? errorMessage,
          status: mapping.status,
        };
      }
    }

    return DEFAULT_UPLOAD_ERROR;
  }
}
