import { makeAutoObservable, runInAction } from "mobx";
import { MessageModel, MessageRole } from "./MessageModel";
import { API_BASE_URL, FileInfo, filesApi } from "../../../api";
import { UploadingFile } from "../types";

/**
 * ViewModel для управления состоянием чата
 */
class ChatViewModel {
  messages: MessageModel[] = [];
  isTyping: boolean = false;
  currentModel: string = "google/gemini-2.5-flash-lite";
  isOnlineMode: boolean = false; // Режим поиска в сети
  isLoading: boolean = false;
  error: string | null = null;
  attachedFiles: FileInfo[] = [];
  uploadingFiles: UploadingFile[] = [];

  private readonly MAX_FILES = 4;

  private showSnackbar?: (text: string, subtitle?: string) => void;

  constructor() {
    makeAutoObservable(this);
  }

  setSnackbarCallback(callback: (text: string, subtitle?: string) => void) {
    this.showSnackbar = callback;
  }

  getMessages(): MessageModel[] {
    return this.messages;
  }

  setModel(model: string) {
    console.log(this.currentModel);
    this.currentModel = model;
  }

  /**
   * Переключить режим поиска в сети
   */
  toggleOnlineMode() {
    this.isOnlineMode = !this.isOnlineMode;
  }

  /**
   * Установить режим поиска в сети
   */
  setOnlineMode(isOnline: boolean) {
    this.isOnlineMode = isOnline;
  }

  /**
   * Получить модель с модификатором :online если включен режим
   */
  getModelWithModifier(): string {
    return this.isOnlineMode
      ? `${this.currentModel}:online`
      : this.currentModel;
  }

  addMessage(
    role: MessageRole,
    content: string = "",
    isTyping: boolean = false,
    attachedFiles?: FileInfo[]
  ): MessageModel {
    const message = new MessageModel(
      Date.now().toString(),
      role,
      content,
      isTyping,
      attachedFiles
    );
    this.messages.push(message);
    return message;
  }

  async sendMessage(content: string) {
    if (
      (!content.trim() && this.attachedFiles.length === 0) ||
      this.isLoading ||
      this.uploadingFiles.length > 0
    )
      return;

    // Создаем сообщение пользователя с прикрепленными файлами
    this.addMessage(
      "user",
      content,
      false,
      this.attachedFiles.length > 0 ? [...this.attachedFiles] : undefined
    );

    // Очищаем прикрепленные файлы сразу после добавления в сообщение
    this.clearAttachedFiles();

    const assistantMessage = this.addMessage("assistant", "", true);
    this.setIsTyping(true);
    this.setIsLoading(true);
    this.setError(null);

    try {
      await this.streamCompletion(assistantMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      this.setError(
        error instanceof Error ? error.message : "Произошла ошибка"
      );
      assistantMessage.setContent(
        "Извините, произошла ошибка при отправке сообщения."
      );
    } finally {
      assistantMessage.setIsTyping(false);
      this.setIsTyping(false);
      this.setIsLoading(false);
    }
  }

  /**
   * Получить потоковый ответ от API
   */
  private async streamCompletion(message: MessageModel) {
    const apiUrl = `${API_BASE_URL}/v1/chat/completions`;

    // Формируем messages с поддержкой мультимодальности
    const formattedMessages = this.messages
      .filter((msg) => !msg.isTyping)
      .map((msg) => {
        if (
          (msg.images && msg.images.length > 0) ||
          (msg.files && msg.files.length > 0)
        ) {
          const content: any[] = [];

          if (msg.content) {
            content.push({
              type: "text",
              text: msg.content,
            });
          }

          if (msg.images) {
            content.push(...msg.images);
          }

          if (msg.files) {
            content.push(...msg.files);
          }

          return {
            role: msg.role,
            content: content,
          };
        }

        return {
          role: msg.role,
          content: msg.content,
        };
      });

    const requestBody = {
      model: this.getModelWithModifier(), // Используем модель с :online если включен режим
      messages: formattedMessages,
      stream: true,
      temperature: 0.7,
    };

    console.log("Sending request to:", apiUrl);
    console.log("Online mode:", this.isOnlineMode);
    console.log("Model with modifier:", this.getModelWithModifier());
    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.location}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          console.log({ line });
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            console.log("Received SSE data:", data);

            if (data === "[DONE]") {
              console.log("Stream completed");
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta;
              const content = delta?.content;
              const reasoning = delta?.reasoning;
              const annotations = delta?.annotations;
              const citations = parsed.citations;

              console.log({ delta });

              console.log("Parsed content:", content);
              console.log("Parsed reasoning:", reasoning);
              console.log("Parsed citations:", citations);
              console.log("Parsed annotations:", annotations);

              if (content) {
                runInAction(() => {
                  message.appendContent(content);
                });
              }

              if (reasoning) {
                runInAction(() => {
                  message.appendReasoning(reasoning);
                });
              }

              // Обрабатываем citations если есть
              if (
                citations &&
                Array.isArray(citations) &&
                citations.length > 0
              ) {
                console.log("Setting citations:", citations.length, "URLs");
                runInAction(() => {
                  message.setCitations(citations);
                });
              }

              console.log({ annotations });
              if (
                annotations &&
                Array.isArray(annotations) &&
                annotations.length > 0
              ) {
                console.log(
                  "Setting annotations:",
                  annotations.length,
                  "items"
                );
                runInAction(() => {
                  message.setAnnotations(annotations);
                });
              }

              if (parsed.usage) {
                runInAction(() => {
                  message.setUsage({
                    promptTokens: parsed.usage.prompt_tokens || 0,
                    completionTokens: parsed.usage.completion_tokens || 0,
                    totalTokens: parsed.usage.total_tokens || 0,
                    cost: parsed.usage.cost || 0,
                  });
                });
                console.log("Usage data:", parsed.usage);
              }

              if (parsed.error) {
                message.appendContent(
                  "При выполнении запроса что-то пошло не так! \n Попробуйте позже!"
                );
              }
            } catch (parseError) {
              console.warn(
                "Failed to parse SSE data:",
                parseError,
                "Data:",
                data
              );
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Установить состояние печатания
   */
  setIsTyping(isTyping: boolean) {
    this.isTyping = isTyping;
  }

  /**
   * Установить состояние загрузки
   */
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  /**
   * Установить ошибку
   */
  setError(error: string | null) {
    this.error = error;
  }

  /**
   * Очистить все сообщения
   */
  clearMessages() {
    this.messages = [];
    this.clearAttachedFiles();
    this.clearUploadingFiles();
  }

  /**
   * Загрузить файл
   */
  async uploadFile(file: File) {
    // Проверяем лимит файлов
    const totalFiles = this.attachedFiles.length + this.uploadingFiles.length;
    if (totalFiles >= this.MAX_FILES) {
      this.showSnackbar?.(
        "Достигнут лимит файлов",
        `Можно прикрепить не более ${this.MAX_FILES} файлов`
      );
      return Promise.reject(new Error(`Максимум ${this.MAX_FILES} файлов`));
    }

    const isDuplicate = this.attachedFiles.some(
      (f) => f.name === file.name && f.size === file.size
    );

    if (isDuplicate) {
      this.showSnackbar?.(
        "Файл уже прикреплен",
        `Файл "${file.name}" уже добавлен`
      );
      return Promise.reject(new Error("Файл уже прикреплен"));
    }

    // Проверяем, не загружается ли уже файл с таким именем и размером
    const isUploading = this.uploadingFiles.some(
      (f) => f.file.name === file.name && f.file.size === file.size
    );

    if (isUploading) {
      this.showSnackbar?.(
        "Файл уже загружается",
        `Файл "${file.name}" уже в процессе загрузки`
      );
      return Promise.reject(new Error("Файл уже загружается"));
    }

    const uploadId = `upload_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}_${file.name.replace(/[^a-zA-Z0-9]/g, "_")}`;
    const uploadingFile: UploadingFile = {
      id: uploadId,
      file: file,
      progress: 0,
    };

    // Сразу добавляем файл в список загружающихся
    runInAction(() => {
      this.uploadingFiles.push(uploadingFile);
      console.log(
        "Added uploading file:",
        uploadingFile.id,
        "Total uploading:",
        this.uploadingFiles.length
      );
    });

    // Создаем промис для загрузки, но не ждем его здесь
    return this.performUpload(uploadingFile);
  }

  private async performUpload(uploadingFile: UploadingFile) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await filesApi.uploadFile(uploadingFile.file);

      runInAction(() => {
        this.uploadingFiles = this.uploadingFiles.filter(
          (f) => f.id !== uploadingFile.id
        );
        console.log(
          "Removed uploading file:",
          uploadingFile.id,
          "Total uploading:",
          this.uploadingFiles.length
        );

        if (response.file) {
          this.attachedFiles.push(response.file);
          console.log(
            "Added attached file:",
            response.file.id,
            "Total attached:",
            this.attachedFiles.length
          );
        }
      });

      return response.file;
    } catch (error) {
      console.error("Error uploading file:", error);

      runInAction(() => {
        // Удаляем из загружающихся при ошибке
        this.uploadingFiles = this.uploadingFiles.filter(
          (f) => f.id !== uploadingFile.id
        );
        console.log(
          "Removed uploading file due to error:",
          uploadingFile.id,
          "Total uploading:",
          this.uploadingFiles.length
        );
      });

      const errorMessage =
        error instanceof Error ? error.message : "Ошибка загрузки файла";
      this.setError(errorMessage);

      // Показываем уведомление об ошибке
      this.showSnackbar?.("Ошибка загрузки файла", uploadingFile.file.name);

      throw error;
    }
  }

  /**
   * Удалить прикрепленный файл
   */
  removeFile(fileId: string) {
    runInAction(() => {
      this.attachedFiles = this.attachedFiles.filter(
        (file) => file.id !== fileId
      );
    });
  }

  /**
   * Получить прикрепленные файлы
   */
  getAttachedFiles(): FileInfo[] {
    return this.attachedFiles;
  }

  /**
   * Очистить прикрепленные файлы
   */
  clearAttachedFiles() {
    this.attachedFiles = [];
  }

  /**
   * Получить загружающиеся файлы
   */
  getUploadingFiles(): UploadingFile[] {
    return this.uploadingFiles;
  }

  /**
   * Отменить загрузку файла
   */
  cancelUpload(uploadId: string) {
    runInAction(() => {
      this.uploadingFiles = this.uploadingFiles.filter(
        (f) => f.id !== uploadId
      );
    });
  }

  /**
   * Очистить загружающиеся файлы
   */
  clearUploadingFiles() {
    this.uploadingFiles = [];
  }

  /**
   * Начать приветственный диалог
   */
  async startWelcomeChat() {
    // Блокируем если идет загрузка файлов
    if (this.uploadingFiles.length > 0) {
      this.showSnackbar?.(
        "Дождитесь загрузки файлов",
        "Невозможно отправить сообщение во время загрузки файлов"
      );
      return;
    }

    this.clearMessages();
    await this.sendMessage(
      "Привет! Представься и расскажи, чем ты можешь помочь."
    );
  }
}

export const chatViewModel = new ChatViewModel();
