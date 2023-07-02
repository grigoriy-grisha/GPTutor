import React, { useRef } from "react";
import AceEditor from "react-ace";
import {
  PanelSpinner,
  Platform,
  useConfigProvider,
  usePlatform,
} from "@vkontakte/vkui";

import { Editor as MonacoEditor, Monaco } from "@monaco-editor/react";

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

import { trainers } from "$/entity/Trainers";
import { TrainerItem } from "$/entity/Trainers/TrainerItem";
import { oneDarkTheme } from "$/panels/CodeEditor/oneDarkTheme";
import { oneLightTheme } from "$/panels/CodeEditor/oneLightTheme";

function getAceLanguage(language?: string) {
  if (language === "go") return "golang";
  return language;
}

interface IProps {
  currentTrainer: TrainerItem;
  height: string;
}

function Editor({ currentTrainer, height }: IProps) {
  const platform = usePlatform();
  const { appearance } = useConfigProvider();
  const ref = useRef<Monaco>();

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

  return (
    <>
      {platform !== Platform.VKCOM ? (
        <AceEditor
          onChange={(value) => {
            currentTrainer?.value$.set(value);
          }}
          enableBasicAutocompletion
          enableLiveAutocompletion
          enableSnippets
          height={height}
          mode={getAceLanguage(trainers.getCurrentTrainer()?.language)}
          value={currentTrainer?.value$.get()}
          theme={appearance === "light" ? "tomorrow" : "one_dark"}
        />
      ) : (
        <MonacoEditor
          onChange={(value) => {
            currentTrainer?.value$.set(String(value));
          }}
          theme={appearance === "dark" ? "vs-dark" : "light"}
          options={{
            minimap: { enabled: false },
          }}
          loading={<PanelSpinner size="large" />}
          height={height}
          defaultLanguage={trainers.getCurrentTrainer()?.language}
          defaultValue={currentTrainer?.value$.get()}
          onMount={(editor, monaco) => {
            ref.current = monaco;
            setupTheme();
          }}
        />
      )}
    </>
  );
}

export default Editor;
