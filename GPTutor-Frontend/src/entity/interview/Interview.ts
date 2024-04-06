import { InterviewItem } from "$/entity/interview/InterviewItem";
import { memo, sig } from "dignals";
import { ModeType } from "$/entity/lessons";

export class Interview {
  private currentInterviewIndex$ = sig(0);

  header = "Собеседование";
  constructor(public type: ModeType, public questions: InterviewItem[]) {}

  getCurrentQuestion() {
    return this.questions[this.currentInterviewIndex$.get()];
  }

  reset() {
    this.currentInterviewIndex$.set(0);
  }

  getQuestions() {
    return this.questions;
  }

  setIndexQuestion(index: number) {
    this.currentInterviewIndex$.set(index);
  }

  nextQuestion() {
    this.currentInterviewIndex$.set(this.currentInterviewIndex$.get() + 1);
  }

  isNextLastQuestion$ = memo(
    () => this.currentInterviewIndex$.get() === this.questions.length - 2
  );

  isLastQuestion$ = memo(
    () => this.currentInterviewIndex$.get() === this.questions.length - 1
  );
}
