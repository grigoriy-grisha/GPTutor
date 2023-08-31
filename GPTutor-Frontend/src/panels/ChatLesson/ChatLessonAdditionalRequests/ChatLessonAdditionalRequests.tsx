import React, { memo } from "react";
import { Button, Div, HorizontalScroll, Separator } from "@vkontakte/vkui";

import { LessonRequest } from "$/entity/lessons";

import classes from "./ChatLessonAdditionalRequests.module.css";

interface IProps {
  additionalRequests: LessonRequest[];
  isTyping: boolean;
  handleSend: (value: string) => void;
  isAdditionalOpen: boolean;
  isStopped: boolean;
}

function ChatLessonAdditionalRequests({
  additionalRequests,
  isAdditionalOpen,
  isTyping,
  isStopped,
  handleSend,
}: IProps) {
  if (!additionalRequests?.length || !isAdditionalOpen) return null;

  return (
    <>
      <Separator wide />
      <HorizontalScroll>
        <Div
          className={classes.additionalRequests}
          style={{
            gridTemplateColumns: `repeat(${additionalRequests?.length}, max-content)`,
          }}
        >
          {additionalRequests.map((request, index) => (
            <div key={index} className={classes.button}>
              <Button
                aria-label={request.name}
                disabled={isTyping || !isStopped}
                mode={request.isSelected ? "outline" : "primary"}
                size="m"
                onClick={() => {
                  handleSend(request.text);
                  request.select();
                }}
              >
                {request.name}
              </Button>
            </div>
          ))}
        </Div>
      </HorizontalScroll>
    </>
  );
}

export default memo(ChatLessonAdditionalRequests);
