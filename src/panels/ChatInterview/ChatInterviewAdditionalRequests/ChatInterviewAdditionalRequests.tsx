import React from "react";
import { Button, Div, Separator } from "@vkontakte/vkui";

import { InterviewController } from "$/entity/interview/InterviewController";
import { chatGpt } from "$/entity/GPT";

import classes from "./ChatInterviewAdditionalRequests.module.css";

interface IProps {
  interviews: InterviewController;
  scrollToBottom: () => void;
}

function ChatInterviewAdditionalRequests({
  interviews,
  scrollToBottom,
}: IProps) {
  const currentInterview = interviews.getCurrentInterview();

  if (!currentInterview) return null;

  const isStarted = chatGpt.chatGptInterview.isStarted$.get();

  const currentQuestion = currentInterview.getCurrentQuestion();

  const isTyping = chatGpt.chatGptInterview.sendCompletions$.loading.get();
  const isQuestioned = currentQuestion.isQuestioned$.get();
  const nextQuestionIsDisabled = !isStarted
    ? isStarted
    : !isQuestioned || isTyping;

  const isLastQuestion = currentInterview.isLastQuestion$.get();

  function getQuestionActionText() {
    if (currentInterview.isNextLastQuestion$.get()) return "Последний вопрос";
    if (isLastQuestion) return "Вопросов нет";
    if (isStarted) return "Следующий вопрос";

    return "Начать собеседование";
  }

  return (
    <>
      <Separator wide />
      <Div className={classes.additionalRequests}>
        <Button
          disabled={nextQuestionIsDisabled || isLastQuestion}
          mode={isLastQuestion ? "outline" : "primary"}
          onClick={async () => {
            if (isStarted) {
              interviews.getCurrentInterview().nextQuestion();
            }

            await chatGpt.chatGptInterview.sendQuestion(
              interviews.getCurrentInterview().getCurrentQuestion().question
            );

            scrollToBottom();
          }}
        >
          {getQuestionActionText()}
        </Button>
      </Div>
    </>
  );
}

export default ChatInterviewAdditionalRequests;
