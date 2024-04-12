import { History, HistoryCreate } from "$/entity/history/types";
import { ModeType } from "$/entity/lessons";

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

export function getBannerName(dialog: HistoryCreate) {
  const chapterType = dialog.type;
  const lessonName = dialog.lessonName;

  if (dialog.title) return dialog.title;

  if (chapterType && lessonName) {
    return `${chapterNames[chapterType]} : ${lessonName}`;
  }

  if (chapterType === "Free") return "Свободный диалог";

  return chapterNames[chapterType];
}
