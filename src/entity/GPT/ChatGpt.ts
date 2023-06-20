import { ChatGptFree } from "$/entity/GPT/ChatGptFree";
import { ChatGptLesson } from "$/entity/GPT/ChatGptLesson";
import { GptHistoryDialogs } from "$/entity/GPT/GptHistoryDialogs";
import { LessonItem, lessonsController, ModeType } from "$/entity/lessons";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { sig } from "dignals";
import { ChatGptInterview } from "$/entity/GPT/ChatGptInterview";
import { ChatGptLeetCode } from "$/entity/GPT/ChatGptLeetCode";
import { interviews } from "$/entity/interview";

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

    this.chatGptFree.setInitialSystemMessage("");

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

    if (!dialog.type || dialog.type === "Free") {
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
    if (dialog.type && dialog.lessonName) {
      this.currentChatGpt$.set(this.chatGptLesson);
      await this.chatGptLesson.restoreDialogFromHistory(dialog, goToChatLesson);
      return;
    }

    this.currentChatGpt$.set(this.chatGptInterview);
    await this.chatGptInterview.restoreDialogFromHistory(
      dialog,
      goToChatInterview
    );
  }

  getCurrentChatGpt = () => this.currentChatGpt$.get();
}

export const chatGpt = new ChatGpt();
