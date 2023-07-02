import React, { memo, useEffect } from "react";
import { Icon28EditOutline } from "@vkontakte/icons";

import { InPortal } from "$/components/InPortal";
import { Copy } from "$/components/Copy";

import classes from "./BlockCode.module.css";
import { Button } from "@vkontakte/vkui";
import { trainers } from "$/entity/Trainers";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  elem?: HTMLElement;
}

const isEditableLanguages = ["language-javascript", "language-python"];

function BlockCode({ elem }: IProps) {
  const { goToEditor } = useNavigationContext();
  let textToClickBoard = "";

  const iterator = document.createNodeIterator(
    elem!.querySelector("pre")!,
    NodeFilter.SHOW_TEXT
  );

  let textNode;
  while ((textNode = iterator.nextNode())) {
    textToClickBoard += textNode.textContent;
  }

  const languageCode = elem?.querySelector("code");

  const foundLanguage = isEditableLanguages.find((language) =>
    languageCode?.classList.contains(language)
  );

  useEffect(() => {
    const copyMocks = elem?.querySelectorAll("[data-copy-mock]");
    const copyCodes = elem?.querySelectorAll("[data-copy-code]");

    copyMocks?.forEach((copyMock) => {
      (copyMock as HTMLElement).style.display = "none";
    });
    copyCodes?.forEach((copyMock) => {
      (copyMock as HTMLElement).style.display = "block";
    });

    const editMocks = elem?.querySelectorAll("[data-edit-mock]");
    const editCodes = elem?.querySelectorAll("[data-edit-code]");

    editMocks?.forEach((copyMock) => {
      (copyMock as HTMLElement).style.display = "none";
    });

    editCodes?.forEach((copyMock) => {
      (copyMock as HTMLElement).style.display = "block";
    });
  });

  return (
    <InPortal elem={elem?.querySelector(".code-buttons") as HTMLElement}>
      <span
        data-copy-code=""
        className={classes.additional}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.codeInfo}>
          <Copy
            copyText="Скопировать код"
            mode="secondary"
            isButton
            textToClickBoard={textToClickBoard}
          />
        </div>
      </span>
      {!!foundLanguage && (
        <div data-edit-code="">
          <Button
            onClick={() => {
              trainers.setCurrentTrainerByLanguage(
                foundLanguage.split("language-")[1]
              );

              const currentTrainer = trainers.getCurrentTrainer();
              if (!currentTrainer) return;

              currentTrainer.value$.set(textToClickBoard);

              goToEditor();
            }}
            size="m"
            before={<Icon28EditOutline width={24} height={24} />}
            mode="secondary"
          >
            Песочница
          </Button>
        </div>
      )}
    </InPortal>
  );
}

export default memo(BlockCode);
