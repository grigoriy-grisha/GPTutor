import { GigaChatLLM } from "../GigaChatSupport/GigaChatLLM";
import { GraphState } from "./graphState";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { pull } from "langchain/hub";

export function createGenerateNode() {
  return async function generate({ documents, question }: GraphState) {
    console.log("---GENERATE---");

    const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");

    const model = new GigaChatLLM({
      clientSecretKey: process.env.CLIENT_SECRET_KEY,
    });

    const ragChain = prompt.pipe(model).pipe(new StringOutputParser());

    const formattedDocs = documents.map((doc) => doc.pageContent).join("\n\n");

    console.log(formattedDocs);
    console.log(question[0]);

    const generation = await ragChain.invoke({
      context: formattedDocs,
      question: question[0],
    });

    return { generation, documents };
  };
}
