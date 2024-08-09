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
      `Вы должны оценивать документы:
   Если документ содержит правильные слова и смысл, которые относятся к сгенерированном ответу и содержат нужные части информации, оцени документ двумя значениями.
   Это важно, это очень поможет пользователю получить валидные данные. 
  Дай два значения 'да' или 'нет', которые сигнализируют, что документ подходит к сгенерированном ответу или нет.
  
  {documents}
  
  Сгенерированный ответ: {generation}
 `
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
