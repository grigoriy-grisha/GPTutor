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

interface FileUploadRequest extends RequestWithLogging {
  vkUser: any;
  dbUser: any;
}

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
        return this.sendError(reply, "No file provided", 400, request);
      }

      const maxSize = 50 * 1024 * 1024;
      if (data.file.bytesRead > maxSize) {
        return this.sendError(
          reply,
          "File too large. Maximum size is 50MB",
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

      const existingFile = await this.fileRepository.findByNameAndSize(
        data.filename,
        data.file.bytesRead
      );

      if (existingFile) {
        this.logInfo("File already exists, returning existing file", {
          fileId: existingFile.id,
          fileName: existingFile.name,
          url: existingFile.url,
        });

        return this.sendSuccess(reply, {
          message: "File already exists!",
          file: {
            id: existingFile.id,
            name: existingFile.name,
            type: existingFile.type,
            url: existingFile.url,
            size: existingFile.size,
            createdAt: existingFile.createdAt,
          },
          timestamp: new Date().toISOString(),
        });
      }

      // Если файл не найден, загужаем в S3
      const result = await this.filesService.optimizeAndUploadFile(
        arrayBuffer,
        data.filename
      );

      const savedFile = await this.fileRepository.create({
        userId: request.dbUser.id,
        type: data.mimetype,
        name: data.filename,
        url: result.url,
        size: data.file.bytesRead,
      });

      this.logInfo("File uploaded successfully", {
        fileId: savedFile.id,
        fileName: savedFile.name,
        url: savedFile.url,
        userId: request.dbUser.id,
      });

      return this.sendSuccess(reply, {
        message: "File uploaded successfully!",
        file: {
          id: savedFile.id,
          name: savedFile.name,
          type: savedFile.type,
          url: savedFile.url,
          size: savedFile.size,
          createdAt: savedFile.createdAt,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logError("File upload failed", error);

      if (error instanceof Error) {
        if (error.message.includes("Unknown or unsupported file type")) {
          return this.sendError(reply, "Unsupported file type", 400, request);
        }
        if (error.message.includes("Invalid filename")) {
          return this.sendError(reply, "Invalid filename", 400, request);
        }
      }

      return this.sendError(reply, "Failed to upload file", 500, request);
    }
  }
}
