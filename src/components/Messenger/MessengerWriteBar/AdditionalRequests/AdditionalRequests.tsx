import React, { memo } from "react";
import { Button, Div, Separator } from "@vkontakte/vkui";

import classes from "./AdditionalRequests.module.css";
import { LessonRequest } from "../../../../entity/lessons/LessonRequest";

interface IProps {
  additionalRequests: LessonRequest[];
  isTyping: boolean;
  handleSend: (value: string) => void;
  isAdditionalOpen: boolean;
}

function AdditionalRequests({
  additionalRequests,
  isAdditionalOpen,
  isTyping,
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
            disabled={isTyping}
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
