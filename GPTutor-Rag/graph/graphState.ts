import { StateGraphArgs } from "@langchain/langgraph";
import { Document } from "@langchain/core/documents";

export type GraphState = {
  documents: Document[];
  question: string[];
  generation?: string;
  initQuestion?: string;
  generationVQuestionGrade?: string;
  generationVDocumentsGrade?: string;
};

export const graphState: StateGraphArgs<GraphState>["channels"] = {
  documents: {
    value: (left?: Document[], right?: Document[]) =>
      right ? right : left || [],
    default: () => [],
  },
  question: {
    value: (left?: string[], right?: string[]) => (right ? right : left || []),
    default: () => [],
  },
  initQuestion: {
    value: (left?: string, right?: string) => (right ? right : left || ""),
    default: () => "",
  },
  generation: {
    value: (left?: string, right?: string) => (right ? right : left),
    default: () => undefined,
  },
  generationVQuestionGrade: {
    value: (left?: string, right?: string) => (right ? right : left),
    default: () => undefined,
  },
  generationVDocumentsGrade: {
    value: (left?: string, right?: string) => (right ? right : left),
    default: () => undefined,
  },
};
