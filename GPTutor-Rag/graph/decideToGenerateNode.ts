import { GraphState } from "./graphState";

export function createDecideToGenerate() {
  return function decideToGenerate(state: GraphState) {
    console.log("---DECIDE TO GENERATE---");

    if (state.documents.length === 0) {
      console.log("---DECISION: TRANSFORM QUERY---");

      return "transformQuery";
    }
    console.log("---DECISION: GENERATE---");
    return "generate";
  };
}
