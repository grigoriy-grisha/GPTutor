import { GraphState } from "./graphState";
import { RunnableConfig } from "@langchain/core/runnables";

export function createRetrieveNode(retriever: any) {
  return async function retrieve(
    { question }: GraphState,
    config?: RunnableConfig
  ) {
    console.log("---RETRIEVE---");

    const documents = [];

    for (const item of question) {
      const retrieveDocuments = await retriever
        .withConfig({ runName: "FetchRelevantDocuments" })
        .invoke(item, config);

      documents.push(...retrieveDocuments);
    }

    return { documents };
  };
}
