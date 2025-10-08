import sharp from "sharp";
import { compress } from "compress-pdf";
//@ts-ignore
import EasyYandexS3 from "easy-yandex-s3";
import crypto from "crypto";
import { S3 } from "aws-sdk";
import { logger } from "./LoggerService";

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YANDEX_ACCESS_KEY_ID!,
    secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY!,
  },
  httpOptions: {
    timeout: 60000,
  },
  Bucket: process.env.YANDEX_BUCKET!,
  debug: process.env.NODE_ENV === "development",
});

export class FilesService {
  private getExtension(fileName: string): string {
    const splitFileName = fileName.split(".");
    return splitFileName[splitFileName.length - 1];
  }

  private getFileWithExtension(name: string, originalFileName: string): string {
    return `${name}.${this.getExtension(originalFileName)}`;
  }

  private async optimizePhotos(
    arrayBuffer: ArrayBuffer,
    fileName: string
  ): Promise<Buffer> {
    try {
      let extension = this.getExtension(fileName);

      if (extension === "jpg") {
        extension = "jpeg";
      }

      const createdSharp = sharp(arrayBuffer);
      if (extension in createdSharp) {
        // @ts-ignore
        return await createdSharp[extension]({ quality: 60 }).toBuffer();
      }

      return Buffer.from(arrayBuffer);
    } catch (error) {
      console.log("Error optimizing photo:", error);
      return Buffer.from(arrayBuffer);
    }
  }

  private async optimizeAttachment(
    arrayBuffer: ArrayBuffer,
    fileName: string
  ): Promise<ArrayBuffer | Buffer | string | Uint8Array> {
    const typeFile = this.determineFileType(fileName);

    logger.info("TypeFile", typeFile);
    if (typeFile === "photo") {
      return await this.optimizePhotos(arrayBuffer, fileName);
    }

    if (typeFile === "text") {
      return Buffer.from(arrayBuffer).toString("utf-8");
    }

    const extension = this.getExtension(fileName);

    if (extension === "pdf") {
      return await compress(Buffer.from(arrayBuffer));
    }

    if (extension === "pptx") {
      return Buffer.from(arrayBuffer);
    }

    return Buffer.from(arrayBuffer);
  }

  private determineFileType(filename: string): "photo" | "document" | "text" {
    if (filename.length === 0) {
      throw new Error("Invalid filename: Must be a non-empty string.");
    }

    const photoExtensions: string[] = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "bmp",
      "svg",
      "webp",
      "tiff",
      "tif",
    ];

    const documentExtensions: string[] = [
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "csv",
    ];

    const textExtensions: string[] = [
      "txt",
      "js",
      "html",
      "css",
      "json",
      "xml",
      "md",
      "log",
      "py",
      "java",
      "c",
      "cpp",
      "h",
      "sh",
      "config",
      "conf",
      "ini",
      "yml",
      "yaml",
      "sql",
    ];

    const dotIndex: number = filename.lastIndexOf(".");

    if (dotIndex === -1 || dotIndex === filename.length - 1) {
      throw new Error(`Unknown file type: '${filename}' has no extension.`);
    }

    const extension: string = filename.slice(dotIndex + 1).toLowerCase();

    if (photoExtensions.includes(extension)) {
      return "photo";
    } else if (documentExtensions.includes(extension)) {
      return "document";
    } else if (textExtensions.includes(extension)) {
      return "text";
    } else {
      throw new Error(
        `Unknown or unsupported file type with extension '.${extension}'.`
      );
    }
  }

  async uploadFile(
    arrayBuffer: ArrayBuffer | string | Buffer | Uint8Array,
    name: string
  ): Promise<S3.ManagedUpload.SendData> {
    console.log(arrayBuffer);
    logger.info("File Name", {
      name: this.getFileWithExtension(crypto.randomUUID(), name),
    });
    return (await s3.Upload(
      {
        //@ts-ignore
        buffer: arrayBuffer,
        name: this.getFileWithExtension(crypto.randomUUID(), name),
      },
      "/"
    )) as S3.ManagedUpload.SendData;
  }

  async optimizeAndUploadFile(
    arrayBuffer: ArrayBuffer,
    fileName: string
  ): Promise<{
    url: string;
    optimizedData: ArrayBuffer | Buffer | string | Uint8Array;
  }> {
    const optimizedData = await this.optimizeAttachment(arrayBuffer, fileName);
    const uploadResult = await this.uploadFile(optimizedData, fileName);
    console.log(uploadResult);
    logger.info("UploadResult", uploadResult);

    return {
      url: uploadResult.Location,
      optimizedData,
    };
  }

  /**
   * Удаляет файл из S3 по URL
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Извлекаем имя файла из URL
      const url = new URL(fileUrl);
      const fileName = url.pathname.substring(1); // Убираем первый слеш

      logger.info("Deleting file from S3", { fileName, fileUrl });

      await s3.Remove(fileName);

      logger.info("File deleted from S3 successfully", { fileName });
    } catch (error) {
      logger.error("Failed to delete file from S3", error, { fileUrl });
      throw error;
    }
  }
}
