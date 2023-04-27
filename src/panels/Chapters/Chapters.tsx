import React from "react";

import {
  Header,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Search,
  SimpleCell,
} from "@vkontakte/vkui";
import { Icon20ChevronRight } from "@vkontakte/icons";

import { lessonsController } from "../../entity/lessons";
import { chatGpt } from "../../entity/GPT/ChatGpt";

import classes from "./Chapters.module.css";

interface IProps {
  id: string;
  goToChat: () => void;
  goBack: () => void;
}

//todo рефатокторинг
function Chapters({ id, goToChat, goBack }: IProps) {
  const currentChapter = lessonsController.currentChapter.get();
  const lessons = currentChapter?.lessons.get();

  return (
    <Panel id={id}>
      <div className={classes.panel}>
        <PanelHeader shadow before={<PanelHeaderBack onClick={goBack} />}>
          Диалоги
        </PanelHeader>
        {currentChapter && (
          <div className={classes.lessons}>
            <Search
              onChange={({ target }) =>
                currentChapter.searchLessons(target.value)
              }
              after={null}
            />
            {Object.entries(lessons || []).map(([key, value]) => (
              <React.Fragment key={key}>
                <Header mode="secondary">{key}</Header>
                {value.map((lesson) => (
                  <SimpleCell
                    key={lesson.id}
                    after={<Icon20ChevronRight />}
                    onClick={() => {
                      chatGpt.clearMessages();
                      chatGpt.clearSystemMessage();
                      lessonsController.setCurrentLesson(lesson.id);
                      goToChat();
                    }}
                  >
                    <div>{lesson.name}</div>
                  </SimpleCell>
                ))}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
}

export default Chapters;
