import { InterviewController } from "$/entity/interview/InterviewController";
import { htmlCssInterview } from "$/entity/interview/interviews/htmlCssInterview";
import { reactInterview } from "$/entity/interview/interviews/reactInterview";
import { javascriptInterview } from "$/entity/interview/interviews/javascriptInterview";

export const interviews = new InterviewController([
  htmlCssInterview,
  javascriptInterview,
  reactInterview,
]);
