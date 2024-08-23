import { GraphState } from "./graphState";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { GigaChatLLM } from "../GigaChatSupport/GigaChatLLM";
import { StringOutputParser } from "@langchain/core/output_parsers";

export function createTransformQueryNode() {
  return async function transformQuery({ initQuestion }: GraphState) {
    console.log("---TRANSFORM QUERY---");

    const prompt =
      ChatPromptTemplate.fromTemplate(`You are generating a question that is well optimized for semantic search retrieval.
  Look at the input and try to reason about the underlying sematic intent / meaning.
  Here is the initial question:
  \\n ------- \\n
  {question} 
  \\n ------- \\n
  Translate question to english.
  Formulate an improved question:`);

    const model = new GigaChatLLM({
      clientSecretKey: process.env.CLIENT_SECRET_KEY,
    });

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    const result = await chain.invoke({ question: initQuestion || "" });

    console.log({ result });

    return { question: [initQuestion || "", ...result.split("\n")] };
  };
}
