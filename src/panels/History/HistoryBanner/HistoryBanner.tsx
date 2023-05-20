import {
  ChatGptIcon,
  GitLesson,
  HtmlCssLesson,
  JSLesson,
  ReactLesson,
  TypescriptLesson,
  VueLessons,
} from "$/icons";
import {
  Banner,
  Button,
  ButtonGroup,
  classNames,
  Headline,
  Title,
  useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";
import React from "react";
import { chatGpt, GPTDialogHistory } from "$/entity/GPT";
import { ChapterTypes } from "$/entity/lessons";

import classes from "./HistoryBanner.module.css";

const BannerIcon: Record<ChapterTypes, React.FC> = {
  [ChapterTypes.JS]: JSLesson,
  [ChapterTypes.Typescript]: TypescriptLesson,
  [ChapterTypes.Vue]: VueLessons,
  [ChapterTypes.React]: ReactLesson,
  [ChapterTypes.Git]: GitLesson,
  [ChapterTypes.HTMLCSS]: HtmlCssLesson,
};

const chapterNames: Record<ChapterTypes, string> = {
  [ChapterTypes.JS]: "Javascript",
  [ChapterTypes.Typescript]: "Typescript",
  [ChapterTypes.Vue]: "Vue",
  [ChapterTypes.React]: "React",
  [ChapterTypes.Git]: "Git",
  [ChapterTypes.HTMLCSS]: "HTML/CSS",
};

interface IProps {
  dialog: GPTDialogHistory;
  goToChat: () => void;
}

function HistoryBanner({ dialog, goToChat }: IProps) {
  const chapterType = dialog.data?.chapterType;
  const lessonName = dialog.data?.lessonName;
  const Icon = chapterType ? BannerIcon[chapterType] : ChatGptIcon;
  const { sizeX } = useAdaptivityWithJSMediaQueries();

  return (
    <Banner
      className={classNames(classes.banner, {
        [classes.compactBanner]: sizeX === "compact",
      })}
      before={
        <div
          className={classNames(classes.bannerIcon, {
            [classes.compactBannerIcon]: sizeX === "compact",
          })}
        >
          <div
            className={classNames(classes.iconContainer, {
              [classes.compactIconContainer]: sizeX === "compact",
            })}
          >
            <Icon />
          </div>
        </div>
      }
      header={
        <Title level="3">
          {chapterType && lessonName
            ? `${chapterNames[chapterType]} : ${lessonName}`
            : "Свободный диалог"}
        </Title>
      }
      subheader={
        <span className={classes.lineClamp}>
          <Headline style={{ display: "inline" }} level="2" weight="1">
            Последнее сообщение:
          </Headline>{" "}
          {dialog.lastMessage.content}
        </span>
      }
      actions={
        <ButtonGroup mode="vertical">
          <Button
            onClick={() => {
              chatGpt.restoreDialogFromHistory(dialog.id);
              goToChat();
            }}
          >
            Перейди в диалог
          </Button>
          <Button
            appearance="negative"
            mode="outline"
            onClick={() => chatGpt.history.removeHistoryDialog(dialog.id)}
          >
            Удалить диалог из истории
          </Button>
        </ButtonGroup>
      }
    />
  );
}

export default HistoryBanner;
