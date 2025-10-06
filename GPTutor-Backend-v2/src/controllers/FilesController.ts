import { FastifyRequest, FastifyReply } from "fastify";
import { BaseController } from "./BaseController";
import { FilesService } from "../services/FilesService";
import { FileRepository } from "../repositories/FileRepository";
import { RequestWithLogging } from "../middleware/loggingMiddleware";
import { createUniversalAuthMiddleware, AuthenticatedRequest, getUserId } from "../middleware/universalAuthMiddleware";
import { UserRepository } from "../repositories/UserRepository";
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
    private userRepository: UserRepository,
    private vkSecretKey: string = process.env.VK_SECRET_KEY || ""
  ) {
    super(fastify);
  }

  registerRoutes(): void {
    const authMiddleware = createUniversalAuthMiddleware(
      this.userRepository,
      this.vkSecretKey
    );

    const uploadRateLimit = createRateLimitMiddleware(
      getRateLimitConfig("/upload")!
    );

    this.fastify.post(
      "/upload",
      {
        preHandler: [authMiddleware, uploadRateLimit],
        config: {
          bodyLimit: 50 * 1024 * 1024,
        },
      },
      this.uploadFile.bind(this)
    );
  }

  private async uploadFile(request: AuthenticatedRequest, reply: FastifyReply) {
    try {
      const userId = getUserId(request);
      
      this.logInfo("File upload requested", {
        userId: userId,
        vkId: request.user?.vkId,
      });

      const data = await (request as any).file();

      if (!data) {
        return this.sendError(reply, "No file provided", 400, request as any);
      }

      const maxSize = 50 * 1024 * 1024;
      if (data.file.bytesRead > maxSize) {
        return this.sendError(
          reply,
          "File too large. Maximum size is 50MB",
          413,
          request as any as any
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

      const result = await this.filesService.optimizeAndUploadFile(
        arrayBuffer,
        data.filename
      );

      const savedFile = await this.fileRepository.create({
        userId: userId,
        type: data.mimetype,
        name: data.filename,
        url: result.url,
        size: data.file.bytesRead,
      });

      this.logInfo("File uploaded successfully", {
        fileId: savedFile.id,
        fileName: savedFile.name,
        url: savedFile.url,
        userId: userId,
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
          return this.sendError(reply, "Unsupported file type", 400, request as any);
        }
        if (error.message.includes("Invalid filename")) {
          return this.sendError(reply, "Invalid filename", 400, request as any);
        }
      }

      return this.sendError(reply, "Failed to upload file", 500, request as any);
    }
  }
}
