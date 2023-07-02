import React, { useEffect, useRef } from "react";
import {
  classNames,
  IconButton,
  Panel,
  PanelHeaderBack,
  Platform,
  Tabs,
  TabsItem,
  Title,
  useConfigProvider,
  usePlatform,
} from "@vkontakte/vkui";
import { Icon32Play } from "@vkontakte/icons";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python.js";
import "ace-builds/src-noconflict/mode-golang.js";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-error_marker";
import "ace-builds/src-min-noconflict/ext-language_tools.js";
import "ace-builds/src-min-noconflict/ext-emmet.js";
import "ace-builds/src-noconflict/ext-inline_autocomplete";
import "ace-builds/src-noconflict/ext-spellcheck";
import "ace-builds/src-noconflict/ext-static_highlight";
import "ace-builds/src-noconflict/ext-modelist";

import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { Editor, Monaco } from "@monaco-editor/react";
import { oneDarkTheme } from "$/panels/CodeEditor/oneDarkTheme";
import { oneLightTheme } from "$/panels/CodeEditor/oneLightTheme";

import classes from "./CodeEditor.module.css";
import { Console } from "$/panels/CodeEditor/Console";
import Time from "$/components/Time";
import { trainers } from "$/entity/Trainers";

interface IProps {
  id: string;
}

function getEditorTabName(language: string) {
  if (language === "javascript") return "index.js";
  if (language === "python") return "main.py";
  if (language === "go") return "main.go";
}

function getAceLanguage(language?: string) {
  if (language === "go") return "golang";
  return language;
}

function CodeEditor({ id }: IProps) {
  const [selected, setSelected] = React.useState("code");

  const ref = useRef<Monaco>();

  const { goBack } = useNavigationContext();
  const { appearance } = useConfigProvider();

  const platform = usePlatform();

  const setupTheme = () => {
    if (!ref.current) return;

    if (appearance === "dark") {
      ref.current.editor.defineTheme("one-dark", oneDarkTheme as any);
      ref.current.editor.setTheme("one-dark");
      return;
    }

    ref.current.editor.defineTheme("one-light", oneLightTheme as any);
    ref.current.editor.setTheme("one-light");
  };

  useEffect(() => {
    console.log(appearance);
    setupTheme();
  }, [appearance]);

  const currentTrainer = trainers.getCurrentTrainer();
  console.log(currentTrainer);

  if (!currentTrainer) return null;

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
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
                <Time seconds={currentTrainer.gptInstance.timer.time$.get()} />
              )
            }
          >
            <Title level="2">Редактор</Title>
          </AppPanelHeader>
        }
        childrenWithHeight={(height) => (
          <div className={classes.container}>
            <Tabs>
              <TabsItem
                selected={selected === "code"}
                id="code"
                aria-controls="tab-content-code"
                onClick={() => {
                  setSelected("code");
                }}
              >
                {getEditorTabName(currentTrainer?.language)}
              </TabsItem>
              <TabsItem
                selected={selected === "console"}
                id="console"
                aria-controls="tab-content-console"
                onClick={() => {
                  setSelected("console");
                }}
              >
                console
              </TabsItem>
            </Tabs>

            {selected === "code" && (
              <div
                style={{ height, width: "100%" }}
                className={classNames(classes[appearance as string])}
              >
                {platform !== Platform.VKCOM ? (
                  <AceEditor
                    onChange={(value) => {
                      currentTrainer?.value$.set(value);
                    }}
                    enableBasicAutocompletion
                    enableLiveAutocompletion
                    enableSnippets
                    height={height}
                    mode={getAceLanguage(
                      trainers.getCurrentTrainer()?.language
                    )}
                    value={currentTrainer?.value$.get()}
                    theme={appearance === "light" ? "tomorrow" : "one_dark"}
                  />
                ) : (
                  <Editor
                    onChange={(value) => {
                      currentTrainer?.value$.set(String(value));
                    }}
                    theme={appearance === "dark" ? "vs-dark" : "light"}
                    options={{
                      minimap: { enabled: false },
                    }}
                    height={height}
                    defaultLanguage={trainers.getCurrentTrainer()?.language}
                    defaultValue={currentTrainer?.value$.get()}
                    onMount={(editor, monaco) => {
                      ref.current = monaco;
                      setupTheme();
                    }}
                  />
                )}
              </div>
            )}
            {selected === "console" && (
              <div style={{ height, width: "100%" }}>
                <Console />
              </div>
            )}
          </div>
        )}
      ></AppContainer>
    </Panel>
  );
}

export default CodeEditor;
