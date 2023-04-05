import React from "react";
import PropTypes from "prop-types";

import { Panel } from "@vkontakte/vkui";

import { Messenger } from "../components/Messenger";
import { useSubscribe } from "../hooks";
import { lessonsController } from "../entity/lessons";

const Main = ({ id, user, goBack }) => {
  useSubscribe(lessonsController.currentChapter$.getValue()?.currentLesson$);

  const currentLesson = lessonsController.currentChapter$
    .getValue()
    ?.currentLesson$?.getValue();

  return (
    <Panel id={id}>
      <Messenger goBack={goBack} user={user} lesson={currentLesson} />
    </Panel>
  );
};

Main.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Main;
