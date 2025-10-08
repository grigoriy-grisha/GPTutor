import { makeAutoObservable, runInAction } from "mobx";
import { MessageModel, MessageRole } from "./MessageModel";
import { API_BASE_URL } from "../../../api";

/**
 * ViewModel для управления состоянием чата
 */
class ChatViewModel {
  messages: MessageModel[] = [];
  isTyping: boolean = false;
  currentModel: string = "google/gemini-2.5-flash-lite";
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Получить список всех сообщений
   */
  getMessages(): MessageModel[] {
    return this.messages;
  }

  /**
   * Установить текущую модель для генерации
   */
  setModel(model: string) {
    console.log(this.currentModel);
    this.currentModel = model;
  }

  /**
   * Добавить новое сообщение в чат
   */
  addMessage(
    role: MessageRole,
    content: string = "",
    isTyping: boolean = false
  ): MessageModel {
    const message = new MessageModel(
      Date.now().toString(),
      role,
      content,
      isTyping
    );
    this.messages.push(message);
    return message;
  }

  /**
   * Отправить сообщение и получить ответ от AI
   */
  async sendMessage(content: string) {
    if (!content.trim() || this.isLoading) return;

    this.addMessage("user", content);

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

    const requestBody = {
      model: this.currentModel,
      messages: this.messages
        .filter((msg) => !msg.isTyping)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      stream: true,
      temperature: 0.7,
    };

    console.log("Sending request to:", apiUrl);
    console.log("Request body:", requestBody);

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
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            console.log("Received SSE data:", data);

            if (data === "[DONE]") {
              console.log("Stream completed");
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              console.log("Parsed content:", content);

              if (content) {
                runInAction(() => {
                  message.appendContent(content);
                });
              }

              // Извлекаем usage данные из финального чанка
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
  }

  /**
   * Начать приветственный диалог
   */
  async startWelcomeChat() {
    this.clearMessages();
    await this.sendMessage(
      "Привет! Представься и расскажи, чем ты можешь помочь."
    );
  }
}

export const chatViewModel = new ChatViewModel();
