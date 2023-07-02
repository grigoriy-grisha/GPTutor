import React from "react";
import {
  classNames,
  Panel,
  PanelHeaderBack,
  Platform,
  Title,
  useConfigProvider,
  usePlatform,
} from "@vkontakte/vkui";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-error_marker";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-emmet.js";
import "ace-builds/src-noconflict/ext-inline_autocomplete";
import "ace-builds/src-noconflict/ext-spellcheck";
import "ace-builds/src-noconflict/ext-static_highlight";
import "ace-builds/src-noconflict/ext-modelist";

import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { Editor } from "@monaco-editor/react";
import { oneDarkTheme } from "$/panels/CodeEditor/oneDarkTheme";
import { oneLightTheme } from "$/panels/CodeEditor/oneLightTheme";

import classes from "./CodeEditor.module.css";

interface IProps {
  id: string;
}

const value = `
// Примеры использования переменных const, let и var

// Переменные const
const PI = 3.14159;
console.log(PI); // 3.14159

// Попытка изменить значение переменной const
const PI = 3.14159;
PI = 3.14; // Ошибка: переназначение константы запрещено

// Переменные let
let age = 25;
console.log(age); // 25

age = 30;
console.log(age); // 30

// Переменные let с блочной областью видимости
if (true) {
  let name = 'John';
  console.log(name); // John
}

console.log(name); // Ошибка: переменная name недоступна за пределами блока

// Переменные var
var age = 25;
console.log(age); // 25

age = 30;
console.log(age); // 30

// Переменные var с функциональной областью видимости
function sayHello() {
  var message = 'Hello';
  console.log(message);
}

sayHello(); // Hello
console.log(message); // Ошибка: переменная message недоступна за пределами функции

`;

function CodeEditor({ id }: IProps) {
  const { goBack } = useNavigationContext();
  const { appearance } = useConfigProvider();

  const platform = usePlatform();
  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
          <AppPanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            <Title level="2">Редактор</Title>
          </AppPanelHeader>
        }
        childrenWithHeight={(height) => (
          <div
            style={{ height, width: "100%" }}
            className={classNames(classes[appearance as string])}
          >
            {platform !== Platform.VKCOM ? (
              <AceEditor
                mode="javascript"
                value={value}
                theme={appearance === "light" ? "tomorrow" : "one_dark"}
              />
            ) : (
              <Editor
                options={{
                  minimap: { enabled: false },
                }}
                height={height}
                defaultLanguage="javascript"
                defaultValue={value}
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
            )}
          </div>
        )}
      ></AppContainer>
    </Panel>
  );
}

export default CodeEditor;
