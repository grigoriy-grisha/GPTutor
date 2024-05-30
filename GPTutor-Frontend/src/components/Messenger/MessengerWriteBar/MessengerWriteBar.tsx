import React, { memo } from "react";

import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";

import { SubscriptionBlock } from "$/components/Messenger/MessengerWriteBar/SubscriptionBlock";

import classes from "./MessengerWriteBar.module.css";
import { WriteBarMessage } from "./WriteBarMessage";
import { SelectedMessagesBar } from "./SelectedMessagesBar";
import { DelayBlock } from "./DelayBlock";
import { tgService } from "$/services/TgService";
import {
  Button,
  Caption,
  Div,
  IconButton,
  Separator,
  Title,
} from "@vkontakte/vkui";
import { Icon28Cancel } from "@vkontakte/icons";

interface IProps {
  chatGpt: ChatGptTemplate;
  hideDeleteDialog?: boolean;
  handleSend: (message: string) => void;
  isTyping: boolean;
  writeBarBefore: React.ReactNode;
  scrollToBottom: () => void;
  additionalRequest: (
    handleSend: (value: string) => void,
    scrollToBottom: () => void
  ) => React.ReactNode;
}

function MessengerWriteBar({
  chatGpt,
  handleSend,
  writeBarBefore,
  additionalRequest,
  scrollToBottom,
  hideDeleteDialog,
}: IProps) {
  const hasSelectedMessages = chatGpt.hasSelectedMessages$.get();

  return (
    <div className={classes.container}>
      <div style={{ width: "100%" }}>
        {chatGpt.isDelay$.get() && <DelayBlock chatGpt={chatGpt} />}
        <div style={{ display: hasSelectedMessages ? "block" : "none" }}>
          <SelectedMessagesBar chatGpt={chatGpt} />
        </div>
        <div style={{ display: !hasSelectedMessages ? "block" : "none" }}>
          {!tgService.isSeeTg$.get() && (
            <>
              <Separator wide />
              <Div className={classes.containerTg}>
                <div className={classes.text}>
                  <Title level="3" className={classes.title} Component="h3">
                    Попробуйте наш бот в телеграм!
                  </Title>
                  <Caption>Бесплатный GPT-4o в интерфейсе телеграм!</Caption>
                </div>
                <div className={classes.containerTg}>
                  <Button
                    target="_blank"
                    href="https://t.me/DeepGPTBot"
                    mode="outline"
                  >
                    Перейти
                  </Button>
                  <IconButton onClick={() => tgService.setSeeTg()}>
                    <Icon28Cancel className={classes.close} />
                  </IconButton>
                </div>
              </Div>
            </>
          )}
          <SubscriptionBlock chatGpt={chatGpt} />
          {additionalRequest(handleSend, scrollToBottom)}
        </div>
        <WriteBarMessage
          hideDeleteDialog={hideDeleteDialog}
          writeBarBefore={writeBarBefore}
          chatGpt={chatGpt}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
}

export default memo(MessengerWriteBar);
