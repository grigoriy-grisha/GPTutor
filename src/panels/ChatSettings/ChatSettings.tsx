import React, { useEffect, useRef, useState } from "react";
import { UpdateEventFn, useRouter } from "@happysanta/router";

import {
  Alert,
  Button,
  Div,
  FixedLayout,
  FormItem,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Separator,
  Textarea,
  Title,
} from "@vkontakte/vkui";
import { AppDiv } from "../../components/AppDiv";
import { chatGpt } from "../../entity/GPT/ChatGpt";
import { InPortal } from "../../components/InPortal";
import { AppContainer } from "../../components/AppContainer";
import { CardBlock } from "../../components/CardBlock";

import classes from "./ChatSettings.module.css";

interface IProps {
  id: string;
  goBack: () => void;
}

//todo рефакторинг
function ChatSettings({ id, goBack }: IProps) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const isClearRef = useRef(true);
  const initialMessage = useRef(chatGpt.systemMessage.content$.get());
  const systemMessage = chatGpt.systemMessage.content$.get();

  const isDirty = initialMessage.current !== systemMessage;

  useEffect(() => {
    const listener: UpdateEventFn = () => {
      if (!isClearRef.current) return;
      chatGpt.systemMessage.content$.set(initialMessage.current);
    };

    router.on("update", listener);
    return () => {
      router.off("update", listener);
    };
  }, []);

  return (
    <Panel id={id}>
      <AppContainer
        maxHeight
        isSecondary
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Настройка чата
          </PanelHeader>
        }
      >
        {({ height }) => (
          <div style={{ minHeight: height, width: "100%" }}>
            <CardBlock isTop>
              <Group
                mode="plain"
                header={
                  <AppDiv>
                    <Title level="3">Системное сообщение</Title>
                  </AppDiv>
                }
                description="Системное сообщение преднаначено для ChatGPT.
                Оно определяет начальный контекст всего диалога.
                (Писать стихи, музыку, код, рецепты и т.д.)"
              >
                <FormItem>
                  <Textarea
                    value={chatGpt.systemMessage.content$.get()}
                    onChange={({ target }) =>
                      chatGpt.systemMessage.content$.set(target.value)
                    }
                  />
                </FormItem>
                <Div style={{ paddingTop: 0 }}>
                  <Button
                    disabled={chatGpt.isChangedSystemMessage$.get()}
                    mode="outline"
                    appearance="negative"
                    onClick={() => {
                      chatGpt.clearSystemMessage();
                    }}
                  >
                    Сбросить системное сообщение
                  </Button>
                </Div>
              </Group>
            </CardBlock>

            <FixedLayout vertical="bottom">
              <Separator wide />
              <Div className={classes.submitContainer}>
                <Button
                  size="m"
                  disabled={!isDirty}
                  style={{ width: "100%" }}
                  onClick={() => {
                    if (chatGpt.messages$.get().length === 0) {
                      isClearRef.current = false;
                      return router.popPage();
                    }
                    setShowAlert(true);
                  }}
                >
                  Сохранить изменния
                </Button>
              </Div>
            </FixedLayout>
            {showAlert && (
              <InPortal id="root">
                <Alert
                  actions={[
                    {
                      title: "Применить настройки",
                      mode: "destructive",
                      autoClose: true,
                      action: () => {
                        isClearRef.current = false;
                        chatGpt.clearMessages();
                        router.popPage();
                      },
                    },
                    {
                      title: "Вернуться",
                      autoClose: true,
                      mode: "cancel",
                    },
                  ]}
                  actionsLayout="vertical"
                  onClose={() => {
                    setShowAlert(false);
                  }}
                  header="Подтвердите действие"
                  text="После изменения системных настроек история сообщений будет отчищена!"
                />
              </InPortal>
            )}
          </div>
        )}
      </AppContainer>
    </Panel>
  );
}

export default ChatSettings;
