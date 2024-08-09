import { GraphState } from "./graphState";
import { RunnableConfig } from "@langchain/core/runnables";

export function createRetrieveNode(retriever: any) {
  return async function retrieve(
    { question }: GraphState,
    config?: RunnableConfig
  ) {
    console.log("---RETRIEVE---");

    const documents = await retriever
      .withConfig({ runName: "FetchRelevantDocuments" })
      .invoke(question, config);

    return { documents };
  };
}
