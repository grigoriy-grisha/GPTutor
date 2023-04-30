import React, { memo, useCallback, useState } from "react";

import { LessonRequest } from "$/entity/lessons";
import { ChatGpt } from "$/entity/GPT";

import classes from "./MessengerWriteBar.module.css";
import { AdditionalRequests } from "./AdditionalRequests";
import { WriteBarMessage } from "./WriteBarMessage";
import { SelectedMessagesBar } from "./SelectedMessagesBar";

interface IProps {
  chatGpt: ChatGpt;
  additionalRequests: LessonRequest[];
  handleSend: (message: string) => void;
  isTyping: boolean;
  onSettingsClick: () => void;
}

function MessengerWriteBar({
  chatGpt,
  additionalRequests,
  handleSend,
  isTyping,
  onSettingsClick,
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
          onSettingsClick={onSettingsClick}
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
