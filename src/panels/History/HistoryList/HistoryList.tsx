import React from "react";

import { Button, Placeholder } from "@vkontakte/vkui";
import { Icon16ChevronLeft, Icon56GhostOutline } from "@vkontakte/icons";

import HistoryBanner from "$/panels/History/HistoryBanner";
import { chatGpt } from "$/entity/GPT";

import classes from "./HistoryList.module.css";

interface IProps {
  goBack: () => void;
}

function HistoryList({ goBack }: IProps) {
  const dialogs = chatGpt.history.dialogs.get();

  const history = [...dialogs].reverse();

  if (dialogs.length === 0) {
    return (
      <Placeholder
        className={classes.placeholder}
        icon={<Icon56GhostOutline />}
        header="История диалогов пуста"
        action={
          <Button
            mode="outline"
            before={<Icon16ChevronLeft />}
            onClick={goBack}
          >
            Вернуться назад
          </Button>
        }
      >
        Тут будут отображаться ваши диалоги из всех разделов
      </Placeholder>
    );
  }

  return (
    <>
      {history.map((dialog) => (
        <HistoryBanner key={dialog.id} dialog={dialog} />
      ))}
    </>
  );
}

export default HistoryList;
