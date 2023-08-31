import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";
import { interviews } from "$/entity/interview";
import { sig } from "dignals";

export class ChatGptInterview extends ChatGptTemplate {
  isStarted$ = sig(false);
  async sendQuestion(content: string) {
    this.isStarted$.set(true);
    const message = new GptMessage(content, GPTRoles.assistant, true);
    this.addMessage(message);
    await this.createHistory();
    await this.postMessage(message);
  }

  getMessages() {
    const messages = this.messages$.get().filter((message) => !message.isError);

    return messages
      .map((message, index) => {
        if (!message.inLocal) return message;

        const answer = [...messages]
          .slice(index + 1)
          .find((message) => message.inLocal);
        if (!answer) return message;

        return new GptMessage(
          `Вопрос:
              ${message.content$.get()}
              Ответ: ${answer.content$.get()} |
              Проверь, правильный ли ответ, если нет, то объясни почему`,
          GPTRoles.user
        );
      })
      .map(this.toApiMessage);
  }

  send = async (content: string) => {
    const currentQuestion = interviews
      .getCurrentInterview()
      .getCurrentQuestion();

    this.sendCompletions$.loading.set(true);
    const message = new GptMessage(
      content,
      GPTRoles.user,
      !currentQuestion.isQuestioned$.get()
    );
    this.addMessage(message);
    await this.createHistory();
    await this.postMessage(message);

    try {
      await this.sendCompletions$.run();
    } finally {
      currentQuestion.isQuestioned$.set(true);
      this.timer.run();
      this.allowActions();
      await this.postMessage(this.getLastMessage());
    }
  };
}
