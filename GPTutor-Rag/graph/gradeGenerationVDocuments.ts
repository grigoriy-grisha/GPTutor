import { GraphState } from "./graphState";

export function createGradeGenerationVDocuments() {
  return function gradeGenerationVDocuments(state: GraphState) {
    console.log("---GRADE GENERATION vs DOCUMENTS---");

    const grade = state.generationVDocumentsGrade;

    if (grade?.toLowerCase().includes("yes")) {
      console.log("---DECISION: SUPPORTED, MOVE TO FINAL GRADE---");
      return "supported";
    }

    console.log("---DECISION: NOT SUPPORTED, GENERATE AGAIN---");
    return "not supported";
  };
}
