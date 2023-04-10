import React from "react";

import {
  Header,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Search,
  SimpleCell,
} from "@vkontakte/vkui";
import { Icon24ArrowRightOutline } from "@vkontakte/icons";

import { lessonsController } from "../../entity/lessons";
import { useSubscribe } from "../../hooks";

import classes from "./Chapters.module.css";

function Chapters({ id, goToChat, goBack }) {
  useSubscribe(lessonsController.currentChapter$);

  const currentChapter = lessonsController.currentChapter$.getValue();
  const lessons = currentChapter?.lessons$.getValue();

  useSubscribe(currentChapter?.lessons$);

  return (
    <Panel id={id} className={classes.panel}>
      <PanelHeader
        shadow
        before={
          <PanelHeaderBack
            onClick={() => {
              goBack();
              lessonsController.clearChapter();
            }}
          />
        }
      >
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
          {Object.entries(lessons).map(([key, value]) => (
            <>
              <Header mode="secondary">{key}</Header>
              {value.map((lesson) => (
                <SimpleCell
                  key={lesson.id}
                  after={<Icon24ArrowRightOutline />}
                  onClick={() => {
                    goToChat();
                    lessonsController.setCurrentLesson(lesson.id);
                  }}
                >
                  <div>{lesson.name}</div>
                </SimpleCell>
              ))}
            </>
          ))}
        </div>
      )}
    </Panel>
  );
}

export default Chapters;
