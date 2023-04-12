import React from "react";

import {
  Button,
  Header,
  HorizontalCell,
  HorizontalScroll,
  Panel,
  PanelHeader,
  Placeholder,
  Link,
} from "@vkontakte/vkui";
import { Icon28ArrowRightSquareOutline } from "@vkontakte/icons";

import { lessonsController } from "../../entity/lessons";
import { AppContainer } from "../../components/AppContainer";

import { ChapterCard } from "./ChapterCard";
import { Issues } from "./Issues";

import classes from "./Home.module.css";

interface IProps {
  id: string;
  goToChapters: () => void;
  goToChat: () => void;
}

function Home({ id, goToChapters, goToChat }: IProps) {
  return (
    <Panel id={id} className={classes.panel}>
      <AppContainer headerChildren={<PanelHeader>GPTutor</PanelHeader>}>
        {({ height }) => (
          <div style={{ minHeight: height }} className={classes.group}>
            <div>
              <Header mode="secondary">Темы для изучения</Header>
              <div className={classes.cards}>
                <HorizontalScroll>
                  <div style={{ display: "flex" }}>
                    {lessonsController.chapters.map((chapter, index) => (
                      <HorizontalCell key={index} size="l">
                        <ChapterCard
                          onClick={() => {
                            lessonsController.setCurrentChapter(index);
                            goToChapters();
                          }}
                          chapterType={chapter.chapterType}
                        />
                      </HorizontalCell>
                    ))}
                  </div>
                </HorizontalScroll>
              </div>
            </div>

            <div className={classes.placeholderContainer}>
              <Placeholder
                className={classes.placeholder}
                header="Задай свой вопрос"
                action={
                  <Button
                    mode="outline"
                    size="m"
                    after={<Icon28ArrowRightSquareOutline />}
                    onClick={() => {
                      goToChat();
                      lessonsController.clearLesson();
                    }}
                  >
                    Начать диалог
                  </Button>
                }
              >
                Взаимодействуй с нейросетью{" "}
                <Link href="https://openai.com/blog/chatgpt" target="_blank">
                  Chat GPT
                </Link>{" "}
                в формате чата
              </Placeholder>
            </div>
            <Issues />
          </div>
        )}
      </AppContainer>
    </Panel>
  );
}

export default Home;
