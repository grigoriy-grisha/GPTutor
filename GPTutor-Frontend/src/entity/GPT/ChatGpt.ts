import { sig } from "dignals";

import { ChatGptFree } from "$/entity/GPT/ChatGptFree";
import { ChatGptLesson } from "$/entity/GPT/ChatGptLesson";
import { GptHistoryDialogs } from "$/entity/GPT/GptHistoryDialogs";
import { LessonItem, lessonsController, ModeType } from "$/entity/lessons";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { ChatGptInterview } from "$/entity/GPT/ChatGptInterview";
import { ChatGptLeetCode } from "$/entity/GPT/ChatGptLeetCode";
import { interviews } from "$/entity/interview";
import { ChatGptTrainer } from "$/entity/GPT/ChatGptTrainer";
import { VkStorageService } from "$/services/VkStorageService";

export class ChatGpt {
  storageService = new VkStorageService();

  hasNewModel = false;
  constructor() {
    this.initHasNewModel();
  }

  async initHasNewModel() {
    const hasNewModel = await this.storageService.get("hasNewModel");
    this.hasNewModel = !!hasNewModel;
  }

  setHasNewModel() {
    this.storageService.set("hasNewModel", "true");
    this.hasNewModel = true;
  }

  history = new GptHistoryDialogs();
  chatGptFree = new ChatGptFree();

  chatGptLesson = new ChatGptLesson();

  chatGptInterview = new ChatGptInterview();

  chatGptLeetCode = new ChatGptLeetCode();

  chatGptTrainer = new ChatGptTrainer();

  currentChatGpt$ = sig<ChatGptTemplate>(this.chatGptFree);

  moveToFreeChat = (goToChat: () => void) => {
    lessonsController.clearLesson();
    this.chatGptFree.currentHistory = null;

    this.currentChatGpt$.set(this.chatGptFree);

    this.chatGptFree.clearMessages();
    this.chatGptFree.abortSend();

    this.chatGptFree.resetSystemMessage();

    goToChat();
  };

  moveToLessonChat(lesson: LessonItem, goToChatLesson: () => void) {
    this.chatGptLesson.clearMessages();
    this.chatGptLesson.resetSystemMessage();
    this.chatGptLesson.currentHistory = null;

    this.currentChatGpt$.set(this.chatGptLesson);
    this.chatGptLesson.setInitialSystemMessage(
      lessonsController.currentChapter.get()?.systemMessage
    );

    lessonsController.setCurrentLesson(lesson.id);

    goToChatLesson();
  }

  moveToInterviewChat(interviewType: string, goToChatInterview: () => void) {
    interviews.setCurrentInterview(interviewType as ModeType);
    this.chatGptInterview.messages$.set([]);
    goToChatInterview();
  }

  async restoreDialogFromHistory(
    id: string,
    goToChatFree: () => void,
    goToChatLesson: () => void,
    goToChatInterview: () => void,
    goToChatLeetCode: () => void
  ) {
    const dialog = this.history.getDialogById(id);
    if (!dialog) return;

    if (dialog.type === "Free") {
      this.currentChatGpt$.set(this.chatGptFree);
      await this.chatGptFree.restoreDialogFromHistory(dialog, goToChatFree);
      return;
    }
    if (dialog.type === ModeType.LeetCode) {
      this.currentChatGpt$.set(this.chatGptLeetCode);
      await this.chatGptLeetCode.restoreDialogFromHistory(
        dialog,
        goToChatLeetCode
      );
      return;
    }

    if (dialog.type.includes("INTERVIEW")) {
      this.currentChatGpt$.set(this.chatGptInterview);
      await this.chatGptInterview.restoreDialogFromHistory(
        dialog,
        goToChatInterview
      );
    }

    if (dialog.type && dialog.lessonName) {
      this.currentChatGpt$.set(this.chatGptLesson);
      await this.chatGptLesson.restoreDialogFromHistory(dialog, goToChatLesson);
      return;
    }
  }

  getCurrentChatGpt = () => this.currentChatGpt$.get();
}

export const chatGpt = new ChatGpt();
