import { END, START, StateGraph } from "@langchain/langgraph";

import { GraphState, graphState } from "./graphState";
import { createRetrieveNode } from "./retrieveNode";
import { createGradeDocument } from "./gradeDocumentsNode";
import { createGenerateNode } from "./generateNode";
import { createGenerateGenerationVDocumentsGrade } from "./generateGenerationVDocumentsGradeNode";
import { createTransformQueryNode } from "./transformQueryNode";
import { cratePrepareForFinalGrade } from "./prepareForFinalGradeNode";
import { createGenerateGenerationVQuestionGrade } from "./generateGenerationVQuestionGrade";
import { createDecideToGenerate } from "./decideToGenerateNode";
import { createGradeGenerationVDocuments } from "./gradeGenerationVDocuments";
import { createGradeGenerationVQuestion } from "./createGradeGenerationVQuestion";

export function buildWorkFlow(retriever: any) {
  const workflow = new StateGraph<GraphState>({
    channels: graphState,
  })
    .addNode("retrieve", createRetrieveNode(retriever))
    .addNode("gradeDocuments", createGradeDocument())
    .addNode("generate", createGenerateNode())
    .addNode(
      "generateGenerationVDocumentsGrade",
      createGenerateGenerationVDocumentsGrade()
    )
    .addNode("transformQuery", createTransformQueryNode())
    .addNode("prepareForFinalGrade", cratePrepareForFinalGrade())
    .addNode(
      "generateGenerationVQuestionGrade",
      createGenerateGenerationVQuestionGrade()
    );

  workflow.addEdge(START, "transformQuery");
  workflow.addEdge("transformQuery", "retrieve");
  workflow.addEdge("retrieve", "gradeDocuments");
  workflow.addConditionalEdges("gradeDocuments", createDecideToGenerate(), {
    transformQuery: "transformQuery",
    generate: "generate",
  });
  workflow.addEdge("transformQuery", "retrieve");
  workflow.addEdge("generate", "generateGenerationVDocumentsGrade");
  workflow.addConditionalEdges(
    "generateGenerationVDocumentsGrade",
    createGradeGenerationVDocuments(),
    {
      supported: "prepareForFinalGrade",
      "not supported": "generate",
    }
  );

  workflow.addEdge("prepareForFinalGrade", "generateGenerationVQuestionGrade");
  workflow.addConditionalEdges(
    "generateGenerationVQuestionGrade",
    createGradeGenerationVQuestion(),
    { useful: END, "not useful": "transformQuery" }
  );

  return workflow;
}

export async function createWorkflow(question: string, retriever: any) {
  const appStream = buildWorkFlow(retriever)
    .compile()
    .stream({ question }, { recursionLimit: 30 });

  let finalGeneration;

  for await (const output of await appStream) {
    for (const [key, value] of Object.entries(output)) {
      if (key === "generate") finalGeneration = value;
    }

    console.log("\n---\n");
  }

  return finalGeneration;
}
