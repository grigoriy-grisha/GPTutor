import React, { useState } from "react";
import { Button, Div, Separator } from "@vkontakte/vkui";

import { InterviewController } from "$/entity/interview/InterviewController";
import { chatGpt } from "$/entity/GPT";
import { Icon24QuestionOutline } from "@vkontakte/icons";

import classes from "./ChatInterviewAdditionalRequests.module.css";
import { ChatInfoBlock } from "$/components/Messenger/ChatInfoBlock";

interface IProps {
  interviews: InterviewController;
  scrollToBottom: () => void;
}

function ChatInterviewAdditionalRequests({
  interviews,
  scrollToBottom,
}: IProps) {
  const [helpIsClosed, setHelpIsClosed] = useState(true);

  const currentInterview = interviews.getCurrentInterview();

  if (!currentInterview) return null;

  const isStarted = chatGpt.chatGptInterview.isStarted$.get();

  const currentQuestion = currentInterview.getCurrentQuestion();

  const isTyping = chatGpt.chatGptInterview.sendCompletions$.loading.get();
  const isQuestioned = currentQuestion.isQuestioned$.get();
  const isStopped = chatGpt.chatGptInterview.timer.isStopped$.get();

  const nextQuestionIsDisabled = !isStarted
    ? false
    : !isQuestioned || isTyping || !isStopped;

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
      <Separator wide />
      {helpIsClosed && (
        <ChatInfoBlock onClose={() => setHelpIsClosed(false)}>
          <div
            style={{
              paddingRight: 8,
              color: "var(--vkui--color_background_accent_themed)",
            }}
          >
            <Icon24QuestionOutline width={28} height={28} />
          </div>
          Подыграйте Чат-боту. Представьте, что вы проходите собеседование.
          <br />
          Отвечайте на вопросы ChatGPT.
        </ChatInfoBlock>
      )}
    </>
  );
}

export default ChatInterviewAdditionalRequests;
