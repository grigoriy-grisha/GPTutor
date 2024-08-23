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
      `You are a grader assessing relevance of a retrieved document to a user question.
              Here is the retrieved document:
              
              {context}
              
              Here is the user question: {question}
            
              If the document contains keyword(s) or semantic meaning related to the user question, grade it as relevant.
              Give a binary score 'yes' or 'no' score to indicate whether the document is relevant to the question.`
    );

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    const filteredDocs: Array<any> = [];

    for await (const doc of documents) {
      const grade = await chain.invoke({
        context: doc.pageContent,
        question: question.join("\n"),
      });

      console.log(grade);

      if (grade.toLowerCase().includes("yes")) {
        console.log("---GRADE: DOCUMENT RELEVANT---");
        filteredDocs.push(doc);
      } else {
        console.log("---GRADE: DOCUMENT NOT RELEVANT---");
      }
    }

    return { documents: filteredDocs };
  };
}
