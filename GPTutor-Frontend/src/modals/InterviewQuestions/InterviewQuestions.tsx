import React, { useEffect } from "react";

import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  RichCell,
  Separator,
  useAdaptivityConditionalRender,
  useModalRootContext,
} from "@vkontakte/vkui";
import { Icon20ChevronRight } from "@vkontakte/icons";

import { useNavigationContext } from "$/NavigationContext";
import { interviews } from "$/entity/interview";

import classes from "./InterviewQuestions.module.css";
import { chatGpt } from "$/entity/GPT";

interface IProps {
  id: string;
}

function InterviewQuestions({ id }: IProps) {
  const { goBack } = useNavigationContext();
  const { sizeX } = useAdaptivityConditionalRender();
  const { updateModalHeight } = useModalRootContext();

  useEffect(() => {
    setTimeout(() => updateModalHeight(), 200);
  }, []);

  return (
    <ModalPage
      id={id}
      settlingHeight={100}
      header={
        <>
          <ModalPageHeader
            before={
              sizeX.compact && (
                <PanelHeaderClose
                  className={sizeX.compact.className}
                  onClick={goBack}
                />
              )
            }
          >
            Список вопросов
          </ModalPageHeader>
          <Separator wide />
        </>
      }
    >
      <div>
        {interviews
          .getCurrentInterview()
          .getQuestions()
          .map((question, index) => (
            <>
              <RichCell
                onClick={async () => {
                  interviews.getCurrentInterview().setIndexQuestion(index);
                  goBack();

                  setTimeout(async () => {
                    await chatGpt.chatGptInterview.sendQuestion(
                      question.question
                    );

                    dispatchEvent(new Event("scroll-bottom-messenger"));
                  }, 200);
                }}
                className={classes.richCell}
                key={question.question}
                after={<Icon20ChevronRight className={classes.iconChevron} />}
              >
                {question.question}
              </RichCell>
              <Separator />
            </>
          ))}
      </div>
    </ModalPage>
  );
}
export default InterviewQuestions;
