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
import { useInfinityScroll } from "$/hooks/useInfinityScroll";
import { chatGpt } from "$/entity/GPT";

import classes from "./History.module.css";

interface IProps {
  id: string;
}

function History({ id }: IProps) {
  const pageNumber = chatGpt.history.pageNumber;
  const loading = chatGpt.history.getHistory$.loading.get();
  const hasNextPage = chatGpt.history.hasNextHistory$.get();

  const { goBack } = useNavigationContext();
  const setScrollableElement = useInfinityScroll({
    onLoadMore: () => chatGpt.history.nextLoadHistory(),
    hasNextPage,
    loading,
  });

  useEffect(() => {
    chatGpt.history.loadHistory();
  }, []);

  return (
    <Panel id={id}>
      <AppContainer
        containerRef={setScrollableElement}
        className={classes.mainContainer}
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            <Title level="1">История</Title>
          </PanelHeader>
        }
      >
        <div>
          <HistoryList goBack={goBack} />
          {loading && (
            <div
              className={classes.loading}
              style={{ paddingTop: pageNumber > 0 ? 15 : 70 }}
            >
              <Spinner size="large" />
            </div>
          )}
        </div>
      </AppContainer>
    </Panel>
  );
}
export default History;
