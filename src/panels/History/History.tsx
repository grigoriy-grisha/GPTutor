import React, { useEffect } from "react";

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";

import { useNavigationContext } from "$/NavigationContext";
import { HistoryList } from "$/panels/History/HistoryList";
import { chatGpt } from "$/entity/GPT";

import classes from "./History.module.css";

interface IProps {
  id: string;
}

function History({ id }: IProps) {
  const { goBack, goToChat } = useNavigationContext();

  useEffect(() => {
    chatGpt.history.loadHistory();
  }, []);

  const loading = chatGpt.history.getHistory$.loading.get();

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
        {loading ? (
          <div className={classes.loading}>
            <Spinner size="large" />
          </div>
        ) : (
          <HistoryList goBack={goBack} goToChat={goToChat} />
        )}
      </AppContainer>
    </Panel>
  );
}
export default History;
