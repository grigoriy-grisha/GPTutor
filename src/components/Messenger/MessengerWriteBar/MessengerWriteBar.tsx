import React, { memo } from "react";

import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";

import classes from "./MessengerWriteBar.module.css";
import { WriteBarMessage } from "./WriteBarMessage";
import { SelectedMessagesBar } from "./SelectedMessagesBar";

interface IProps {
  chatGpt: ChatGptTemplate;
  handleSend: (message: string) => void;
  isTyping: boolean;
  onSettingsClick: () => void;
  writeBarBefore: React.ReactNode;

  additionalRequest: (handleSend: (value: string) => void) => React.ReactNode;
}

function MessengerWriteBar({
  chatGpt,
  handleSend,
  writeBarBefore,
  additionalRequest,
}: IProps) {
  const hasSelectedMessages = chatGpt.hasSelectedMessages$.get();

  return (
    <div className={classes.container}>
      <div style={{ width: "100%" }}>
        <div style={{ display: hasSelectedMessages ? "block" : "none" }}>
          <SelectedMessagesBar chatGpt={chatGpt} />
        </div>
        <div style={{ display: !hasSelectedMessages ? "block" : "none" }}>
          {additionalRequest(handleSend)}
        </div>
        <WriteBarMessage
          writeBarBefore={writeBarBefore}
          chatGpt={chatGpt}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
}

export default memo(MessengerWriteBar);
