import React, { memo } from "react";
import { Separator, WriteBar } from "@vkontakte/vkui";
import { LessonRequest } from "$/entity/lessons";

import WriteBarBefore from "./WriteBarBefore";
import WriteBarAfter from "./WriteBarAfter";
import { useWrite } from "./hooks/useWrite";
import { ChatGpt } from "$/entity/GPT";

interface IProps {
  chatGpt: ChatGpt;
  isTyping: boolean;
  handleSend: (value: string) => void;
  additionalRequests: LessonRequest[];
  onClickAdditional: () => void;
  onSettingsClick: () => void;
}

function WriteBarMessage({
  chatGpt,
  handleSend,
  additionalRequests,
  isTyping,
  onClickAdditional,
  onSettingsClick,
}: IProps) {
  const { value, setValue, onEnterSend, sendMessage } = useWrite({
    isTyping,
    handleSend,
  });

  return (
    <>
      <Separator wide />
      <WriteBar
        onKeyDown={onEnterSend}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        before={
          <WriteBarBefore
            additionalRequests={additionalRequests}
            onClickAdditional={onClickAdditional}
            onSettingsClick={onSettingsClick}
          />
        }
        after={
          <WriteBarAfter
            chatGpt={chatGpt}
            sendMessage={sendMessage}
            value={value}
            isTyping={isTyping}
          />
        }
        placeholder="Сообщение"
      />
    </>
  );
}

export default memo(WriteBarMessage);
