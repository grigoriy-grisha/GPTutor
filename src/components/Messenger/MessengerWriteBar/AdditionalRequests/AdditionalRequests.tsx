import React, { memo } from "react";
import { Button, Div, Separator } from "@vkontakte/vkui";

import { LessonRequest } from "$/entity/lessons";

import classes from "./AdditionalRequests.module.css";

interface IProps {
  additionalRequests: LessonRequest[];
  isTyping: boolean;
  handleSend: (value: string) => void;
  isAdditionalOpen: boolean;
  isStopped: boolean;
}

function AdditionalRequests({
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
      <Div className={classes.additionalRequests}>
        {additionalRequests.map((request, index) => (
          <Button
            aria-label={request.name}
            key={index}
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
        ))}
      </Div>
    </>
  );
}

export default memo(AdditionalRequests);
