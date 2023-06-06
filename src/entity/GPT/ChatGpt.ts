import { ChatGptFree } from "$/entity/GPT/ChatGptFree";
import { ChatGptLesson } from "$/entity/GPT/ChatGptLesson";
import { GptHistoryDialogs } from "$/entity/GPT/GptHistoryDialogs";
import { LessonItem, lessonsController } from "$/entity/lessons";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { sig } from "dignals";

export class ChatGpt {
  history = new GptHistoryDialogs();
  chatGptFree = new ChatGptFree();

  chatGptLesson = new ChatGptLesson();

  currentChatGpt$ = sig<ChatGptTemplate>(this.chatGptFree);

  moveToFreeChat = (goToChat: () => void) => {
    lessonsController.clearLesson();
    this.chatGptFree.currentHistory = null;

    this.currentChatGpt$.set(this.chatGptFree);

    const currentChapter = lessonsController.currentChapter.get();
    const currentLesson = lessonsController.currentLesson.get();

    if (currentChapter || currentLesson) {
      lessonsController.clearLesson();
      lessonsController.clearChapter();
    }

    this.chatGptFree.clearMessages();
    this.chatGptFree.abortSend();

    goToChat();
  };

  moveToLessonChat(lesson: LessonItem, goToChat: () => void) {
    this.chatGptLesson.clearMessages();
    this.chatGptLesson.clearSystemMessage();
    this.chatGptLesson.currentHistory = null;

    this.currentChatGpt$.set(this.chatGptLesson);

    lessonsController.setCurrentLesson(lesson.id);
    goToChat();
  }

  restoreDialogFromHistory(id: string, goToChat: () => void) {
    const dialog = this.history.getDialogById(id);
    if (!dialog) return;

    if (dialog.type === "Free") {
      this.currentChatGpt$.set(this.chatGptFree);
    } else {
      this.currentChatGpt$.set(this.chatGptLesson);
    }

    this.getCurrentChatGpt().restoreDialogFromHistory(dialog, goToChat);
  }

  getCurrentChatGpt = () => this.currentChatGpt$.get();
}

export const chatGpt = new ChatGpt();
