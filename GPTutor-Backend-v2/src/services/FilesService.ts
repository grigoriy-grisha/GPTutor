import sharp from "sharp";
import { compress } from "compress-pdf";
//@ts-ignore
import EasyYandexS3 from "easy-yandex-s3";
import crypto from "crypto";
import { S3 } from "aws-sdk";
import { logger } from "./LoggerService";
//@ts-ignore
import libre from "libreoffice-convert";
import { promisify } from "util";

// Используем extend для callback, чтобы избежать deprecation warning
const libreConvert = promisify(libre.convert.bind(libre));

const FILE_EXTENSIONS = {
  photo: ["jpg", "jpeg", "png", "gif", "svg", "webp"],
  document: ["pdf", "doc", "docx", "ppt", "pptx"],
  text: [
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
  ],
  convertible: ["doc", "docx", "ppt", "pptx"],
} as const;

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
    return splitFileName[splitFileName.length - 1].toLowerCase();
  }

  private getFileWithExtension(name: string, originalFileName: string): string {
    return `${name}.${this.getExtension(originalFileName)}`;
  }

  /**
   * Проверяет, нужна ли конвертация файла в PDF
   */
  private needsConversionToPdf(fileName: string): boolean {
    const extension = this.getExtension(fileName);
    return FILE_EXTENSIONS.convertible.includes(
      extension as (typeof FILE_EXTENSIONS.convertible)[number]
    );
  }

  /**
   * Конвертирует документ в PDF с помощью LibreOffice (через libreoffice-convert)
   * Работает напрямую с буферами без создания временных файлов
   */
  private async convertToPdf(
    buffer: Buffer,
    originalFileName: string
  ): Promise<{ buffer: Buffer; newFileName: string }> {
    const startTime = Date.now();

    try {
      logger.info("Converting document to PDF using libreoffice-convert", {
        fileName: originalFileName,
        fileSize: buffer.length,
      });

      // Определяем расширение выходного файла
      const ext = ".pdf";

      // Конвертируем буфер напрямую в PDF
      // @ts-ignore - libreoffice-convert не имеет типов TypeScript
      const pdfBuffer: Buffer = await libreConvert(buffer, ext, undefined);

      const duration = Date.now() - startTime;

      // Проверяем результат
      if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new Error("Conversion resulted in empty buffer");
      }

      // Формируем финальное имя файла
      const baseFileName = originalFileName.substring(
        0,
        originalFileName.lastIndexOf(".")
      );
      const finalPdfFileName = `${baseFileName}.pdf`;

      logger.info("Document converted to PDF successfully", {
        originalFileName,
        finalPdfFileName,
        originalSize: buffer.length,
        pdfSize: pdfBuffer.length,
        durationMs: duration,
      });

      return {
        buffer: pdfBuffer,
        newFileName: finalPdfFileName,
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = (error as Error).message;

      logger.error("Failed to convert document to PDF", error, {
        fileName: originalFileName,
        durationMs: duration,
        errorMessage,
      });

      // Определяем тип ошибки для более понятного сообщения
      if (
        errorMessage.includes(
          "Could not find platform independent libraries"
        ) ||
        errorMessage.includes("soffice") ||
        errorMessage.includes("LibreOffice")
      ) {
        throw new Error("Конвертация временно недоступна");
      }

      if (errorMessage.includes("Document is empty")) {
        throw new Error("Файл повреждён или пуст");
      }

      throw new Error("Ошибка конвертации в PDF");
    }
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
    const extension = this.getExtension(fileName);

    logger.info("TypeFile", typeFile);

    // Конвертируем doc/docx/ppt/pptx в PDF
    if (this.needsConversionToPdf(fileName)) {
      logger.info("Document needs conversion to PDF", { fileName, extension });
      const buffer = Buffer.from(arrayBuffer);
      const { buffer: pdfBuffer } = await this.convertToPdf(buffer, fileName);

      // Оптимизируем полученный PDF
      logger.info("Optimizing converted PDF");
      return await compress(pdfBuffer);
    }

    // if (typeFile === "photo") {
    //   return await this.optimizePhotos(arrayBuffer, fileName);
    // }

    if (typeFile === "text") {
      return Buffer.from(arrayBuffer).toString("utf-8");
    }

    if (extension === "pdf") {
      return await compress(Buffer.from(arrayBuffer));
    }

    return Buffer.from(arrayBuffer);
  }

  private determineFileType(filename: string): "photo" | "document" | "text" {
    if (filename.length === 0) {
      throw new Error("Пустое имя файла");
    }

    const dotIndex = filename.lastIndexOf(".");
    if (dotIndex === -1 || dotIndex === filename.length - 1) {
      throw new Error("Файл без расширения");
    }

    const extension = filename.slice(dotIndex + 1).toLowerCase();

    if (
      FILE_EXTENSIONS.photo.includes(
        extension as (typeof FILE_EXTENSIONS.photo)[number]
      )
    ) {
      return "photo";
    }
    if (
      FILE_EXTENSIONS.document.includes(
        extension as (typeof FILE_EXTENSIONS.document)[number]
      )
    ) {
      return "document";
    }
    if (
      FILE_EXTENSIONS.text.includes(
        extension as (typeof FILE_EXTENSIONS.text)[number]
      )
    ) {
      return "text";
    }

    throw new Error(`Формат .${extension} не поддерживается`);
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
    finalFileName: string;
  }> {
    let finalFileName = fileName;

    console.log(
      "this.needsConversionToPdf(fileName)",
      this.needsConversionToPdf(fileName)
    );
    if (this.needsConversionToPdf(fileName)) {
      const baseFileName = fileName.substring(0, fileName.lastIndexOf("."));
      finalFileName = `${baseFileName}.pdf`;
    }

    const optimizedData = await this.optimizeAttachment(arrayBuffer, fileName);
    const uploadResult = await this.uploadFile(optimizedData, finalFileName);
    console.log(uploadResult);
    logger.info("UploadResult", uploadResult);

    return {
      url: uploadResult.Location,
      optimizedData,
      finalFileName,
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
