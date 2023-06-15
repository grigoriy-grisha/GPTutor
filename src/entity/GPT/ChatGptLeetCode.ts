import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";
import { leetCode } from "$/entity/leetCode/LeetCode";

export class ChatGptLeetCode extends ChatGptTemplate {
  initSystemMessage() {
    const leetCodeContent = leetCode.currentProblem?.data.question.content;
    const content = `Ты должен помочь разобрать и решить задачу из leetCode.
      Вот условие задачи ${leetCodeContent}
    `;

    this.systemMessage = new GptMessage(content, GPTRoles.system);
  }
}
