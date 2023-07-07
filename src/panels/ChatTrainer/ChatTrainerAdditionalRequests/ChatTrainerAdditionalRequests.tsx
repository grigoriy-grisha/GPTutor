import React from "react";
import { Separator } from "@vkontakte/vkui";
import { sig } from "dignals";
import { Icon28InfoOutline } from "@vkontakte/icons";

import { ChatInfoBlock } from "$/components/Messenger/ChatInfoBlock";

const infoFlag = sig(true);

function ChatTrainerAdditionalRequests() {
  return (
    <>
      <Separator wide />
      {infoFlag.get() && (
        <ChatInfoBlock onClose={() => infoFlag.set(false)}>
          <div
            style={{
              paddingRight: 8,
              color: "var(--vkui--color_background_accent_themed)",
            }}
          >
            <Icon28InfoOutline />
          </div>
          При выполнении кода ChatGPT может ошибаться.
          <br />
          Направляйте бота в нужное русло!
        </ChatInfoBlock>
      )}
    </>
  );
}

export default ChatTrainerAdditionalRequests;
