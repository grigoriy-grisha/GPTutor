import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";
import { leetCode } from "$/entity/leetCode/LeetCode";

export class ChatGptLeetCode extends ChatGptTemplate {
  initSystemMessage() {
    const leetCodeContent = leetCode.currentProblem?.data.question.content;
    const content = `You must help to disassemble and solve the problem from LeetCode.write in Russian.Here is the task condition: ${leetCodeContent}
    `;

    this.systemMessage = new GptMessage(content, GPTRoles.system);
  }
}
