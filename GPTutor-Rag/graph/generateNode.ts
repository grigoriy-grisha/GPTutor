import { GigaChatLLM } from "../GigaChatSupport/GigaChatLLM";
import { GraphState } from "./graphState";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export function createGenerateNode() {
  return async function generate({ documents, question }: GraphState) {
    console.log("---GENERATE---");

    const prompt = ChatPromptTemplate.fromTemplate(
      `Используйте следующие фрагменты полученного контекста, чтобы ответить на вопрос.
        Если вы не знаете ответа, просто скажите, что не знаете.
         Старайтесь подробно описывать и вдумываться в контекст, который был вам передам.
         Вопрос: {question}
         Контекст: {context}
         Ответ:
        `
    );

    const model = new GigaChatLLM({
      clientSecretKey: process.env.CLIENT_SECRET_KEY,
    });

    const ragChain = prompt.pipe(model).pipe(new StringOutputParser());

    const formattedDocs = documents.map((doc) => doc.pageContent).join("\n\n");

    const generation = await ragChain.invoke({
      context: formattedDocs,
      question,
    });

    return { generation, documents };
  };
}
