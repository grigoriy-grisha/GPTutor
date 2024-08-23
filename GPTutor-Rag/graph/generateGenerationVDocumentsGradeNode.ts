import { StringOutputParser } from "@langchain/core/output_parsers";
import { GraphState } from "./graphState";
import { GigaChatLLM } from "../GigaChatSupport/GigaChatLLM";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export function createGenerateGenerationVDocumentsGrade() {
  return async function generateGenerationVDocumentsGrade(state: GraphState) {
    console.log("---GENERATE GENERATION vs DOCUMENTS GRADE---");

    const { documents, generation } = state;

    const model = new GigaChatLLM({
      clientSecretKey: process.env.CLIENT_SECRET_KEY,
      temperature: 0,
    });

    const prompt = ChatPromptTemplate.fromTemplate(
      `You are a grader assessing whether an answer is grounded in / supported by a set of facts.
      Here are the facts:
      \n ------- \n
      {documents} 
      \n ------- \n
      Here is the answer: {generation}
      Give a binary score 'yes' or 'no' to indicate whether the answer is grounded in / supported by a set of facts.`
    );

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    const formattedDocs = documents.map((doc) => doc.pageContent).join("\n\n");

    const score = await chain.invoke({
      documents: formattedDocs,
      generation: generation ?? "",
    });

    return { generationVDocumentsGrade: score };
  };
}
