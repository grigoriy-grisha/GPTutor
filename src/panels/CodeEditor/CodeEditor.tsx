import React from "react";
import {
  classNames,
  IconButton,
  Panel,
  PanelHeaderBack,
  Tabs,
  TabsItem,
  Title,
  useConfigProvider,
} from "@vkontakte/vkui";
import { Icon32Play } from "@vkontakte/icons";

import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { Console } from "$/panels/CodeEditor/Console";
import Time from "$/components/Time";
import { trainers } from "$/entity/Trainers";
import { Editor } from "$/panels/CodeEditor/Editor";

import classes from "./CodeEditor.module.css";

interface IProps {
  id: string;
}

function getEditorTabName(language: string) {
  if (language === "javascript") return "index.js";
  if (language === "python") return "main.py";
  if (language === "go") return "main.go";
}

function CodeEditor({ id }: IProps) {
  const [selected, setSelected] = React.useState("code");

  const { goBack } = useNavigationContext();
  const { appearance } = useConfigProvider();

  const currentTrainer = trainers.getCurrentTrainer();

  if (!currentTrainer) return null;

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
          <>
            <AppPanelHeader
              before={<PanelHeaderBack onClick={goBack} />}
              after={
                currentTrainer.gptInstance.timer.isStopped$.get() ? (
                  <IconButton
                    disabled={currentTrainer.gptInstance.sendCompletions$.loading.get()}
                    className={classes.play}
                    onClick={async () => {
                      setSelected("console");
                      await currentTrainer.gptInstance.send(
                        currentTrainer?.value$.get()
                      );
                    }}
                  >
                    <Icon32Play width={26} height={26} />
                  </IconButton>
                ) : (
                  <Time
                    seconds={currentTrainer.gptInstance.timer.time$.get()}
                  />
                )
              }
            >
              <Title level="2">Песочница</Title>
            </AppPanelHeader>
            <Tabs className={classes.tabs}>
              <TabsItem
                selected={selected === "code"}
                id="code"
                aria-controls="tab-content-code"
                onClick={() => setSelected("code")}
              >
                {getEditorTabName(currentTrainer?.language)}
              </TabsItem>
              <TabsItem
                selected={selected === "console"}
                id="console"
                aria-controls="tab-content-console"
                onClick={() => setSelected("console")}
              >
                console
              </TabsItem>
            </Tabs>
          </>
        }
        childrenWithHeight={(height) => (
          <div className={classes.container}>
            <div
              style={{
                height,
                width: "100%",
                display: selected === "code" ? "block" : "none",
              }}
              className={classNames(classes[appearance as string])}
            >
              <Editor height={height} currentTrainer={currentTrainer} />
            </div>
            <div
              style={{
                height,
                width: "100%",
                display: selected === "console" ? "block" : "none",
              }}
            >
              <Console />
            </div>
          </div>
        )}
      ></AppContainer>
    </Panel>
  );
}

export default CodeEditor;
