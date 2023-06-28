import {
  ChatGptIcon,
  GitLesson,
  GoLesson,
  HtmlCssInterview,
  HtmlCssLesson,
  JavascriptInterview,
  JSLesson,
  LeetCode,
  ReactInterview,
  ReactLesson,
  TypescriptLesson,
  VueLesson,
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
import { ModeType } from "$/entity/lessons";
import { History } from "$/entity/history";

import classes from "./HistoryBanner.module.css";
import { useNavigationContext } from "$/NavigationContext";
import { ErrorBlock } from "$/components/ErrorBlock";

import { DownloadDialog } from "./DownloadDialog";

const BannerIcon: Record<string, React.FC> = {
  [ModeType.JS]: JSLesson,
  [ModeType.Typescript]: TypescriptLesson,
  [ModeType.Vue]: VueLesson,
  [ModeType.Go]: GoLesson,
  [ModeType.React]: ReactLesson,
  [ModeType.Git]: GitLesson,
  [ModeType.HTMLCSS]: HtmlCssLesson,
  [ModeType.HTMLCSS_INTERVIEW]: HtmlCssInterview,
  [ModeType.REACT_INTERVIEW]: ReactInterview,
  [ModeType.JAVASCRIPT_INTERVIEW]: JavascriptInterview,
  [ModeType.LeetCode]: LeetCode,
};

const chapterNames: Record<string, string> = {
  [ModeType.JS]: "Javascript",
  [ModeType.Typescript]: "Typescript",
  [ModeType.Vue]: "Vue",
  [ModeType.React]: "React",
  [ModeType.Git]: "Git",
  [ModeType.Go]: "Go",
  [ModeType.HTMLCSS]: "HTML/CSS",
  [ModeType.HTMLCSS_INTERVIEW]: "Собеседование HTML/CSS",
  [ModeType.JAVASCRIPT_INTERVIEW]: "Собеседование JavaScript",
  [ModeType.REACT_INTERVIEW]: "Собеседование React",
  [ModeType.LeetCode]: "LeetCode",
};

interface IProps {
  dialog: History;
}

function HistoryBanner({ dialog }: IProps) {
  const {
    goToChatFree,
    goToChatLesson,
    goToChatInterview,
    goToChatLeetCode,
    openAlert,
    goBack,
  } = useNavigationContext();

  const chapterType = dialog.type;
  const lessonName = dialog.lessonName;
  const Icon =
    !chapterType || chapterType === "Free"
      ? ChatGptIcon
      : BannerIcon[chapterType];

  const { sizeX } = useAdaptivityWithJSMediaQueries();

  const currentChatGpt = chatGpt.getCurrentChatGpt();

  const isCompact = sizeX === "compact";

  if (chatGpt.history.getHistory$.error.get()) {
    return <ErrorBlock />;
  }

  function getBannerName() {
    if (chapterType && lessonName) {
      return `${chapterNames[chapterType]} : ${lessonName}`;
    }

    if (chapterType === "Free") return "Свободный диалог";

    return chapterNames[chapterType];
  }

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
            {Icon ? <Icon /> : <ChatGptIcon />}
          </div>
        </div>
      }
      header={<Title level="3">{getBannerName()}</Title>}
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
        <>
          <DownloadDialog
            downloadTXT={async () => {
              await chatGpt.history.downloadDialogAsTXT(dialog.id);
            }}
            downloadJSON={async () => {
              await chatGpt.history.downloadDialogAsJSON(dialog.id);
            }}
          />
          <ButtonGroup mode="vertical">
            <Button
              disabled={currentChatGpt.getMessages$.loading.get()}
              onClick={() => {
                chatGpt.restoreDialogFromHistory(
                  dialog.id,
                  goToChatFree,
                  goToChatLesson,
                  goToChatInterview,
                  goToChatLeetCode
                );
              }}
            >
              Перейти в диалог
            </Button>
            <Button
              disabled={chatGpt.history.deleteHistory$.loading.get()}
              appearance="negative"
              mode="outline"
              onClick={() => {
                openAlert({
                  onAction: async () => {
                    await chatGpt.history.removeHistoryDialog(dialog.id);
                    goBack();
                  },
                  actionText: "Удалить диалог",
                  header: "Подтвердите действие",
                  text: "Вы уверены? Диалог нельзя будет вернуть!",
                });
              }}
            >
              Удалить диалог из истории
            </Button>
          </ButtonGroup>
        </>
      }
    />
  );
}

export default HistoryBanner;
