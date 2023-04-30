import React, { memo } from "react";
import { Separator, WriteBar } from "@vkontakte/vkui";
import { LessonRequest } from "$/entity/lessons";

import WriteBarBefore from "./WriteBarBefore";
import WriteBarAfter from "./WriteBarAfter";
import { useWrite } from "./hooks/useWrite";

interface IProps {
  isTyping: boolean;
  abortSend: () => void;
  handleSend: (value: string) => void;
  additionalRequests: LessonRequest[];
  clearMessages: () => void;
  onClickAdditional: () => void;
  onSettingsClick: () => void;
}

function WriteBarMessage({
  abortSend,
  handleSend,
  additionalRequests,
  isTyping,
  onClickAdditional,
  clearMessages,
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
            sendMessage={sendMessage}
            clearMessages={clearMessages}
            value={value}
            isTyping={isTyping}
            abortSend={abortSend}
          />
        }
        placeholder="Сообщение"
      />
    </>
  );
}

export default memo(WriteBarMessage);
