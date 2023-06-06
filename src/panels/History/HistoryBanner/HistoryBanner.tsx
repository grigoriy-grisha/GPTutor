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
import { chatGpt } from "$/entity/GPT";
import { ChapterTypes } from "$/entity/lessons";
import { History } from "$/entity/history";

import classes from "./HistoryBanner.module.css";
import { useNavigationContext } from "$/NavigationContext";

const BannerIcon: Record<string, React.FC> = {
  [ChapterTypes.JS]: JSLesson,
  [ChapterTypes.Typescript]: TypescriptLesson,
  [ChapterTypes.Vue]: VueLessons,
  [ChapterTypes.React]: ReactLesson,
  [ChapterTypes.Git]: GitLesson,
  [ChapterTypes.HTMLCSS]: HtmlCssLesson,
};

const chapterNames: Record<string, string> = {
  [ChapterTypes.JS]: "Javascript",
  [ChapterTypes.Typescript]: "Typescript",
  [ChapterTypes.Vue]: "Vue",
  [ChapterTypes.React]: "React",
  [ChapterTypes.Git]: "Git",
  [ChapterTypes.HTMLCSS]: "HTML/CSS",
};

interface IProps {
  dialog: History;
}

function HistoryBanner({ dialog }: IProps) {
  const { goToChatFree, goToChatLesson } = useNavigationContext();

  const chapterType = dialog.type;
  const lessonName = dialog.lessonName;
  const Icon = chapterType === "Free" ? ChatGptIcon : BannerIcon[chapterType];
  const { sizeX } = useAdaptivityWithJSMediaQueries();

  const currentChatGpt = chatGpt.getCurrentChatGpt();

  const isCompact = sizeX === "compact";

  return (
    <Banner
      className={classNames(classes.banner, {
        [classes.compactBanner]: isCompact,
      })}
      before={
        <div
          className={classNames(classes.bannerIcon, {
            [classes.compactBannerIcon]: isCompact,
          })}
        >
          <div
            className={classNames(classes.iconContainer, {
              [classes.compactIconContainer]: isCompact,
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
        <>
          <span className={classes.lineClamp}>
            <Headline style={{ display: "inline" }} level="2" weight="1">
              Последнее сообщение:
            </Headline>{" "}
            {dialog.lastMessage}
          </span>
          {dialog.lastUpdated && (
            <span className={classes.lineClamp}>
              <Headline style={{ display: "inline" }} level="2" weight="1">
                Последнее обновление:
              </Headline>{" "}
              {new Date(dialog.lastUpdated).toLocaleString()}
            </span>
          )}
        </>
      }
      actions={
        <ButtonGroup mode="vertical">
          <Button
            disabled={currentChatGpt.getMessages$.loading.get()}
            onClick={() => {
              chatGpt.restoreDialogFromHistory(
                dialog.id,
                goToChatFree,
                goToChatLesson
              );
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
