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
import { useNavigationContext } from "$/NavigationContext";
import { userInfo } from "$/entity/user/UserInfo";
import { appService } from "$/services/AppService";

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

  const { goToGPTutorProfile } = useNavigationContext();
  const isAvailableBalance = userInfo.isAvailableBalance();

  return (
    <div className={classes.container}>
      <div style={{ width: "100%" }}>
        {chatGpt.isDelay$.get() && <DelayBlock chatGpt={chatGpt} />}
        <div style={{ display: hasSelectedMessages ? "block" : "none" }}>
          <SelectedMessagesBar chatGpt={chatGpt} />
        </div>
        {!isAvailableBalance && (
          <>
            <Separator wide />
            <Div className={classes.containerTg}>
              <div>
                <Title level="3" className={classes.title} Component="h3">
                  У вас закончился баланс!
                </Title>
                <span>
                  Приходите завтра, через сутки, пополним вам баланс на 10,000
                  ⚡!
                </span>
              </div>

              {appService.isTG() ? (
                <Button
                  href="https://t.me/DeepGPTBot/"
                  target="_blank"
                  size="m"
                  style={{
                    background: "var(--vkui--color_accent_orange--active)",
                    color: "#FF8C00 !important",
                  }}
                >
                  Пополнить баланс
                </Button>
              ) : (
                <Button
                  size="m"
                  style={{
                    background: "var(--vkui--color_accent_orange--active)",
                    color: "#FF8C00 !important",
                  }}
                  onClick={goToGPTutorProfile}
                >
                  Пополнить баланс
                </Button>
              )}
            </Div>
          </>
        )}
        <div style={{ display: !hasSelectedMessages ? "block" : "none" }}>
          {!tgService.isSeeTg$.get() && (
            <>
              <Separator wide />
              <Div className={classes.containerTg}>
                <div className={classes.text}>
                  <Title level="3" className={classes.title} Component="h3">
                    Попробуйте DeepSeek в отдельном сайте!
                  </Title>
                  <Caption>Даем пробный период и бесплатный баланс!</Caption>
                </div>
                <div className={classes.containerTg}>
                  <Button
                    target="_blank"
                    href="https://iiset.io/chat"
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
