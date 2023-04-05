import {
  Button,
  Card,
  CardScroll,
  Group,
  Header,
  Panel,
  PanelHeader,
  Placeholder,
} from "@vkontakte/vkui";
import React from "react";

import { Icon28ArrowRightSquareOutline } from "@vkontakte/icons";

import { ChapterCard } from "./ChapterCard";

import { lessonsController } from "../../entity/lessons";

function Home({ id, goToChapters, goToMain }) {
  return (
    <Panel
      id={id}
      style={{
        background: "var(--vkui--color_background_content)",
        minHeight: "100vh",
      }}
    >
      <PanelHeader>Чат ГПТ</PanelHeader>
      <Group
        mode="plain"
        header={<Header mode="secondary">Темы для изучения</Header>}
      >
        <Card>
          <div
            style={{
              paddingTop: 18,
              paddingBottom: 18,
              background: "var(--vkui--color_background_content)",
            }}
          >
            <CardScroll size="m">
              {lessonsController.chapters.map((chapter, index) => {
                return (
                  <ChapterCard
                    onClick={() => {
                      lessonsController.setCurrentChapter(index);
                      goToChapters();
                    }}
                    chapterType={chapter.chapterType}
                  />
                );
              })}
            </CardScroll>
          </div>
        </Card>
        <div
          style={{
            marginTop: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Placeholder
            style={{ width: "90%" }}
            header="Представляем Чат ГПТ"
            action={
              <Button
                mode="outline"
                size="m"
                after={<Icon28ArrowRightSquareOutline />}
                onClick={goToMain}
              >
                Опробовать
              </Button>
            }
          >
            Взаимодействуйте с нейросетью в формате диалога, корректируйте
            запросы, получайте неожиданные и полезные варианты ответов
          </Placeholder>
        </div>
      </Group>
    </Panel>
  );
}

export default Home;
