import { GraphState } from "./graphState";

export function cratePrepareForFinalGrade() {
  return function prepareForFinalGrade({
    documents,
    question,
    generation,
  }: GraphState) {
    console.log("---FINAL GRADE---");

    return { documents, question, generation };
  };
}
