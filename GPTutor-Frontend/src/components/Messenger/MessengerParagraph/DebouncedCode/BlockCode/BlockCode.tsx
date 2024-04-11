import { memo, useEffect } from "react";
import { trainers } from "$/entity/Trainers";
import { useNavigationContext } from "$/NavigationContext";
import { snackbarNotify } from "$/entity/notify";
import { copyService } from "$/services/CopyService";
import { useLocation } from "@happysanta/router";
import { Panels, Views } from "$/entity/routing";
import { chatGpt } from "$/entity/GPT";
import { mermaid } from "$/entity/mermaid";

interface IProps {
  elem?: HTMLElement;
}

const isEditableLanguages = [
  "language-javascript",
  "language-python",
  "language-go",
];

function BlockCode({ elem }: IProps) {
  const location = useLocation();

  const { goToEditor, goToMermaidPage } = useNavigationContext();

  function getCodeText() {
    let textToClickBoard = "";

    const iterator = document.createNodeIterator(
      elem!.querySelector("pre")!,
      NodeFilter.SHOW_TEXT
    );

    let textNode;
    while ((textNode = iterator.nextNode())) {
      textToClickBoard += textNode.textContent;
    }

    return textToClickBoard;
  }
  function copyToClickBoard() {
    copyService.copyToClickBoard$
      .run(getCodeText())
      .then(() => {
        snackbarNotify.notify({ type: "success", message: "Скопировано" });
      })
      .catch(() =>
        snackbarNotify.notify({
          type: "error",
          message: "Не удалось скопировать",
        })
      );
  }

  function editor() {
    const languageCode = elem?.querySelector("code");

    const foundLanguage = isEditableLanguages.find((language) =>
      languageCode?.classList.contains(language)
    );

    if (!foundLanguage) return;
    trainers.setCurrentTrainerByLanguage(foundLanguage.split("language-")[1]);

    const currentTrainer = trainers.getCurrentTrainer();
    if (!currentTrainer) return;

    currentTrainer.initTrainer(getCodeText());

    if (location.getViewActivePanel(Views.viewMain) !== Panels.chatTrainer) {
      chatGpt.chatGptTrainer.messages$.set([]);
    }

    goToEditor();
  }

  function handleMermaid() {
    mermaid.setMermaidCode(getCodeText());

    goToMermaidPage();
  }

  useEffect(() => {
    const copyMock = elem?.querySelector("[data-copy-mock]");
    if (!copyMock) return;

    copyMock.addEventListener("click", copyToClickBoard);
    return () => copyMock.removeEventListener("click", copyToClickBoard);
  });

  useEffect(() => {
    const editMock = elem?.querySelector("[data-edit-mock]");
    if (!editMock) return;

    editMock.addEventListener("click", editor);
    return () => editMock.removeEventListener("click", editor);
  });

  useEffect(() => {
    const mermaidMock = elem?.querySelector("[data-mermaid]");
    if (!mermaidMock) return;

    mermaidMock.addEventListener("click", handleMermaid);
    return () => mermaidMock.removeEventListener("click", handleMermaid);
  });

  return null;
}

export default memo(BlockCode);
