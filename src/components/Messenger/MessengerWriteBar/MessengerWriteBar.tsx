import React, { memo, useCallback, useState } from "react";

import classes from "./MessengerWriteBar.module.css";
import WaitBanner from "./WaitBaner/WaitBaner";
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

  return (
    <div className={classes.container}>
      <WaitBanner />
      <div style={{ width: "100%" }}>
        <SelectedMessagesBar chatGpt={chatGpt}>
          <AdditionalRequests
            additionalRequests={additionalRequests}
            isAdditionalOpen={isAdditionalOpen}
            handleSend={handleSend}
            isTyping={isTyping}
          />
          <WriteBarMessage
            additionalRequests={additionalRequests}
            handleSend={handleSend}
            isTyping={isTyping}
            onClickAdditional={onClickAdditional}
          />
        </SelectedMessagesBar>
      </div>
    </div>
  );
}

export default memo(MessengerWriteBar);
