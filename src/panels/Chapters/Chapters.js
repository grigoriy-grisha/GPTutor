import React from "react";

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
} from "@vkontakte/vkui";
import { Icon24ArrowRightOutline } from "@vkontakte/icons";

import { lessonsController } from "../../entity/lessons";
import { useSubscribe } from "../../hooks";

import classes from "./Chapters.module.css";

function Chapters({ id, goToMain, goBack }) {
  useSubscribe(lessonsController.currentChapter$);

  const currentChapter = lessonsController.currentChapter$.getValue();

  return (
    <Panel id={id} className={classes.panel}>
      <PanelHeader
        before={
          <PanelHeaderBack
            onClick={() => {
              goBack();
              lessonsController.clearChapter();
            }}
          />
        }
      >
        Темы
      </PanelHeader>
      {currentChapter && (
        <div className={classes.lessons}>
          {currentChapter.lessons.map((lesson, index) => (
            <SimpleCell
              after={<Icon24ArrowRightOutline />}
              onClick={() => {
                goToMain();
                lessonsController.setCurrentLesson(index);
              }}
            >
              {index + 1}. {lesson.name}
            </SimpleCell>
          ))}
        </div>
      )}
    </Panel>
  );
}

export default Chapters;
