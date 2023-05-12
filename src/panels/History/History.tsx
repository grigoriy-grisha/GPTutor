import React from "react";

import {
  Button,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Title,
} from "@vkontakte/vkui";
import { chatGpt } from "$/entity/GPT";
import HistoryBanner from "$/panels/History/HistoryBanner";
import { AppContainer } from "$/components/AppContainer";

import classes from "./History.module.css";
import { Icon16ChevronLeft, Icon56GhostOutline } from "@vkontakte/icons";

interface IProps {
  goBack: () => void;
  goToChat: () => void;
  id: string;
}

function History({ id, goBack, goToChat }: IProps) {
  const dialogs = chatGpt.history.dialogs.get();
  return (
    <Panel id={id}>
      <AppContainer
        className={classes.mainContainer}
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            <Title level="1">История</Title>
          </PanelHeader>
        }
      >
        {dialogs.length !== 0 ? (
          [...chatGpt.history.dialogs.get()]
            .reverse()
            .map((dialog) => (
              <HistoryBanner
                key={dialog.id}
                dialog={dialog}
                goToChat={goToChat}
              />
            ))
        ) : (
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
        )}
      </AppContainer>
    </Panel>
  );
}
export default History;
