import { GigaChatLLM } from "../GigaChatSupport/GigaChatLLM";
import { GraphState } from "./graphState";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export function createGenerateGenerationVQuestionGrade() {
  return async function generateGenerationVQuestionGrade(state: GraphState) {
    console.log("---GENERATE GENERATION vs QUESTION GRADE---");
    const { question, generation } = state;

    const model = new GigaChatLLM({
      clientSecretKey: process.env.CLIENT_SECRET_KEY,
      temperature: 0,
    });

    const prompt = ChatPromptTemplate.fromTemplate(
      `You are a grader assessing whether an answer is useful to resolve a question.
              Here is the answer:
              \\n ------- \\n
              {generation} 
              \\n ------- \\n
              Here is the question: {question}
              Give a binary score 'yes' or 'no' to indicate whether the answer is useful to resolve a question.`
    );

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    console.log({ generation });
    console.log({ questions: question.join("\n") });
    const score = await chain.invoke({
      question: question.join("\n"),
      generation: generation ?? "",
    });

    console.log({ score });

    return { generationVQuestionGrade: score };
  };
}
