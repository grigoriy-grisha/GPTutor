import React from "react";

import { Placeholder } from "@vkontakte/vkui";
import { Icon56GhostOutline } from "@vkontakte/icons";

import HistoryBanner from "$/panels/History/HistoryBanner";
import { chatGpt } from "$/entity/GPT";

import classes from "./HistoryList.module.css";

function HistoryList() {
  const dialogs = chatGpt.history.dialogs.get();
  const loading = chatGpt.history.getHistory$.loading.get();

  if (dialogs.length === 0 && !loading) {
    return (
      <Placeholder
        className={classes.placeholder}
        icon={<Icon56GhostOutline />}
        header="История диалогов пуста"
      >
        Тут будут отображаться ваши диалоги из всех разделов
      </Placeholder>
    );
  }

  return (
    <>
      {dialogs.map((dialog) => (
        <HistoryBanner key={dialog.id} dialog={dialog} />
      ))}
    </>
  );
}

export default HistoryList;
