import React, { memo } from "react";
import { Separator, WriteBar } from "@vkontakte/vkui";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";

import WriteBarAfter from "./WriteBarAfter";
import { useWrite } from "./hooks/useWrite";

interface IProps {
  chatGpt: ChatGptTemplate;
  handleSend: (value: string) => void;
  writeBarBefore: React.ReactNode;
  hideDeleteDialog?: boolean;
}

function WriteBarMessage({
  chatGpt,
  handleSend,
  writeBarBefore,
  hideDeleteDialog,
}: IProps) {
  const { value, setValue, onEnterSend, sendMessage } = useWrite({
    chatGpt,
    handleSend,
  });

  const isDisableUsing = !chatGpt.subscriptionGPT.$isAllowSendMessage.get();

  return (
    <>
      <Separator wide />
      <WriteBar
        disabled={isDisableUsing}
        onKeyDown={onEnterSend}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        before={writeBarBefore}
        after={
          <WriteBarAfter
            hideDeleteDialog={hideDeleteDialog}
            chatGptModel={chatGpt}
            sendMessage={sendMessage}
            value={value}
          />
        }
        placeholder="Сообщение"
      />
    </>
  );
}

export default memo(WriteBarMessage);
