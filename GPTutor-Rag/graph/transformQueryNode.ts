import { GraphState } from "./graphState";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { GigaChatLLM } from "../GigaChatSupport/GigaChatLLM";
import { StringOutputParser } from "@langchain/core/output_parsers";

export function createTransformQueryNode() {
  return async function transformQuery({ question }: GraphState) {
    console.log("---TRANSFORM QUERY---");

    const prompt = ChatPromptTemplate.fromTemplate(
      `Вы создаешь вопрос, который хорошо оптимизирован для семантического поиска.
  Тебе дают вопрос, ты должен его правильно преобразовать, чтобы он имел более правильную структуру для семантического поиска.
  Вот начальный вопрос:
  \n ------- \n
  {question} 
  \n ------- \n
  Создай новый улучшенный запрос: `
    );

    const model = new GigaChatLLM({
      clientSecretKey: process.env.CLIENT_SECRET_KEY,
    });

    const chain = prompt.pipe(model).pipe(new StringOutputParser());
    const betterQuestion = await chain.invoke({ question });

    return { question: betterQuestion };
  };
}
