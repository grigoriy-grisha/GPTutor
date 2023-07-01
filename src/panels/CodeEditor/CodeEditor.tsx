import React from "react";
import {
  Panel,
  PanelHeaderClose,
  PanelHeaderSubmit,
  useConfigProvider,
} from "@vkontakte/vkui";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { AppPanelHeader } from "$/components/AppPanelHeader";

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
          <div style={{ marginTop: 16, width: "100%" }}>
            <CodeMirror
              theme={appearance}
              value={value}
              height={height}
              extensions={[javascript({ jsx: true, typescript: true })]}
              onChange={(asd) => {
                console.log(asd);
              }}
            />
          </div>
        )}
      ></AppContainer>
    </Panel>
  );
}

export default CodeEditor;
