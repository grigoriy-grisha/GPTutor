import { sig } from "dignals";

export class InterviewItem {
  isQuestioned$ = sig(false);
  constructor(public question: string) {}
}
