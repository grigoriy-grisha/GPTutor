import React from "react";
import {
  Button,
  Div,
  Panel,
  PanelHeaderClose,
  PanelHeaderSubmit,
  useConfigProvider,
} from "@vkontakte/vkui";
import { Editor } from "@monaco-editor/react";
import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { oneDarkTheme } from "$/panels/CodeEditor/oneDarkTheme";
import { oneLightTheme } from "$/panels/CodeEditor/oneLightTheme";

import classes from "./CodeEditor.module.css";
import { AppPanelHeader } from "$/components/AppPanelHeader";

interface IProps {
  id: string;
}

function CodeEditor({ id }: IProps) {
  const { goBack } = useNavigationContext();
  const { appearance } = useConfigProvider();

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
          <AppPanelHeader
            before={<PanelHeaderClose onClick={goBack} />}
            after={<PanelHeaderSubmit />}
          >
            Редактор
          </AppPanelHeader>
        }
        childrenWithHeight={(height) => (
          <div
            style={{ marginTop: 16, width: "100%" }}
            className={classes[appearance as any]}
          >
            <Editor
              options={{ minimap: { enabled: false } }}
              height={height}
              width="100%"
              theme={appearance === "dark" ? "vs-dark" : "light"}
              language="javascript"
              loading={null}
              value=""
              onValidate={(...asd) => {
                console.log(asd);
              }}
              onMount={(editor, monaco) => {
                if (appearance === "dark") {
                  monaco.editor.defineTheme("one-dark", oneDarkTheme as any);
                  monaco.editor.setTheme("one-dark");
                  return;
                }

                monaco.editor.defineTheme("one-light", oneLightTheme as any);
                monaco.editor.setTheme("one-light");
              }}
            />
            <Div>
              <Button></Button>
            </Div>
          </div>
        )}
      ></AppContainer>
    </Panel>
  );
}

export default CodeEditor;
