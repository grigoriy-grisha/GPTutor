import { makeAutoObservable } from "mobx";

/**
 * Тип роли сообщения в чате
 */
export type MessageRole = "user" | "assistant" | "system";

/**
 * Информация об использовании токенов и стоимости запроса
 */
export interface MessageUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number;
}

/**
 * Модель сообщения в чате
 */
export class MessageModel {
  id: string;
  role: MessageRole;
  content: string;
  isTyping: boolean;
  timestamp: Date;
  usage: MessageUsage | null = null;

  constructor(
    id: string,
    role: MessageRole,
    content: string = "",
    isTyping: boolean = false
  ) {
    this.id = id;
    this.role = role;
    this.content = content;
    this.isTyping = isTyping;
    this.timestamp = new Date();

    makeAutoObservable(this);
  }

  /**
   * Установить полное содержимое сообщения
   */
  setContent(content: string) {
    this.content = content;
  }

  /**
   * Добавить текст к существующему содержимому (для потоковой передачи)
   */
  appendContent(content: string) {
    this.content += content;
  }

  /**
   * Установить статус печатания
   */
  setIsTyping(isTyping: boolean) {
    this.isTyping = isTyping;
  }

  /**
   * Установить информацию об использовании токенов
   */
  setUsage(usage: MessageUsage) {
    this.usage = usage;
  }

  /**
   * Проверка, является ли сообщение пользовательским
   */
  get isUser() {
    return this.role === "user";
  }

  /**
   * Проверка, является ли сообщение от ассистента
   */
  get isAssistant() {
    return this.role === "assistant";
  }
}

