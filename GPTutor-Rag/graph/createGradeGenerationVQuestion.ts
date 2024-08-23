import { GraphState } from "./graphState";

export function createGradeGenerationVQuestion() {
  return function gradeGenerationVQuestion(state: GraphState) {
    console.log("---GRADE GENERATION vs QUESTION---");

    const grade = state.generationVQuestionGrade;

    if (grade?.toLowerCase().includes("yes")) {
      console.log("---DECISION: USEFUL---");
      return "useful";
    }

    console.log("---DECISION: NOT USEFUL---");
    return "not useful";
  };
}
