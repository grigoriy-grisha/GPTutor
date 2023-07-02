import React, { useMemo } from "react";

import { Div } from "@vkontakte/vkui";
import { Icon20ChevronRight } from "@vkontakte/icons";

import classes from "./Console.module.css";
import Markdown from "$/services/Markdown";
import { trainers } from "$/entity/Trainers";

function getOutput() {
  const currentTrainer = trainers.getCurrentTrainer();
  if (!currentTrainer) return "";

  const lastMessage = currentTrainer.gptInstance.getLastMessage();
  if (!lastMessage || lastMessage.role === "user") return "";
  return lastMessage.content$.get();
}

function Console() {
  const output = getOutput();

  const markdown = useMemo(() => new Markdown(), []);
  const html = markdown.renderWithoutPlugins(output);

  return (
    <Div className={classes.container}>
      <Icon20ChevronRight className={classes.caret} />
      <div
        className={classes.output}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </Div>
  );
}

export default Console;
