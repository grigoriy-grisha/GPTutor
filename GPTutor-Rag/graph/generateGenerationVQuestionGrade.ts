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
      `Вы профессиональный оценщик, который оценивать сгенерированный ответ и проверяет соответствие его к вопросу.
      Дай два значения 'да' или 'нет', которые будут обозначать, что сгенерироавнный ответ соответствует вопросу.
      Это важно, это очень поможет пользователю получить валидные данные. 
      Тут сгенерированный ответ:
      \n ------- \n
      {generation} 
      \n ------- \n
      Вот вопрос: {question}`
    );

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    const score = await chain.invoke({
      question,
      generation: generation ?? "",
    });

    return { generationVQuestionGrade: score };
  };
}
