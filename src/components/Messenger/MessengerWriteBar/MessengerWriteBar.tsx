import React, { memo, useCallback, useState } from "react";

import classes from "./MessengerWriteBar.module.css";
import { AdditionalRequests } from "./AdditionalRequests";
import { WriteBarMessage } from "./WriteBarMessage";
import { SelectedMessagesBar } from "./SelectedMessagesBar";

import { LessonRequest } from "../../../entity/lessons/LessonRequest";
import { ChatGpt } from "../../../entity/GPT/ChatGpt";

interface IProps {
  chatGpt: ChatGpt;
  additionalRequests: LessonRequest[];
  handleSend: (message: string) => void;
  isTyping: boolean;
}

function MessengerWriteBar({
  chatGpt,
  additionalRequests,
  handleSend,
  isTyping,
}: IProps) {
  const [isAdditionalOpen, setAdditionalsOpen] = useState(true);

  const onClickAdditional = useCallback(
    () => setAdditionalsOpen((prev) => !prev),
    []
  );
  const hasSelectedMessages = chatGpt.hasSelectedMessages$.get();

  return (
    <div className={classes.container}>
      <div style={{ width: "100%" }}>
        <div style={{ display: hasSelectedMessages ? "block" : "none" }}>
          <SelectedMessagesBar chatGpt={chatGpt} />
        </div>
        <div style={{ display: !hasSelectedMessages ? "block" : "none" }}>
          <AdditionalRequests
            additionalRequests={additionalRequests}
            isAdditionalOpen={isAdditionalOpen}
            handleSend={handleSend}
            isTyping={isTyping}
          />
        </div>
        <WriteBarMessage
          clearMessages={chatGpt.clearMessages}
          abortSend={chatGpt.abortSend}
          additionalRequests={additionalRequests}
          handleSend={handleSend}
          isTyping={isTyping}
          onClickAdditional={onClickAdditional}
        />
      </div>
    </div>
  );
}

export default memo(MessengerWriteBar);
