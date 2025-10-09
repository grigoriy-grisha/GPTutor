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

      const result = await this.filesService.optimizeAndUploadFile(
        arrayBuffer,
        data.filename
      );

      let finalMimeType = data.mimetype;
      let finalFileName = data.filename;

      if (result.finalFileName !== data.filename) {
        finalMimeType = "application/pdf";
        finalFileName = result.finalFileName;

        this.logInfo("File was converted to PDF", {
          originalName: data.filename,
          originalType: data.mimetype,
          finalName: finalFileName,
          finalType: finalMimeType,
        });
      }

      const savedFile = await this.fileRepository.create({
        userId: request.dbUser.id,
        type: finalMimeType,
        name: finalFileName,
        url: result.url,
        size: data.file.bytesRead,
      });

      this.logInfo("File uploaded successfully", {
        fileId: savedFile.id,
        fileName: savedFile.name,
        url: savedFile.url,
        userId: request.dbUser.id,
        wasConverted: finalFileName !== data.filename,
      });

      return this.sendSuccess(reply, {
        message:
          finalFileName !== data.filename
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
        converted: finalFileName !== data.filename,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logError("File upload failed", error);

      if (error instanceof Error) {
        const errorMessage = error.message;

        if (errorMessage.includes("Unknown or unsupported file type")) {
          return this.sendError(reply, "Unsupported file type", 400, request);
        }
        
        if (errorMessage.includes("Invalid filename")) {
          return this.sendError(reply, "Invalid filename", 400, request);
        }
        
        if (errorMessage.includes("LibreOffice not found")) {
          return this.sendError(
            reply,
            "Document conversion requires LibreOffice. Please contact administrator.",
            503,
            request
          );
        }
        
        if (errorMessage.includes("Failed to read document") || 
            errorMessage.includes("corrupted")) {
          return this.sendError(
            reply,
            "Failed to convert document. The file may be corrupted or password-protected.",
            400,
            request
          );
        }
        
        if (errorMessage.includes("Failed to convert document to PDF")) {
          return this.sendError(
            reply,
            "Failed to convert document to PDF. Please try again or use a different file.",
            400,
            request
          );
        }
      }

      return this.sendError(reply, "Failed to upload file", 500, request);
    }
  }
}
