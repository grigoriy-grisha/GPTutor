import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
} from "@vkontakte/vkui";
import React, { useState } from "react";
import { Icon24ArrowRightOutline } from "@vkontakte/icons";
import { lessonsController } from "../entity/lessons";
import { useSubscribe } from "../hooks";
import { MainContainer } from "../components/MainContainer";

function Chapters({ id, goToMain, goBack }) {
  useSubscribe(lessonsController.currentChapter$);
  const [headerElem, setHeaderElem] = useState();

  const currentChapter = lessonsController.currentChapter$.getValue();

  return (
    <Panel id={id}>
      <div ref={setHeaderElem}>
        <PanelHeader
          before={
            <PanelHeaderBack
              onClick={() => {
                goBack();
                lessonsController.currentChapter$.next(null);
              }}
            />
          }
        >
          Темы
        </PanelHeader>
      </div>

      <MainContainer offsetHeight={headerElem?.offsetHeight}>
        {currentChapter && (
          <div style={{ paddingTop: 12, paddingBottom: 12, width: "100%" }}>
            {currentChapter.lessons.map((lesson, index) => (
              <SimpleCell
                after={<Icon24ArrowRightOutline />}
                onClick={() => {
                  goToMain();
                  currentChapter.setCurrentLesson(index);
                }}
              >
                {index + 1}. {lesson.name}
              </SimpleCell>
            ))}
          </div>
        )}
      </MainContainer>
    </Panel>
  );
}

export default Chapters;
