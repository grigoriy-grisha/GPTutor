import { Interview } from "$/entity/interview/Interview";
import { ModeType } from "$/entity/lessons";

export class InterviewController {
  private currentInterview: Interview = null as unknown as Interview;

  constructor(public interviews: Interview[]) {}

  setCurrentInterview(type: ModeType) {
    const foundInterview = this.interviews.find(
      (interview) => interview.type === type
    );
    if (!foundInterview) return;
    this.currentInterview = foundInterview;
  }

  getCurrentInterview() {
    return this.currentInterview;
  }
}
