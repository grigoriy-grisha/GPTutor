import { ChatGptFree } from "$/entity/GPT/ChatGptFree";
import { ChatGptLesson } from "$/entity/GPT/ChatGptLesson";
import { GptHistoryDialogs } from "$/entity/GPT/GptHistoryDialogs";
import { LessonItem, lessonsController, ModeType } from "$/entity/lessons";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { sig } from "dignals";
import { ChatGptInterview } from "$/entity/GPT/ChatGptInterview";
import { ChatGptLeetCode } from "$/entity/GPT/ChatGptLeetCode";

export class ChatGpt {
  history = new GptHistoryDialogs();
  chatGptFree = new ChatGptFree();

  chatGptLesson = new ChatGptLesson();

  chatGptInterview = new ChatGptInterview();

  chatGptLeetCode = new ChatGptLeetCode();

  currentChatGpt$ = sig<ChatGptTemplate>(this.chatGptFree);

  moveToFreeChat = (goToChat: () => void) => {
    lessonsController.clearLesson();
    this.chatGptFree.currentHistory = null;

    this.currentChatGpt$.set(this.chatGptFree);

    this.chatGptFree.clearMessages();
    this.chatGptFree.abortSend();

    goToChat();
  };

  moveToLessonChat(lesson: LessonItem, goToChatLesson: () => void) {
    this.chatGptLesson.clearMessages();
    this.chatGptLesson.clearSystemMessage();
    this.chatGptLesson.currentHistory = null;

    this.currentChatGpt$.set(this.chatGptLesson);

    lessonsController.setCurrentLesson(lesson.id);

    goToChatLesson();
  }

  restoreDialogFromHistory(
    id: string,
    goToChatFree: () => void,
    goToChatLesson: () => void,
    goToChatInterview: () => void,
    goToChatLeetCode: () => void
  ) {
    const dialog = this.history.getDialogById(id);
    if (!dialog) return;

    if (!dialog.type || dialog.type === "Free") {
      this.currentChatGpt$.set(this.chatGptFree);
      this.chatGptFree.restoreDialogFromHistory(dialog, goToChatFree);
    } else if (dialog.type && dialog.lessonName) {
      this.currentChatGpt$.set(this.chatGptLesson);
      this.chatGptLesson.restoreDialogFromHistory(dialog, goToChatLesson);
    } else if (dialog.type === ModeType.LeetCode) {
      this.currentChatGpt$.set(this.chatGptLeetCode);
      this.chatGptLeetCode.restoreDialogFromHistory(dialog, goToChatLeetCode);
    } else {
      this.currentChatGpt$.set(this.chatGptInterview);
      this.chatGptInterview.restoreDialogFromHistory(dialog, goToChatInterview);
    }
  }

  getCurrentChatGpt = () => this.currentChatGpt$.get();
}

export const chatGpt = new ChatGpt();
