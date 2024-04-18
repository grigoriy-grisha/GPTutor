import {
  ChatGptIcon,
  GitLesson,
  GoLesson,
  HtmlCssInterview,
  HtmlCssLesson,
  JavascriptInterview,
  JSLesson,
  JSTraining,
  LeetCode,
  ReactInterview,
  ReactLesson,
  TypescriptLesson,
  VueLesson,
} from "$/icons";
import {
  Button,
  ButtonGroup,
  classNames,
  Headline,
  IconButton,
  Input,
  Spacing,
  useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";

import React, { useMemo } from "react";
import { chatGpt } from "$/entity/GPT";
import { ModeType } from "$/entity/lessons";
import { History } from "$/entity/history";

import classes from "./HistoryBanner.module.css";
import { useNavigationContext } from "$/NavigationContext";
import { ErrorBlock } from "$/components/ErrorBlock";
import { PythonTraining } from "$/icons/LessonIcons/PythonTraining";
import { GoTraining } from "$/icons/LessonIcons/GoTraining";
import AppBanner from "$/components/AppBanner";
import { Icon24Done, Icon28WriteOutline } from "@vkontakte/icons";
import { ChangeHistoryTitle } from "$/entity/history/ChangeHistoryTitle";
import { getBannerName } from "$/entity/history/utils";

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
  [ModeType.JS_TRAINING]: JSTraining,
  [ModeType.PYTHON_TRAINING]: PythonTraining,
  [ModeType.GO_TRAINING]: GoTraining,
};

interface IProps {
  dialog: History;
}

function HistoryBanner({ dialog }: IProps) {
  const chapterType = dialog.type;
  const Icon =
    !chapterType || chapterType === "Free"
      ? ChatGptIcon
      : BannerIcon[chapterType];

  const bannerTitle = getBannerName(dialog);

  const changeHistoryTitle = useMemo(
    () => new ChangeHistoryTitle(bannerTitle),
    [bannerTitle]
  );

  const {
    goToChatFree,
    goToChatLesson,
    goToChatInterview,
    goToChatLeetCode,
    openAlert,
  } = useNavigationContext();

  const { sizeX } = useAdaptivityWithJSMediaQueries();

  const currentChatGpt = chatGpt.getCurrentChatGpt();

  const isCompact = sizeX === "compact";

  if (chatGpt.history.getHistory$.error.get()) {
    return <ErrorBlock />;
  }

  return (
    <AppBanner
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
      header={
        <>
          {changeHistoryTitle.edit$.get() ? (
            <div className={classes.title}>
              <Input
                value={changeHistoryTitle.title$.get()}
                onChange={(event) => {
                  changeHistoryTitle.title$.set(event.target.value);
                }}
              />

              <IconButton
                disabled={!changeHistoryTitle.title$.get()}
                onClick={() => {
                  changeHistoryTitle.edit$.set(false);
                  chatGpt.history.updateHistoryTitle(
                    dialog.id,
                    changeHistoryTitle.title$.get()
                  );
                }}
              >
                <Icon24Done />
              </IconButton>
            </div>
          ) : (
            <div className={classes.title}>
              <span className={classes.titleText}>
                {changeHistoryTitle.title$.get()}
              </span>
              <IconButton
                onClick={() => {
                  changeHistoryTitle.edit$.set(true);
                }}
              >
                <Icon28WriteOutline />
              </IconButton>
            </div>
          )}
        </>
      }
      subheader={
        <>
          <span className={classes.lineClamp}>
            <Headline
              style={{ display: "inline" }}
              level="2"
              weight="1"
              Component="h4"
            >
              Последнее сообщение:
            </Headline>{" "}
            {dialog.lastMessage}
          </span>
          <Spacing size={8} />
          {dialog.lastUpdated && (
            <span className={classes.lineClamp}>
              <Headline
                style={{ display: "inline" }}
                level="2"
                weight="1"
                Component="h4"
              >
                Последнее обновление:
              </Headline>{" "}
              {new Date(dialog.lastUpdated).toLocaleString()}
            </span>
          )}
        </>
      }
      actions={
        <>
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
