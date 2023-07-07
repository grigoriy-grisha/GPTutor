import React, { useEffect } from "react";
import {
  classNames,
  IconButton,
  Panel,
  PanelHeaderBack,
  Spacing,
  Title,
  useConfigProvider,
} from "@vkontakte/vkui";
import { Icon32Play } from "@vkontakte/icons";

import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import Time from "$/components/Time";
import { trainers } from "$/entity/Trainers";
import { Editor } from "$/panels/CodeEditor/Editor";
import { chatGpt } from "$/entity/GPT";

import classes from "./CodeEditor.module.css";

interface IProps {
  id: string;
}

function CodeEditor({ id }: IProps) {
  const { goBack, goToChatTrainer } = useNavigationContext();
  const { appearance } = useConfigProvider();

  const currentTrainer = trainers.getCurrentTrainer();

  useEffect(() => {
    chatGpt.chatGptTrainer.setInitialSystemMessage(
      currentTrainer?.systemMessage
    );
  }, [currentTrainer?.systemMessage]);

  if (!currentTrainer) return null;

  return (
    <Panel id={id}>
      <div style={{ height: "100vh" }}>
        <AppContainer
          withoutTabbar
          headerChildren={
            <>
              <AppPanelHeader
                before={<PanelHeaderBack onClick={goBack} />}
                after={
                  chatGpt.chatGptTrainer.timer.isStopped$.get() ? (
                    <IconButton
                      disabled={chatGpt.chatGptTrainer.sendCompletions$.loading.get()}
                      className={classes.play}
                      onClick={() => {
                        goToChatTrainer();

                        setTimeout(async () => {
                          await chatGpt.chatGptTrainer.send(
                            `\`\`\`${currentTrainer?.language}\n` +
                              currentTrainer?.value$.get()
                          );
                        }, 400);
                      }}
                    >
                      <Icon32Play width={26} height={26} />
                    </IconButton>
                  ) : (
                    <Time seconds={chatGpt.chatGptTrainer.timer.time$.get()} />
                  )
                }
              >
                <Title level="2">Песочница</Title>
              </AppPanelHeader>
            </>
          }
          childrenWithHeight={(height) => (
            <div className={classes.container}>
              <div className={classNames(classes[appearance as string])}>
                <Editor height={height} currentTrainer={currentTrainer} />
              </div>
              <Spacing size={20} />
            </div>
          )}
        />
      </div>
    </Panel>
  );
}

export default CodeEditor;
