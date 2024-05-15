import React, { useEffect } from "react";
import { Div, IconButton, Panel, Title } from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";

import classes from "./AnecdoteNews.module.css";
import { Icon28ServicesOutline } from "@vkontakte/icons";
import { FullscreenButton } from "$/components/FullscreenButton";
import { useNavigationContext } from "$/NavigationContext";
import { humorNews } from "$/entity/humor/HumorNews";
import { useInfinityScroll } from "$/hooks/useInfinityScroll";
import { AnecdoteItem } from "$/panels/AnecdoteNews/AnecdoteItem";

interface IProps {
  id: string;
}

function AnecdoteNews({ id }: IProps) {
  const { openApplicationInfoHumor } = useNavigationContext();

  useEffect(() => {
    humorNews.loadHistory();
  }, []);

  const hasNextPage = humorNews.hasNextHistory$.get();
  const loading = humorNews.getHumors$.loading.get();

  const setScrollableElement = useInfinityScroll({
    onLoadMore: () => humorNews.nextLoadHistory(),
    hasNextPage,
    loading,
  });

  return (
    <Panel id={id}>
      <AppContainer
        containerRef={setScrollableElement}
        headerChildren={
          <AppPanelHeader
            isMiddle
            before={
              <IconButton
                onClick={openApplicationInfoHumor}
                className={classes.buttonService}
              >
                <Icon28ServicesOutline className={classes.iconService} />
              </IconButton>
            }
            after={<FullscreenButton />}
          >
            <Title level="3">Лента</Title>
          </AppPanelHeader>
        }
      >
        <Div className={classes.container}>
          {humorNews.humors$.get().map((humorItem) => (
            <AnecdoteItem key={humorItem.id} humorItem={humorItem} />
          ))}
        </Div>
      </AppContainer>
    </Panel>
  );
}

export default AnecdoteNews;
