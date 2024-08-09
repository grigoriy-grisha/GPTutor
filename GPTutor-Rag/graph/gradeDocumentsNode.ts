import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { GigaChatLLM } from "../GigaChatSupport/GigaChatLLM";
import { GraphState } from "./graphState";

export function createGradeDocument() {
  return async function gradeDocuments({ documents, question }: GraphState) {
    console.log("---CHECK RELEVANCE---");

    const model = new GigaChatLLM({
      clientSecretKey: process.env.CLIENT_SECRET_KEY,
      temperature: 0,
    });

    const prompt = ChatPromptTemplate.fromTemplate(
      `Вы должны оценивать документы, связанные с разработкой экосистемы VK:
   Если документ содержит правильные слова и смысл, которые относятся к вопросу и содержат нужные части информации, оцени документ двумя значениями.
  Дай два значения 'да' или 'нет', которые сигнализируют, что документ подходит к вопросу или нет.
  
  {context}
  
  Вопрос пользователя: {question}
 `
    );

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    const filteredDocs: Array<any> = [];

    for await (const doc of documents) {
      const grade = await chain.invoke({ context: doc.pageContent, question });

      if (grade.toLowerCase().includes("да")) {
        console.log("---GRADE: DOCUMENT RELEVANT---");
        filteredDocs.push(doc);
      } else {
        console.log("---GRADE: DOCUMENT NOT RELEVANT---");
      }
    }

    return { documents: filteredDocs };
  };
}
