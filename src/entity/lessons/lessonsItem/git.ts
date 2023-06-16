import { LessonItem } from "../LessonItem";
import { LessonRequest } from "../LessonRequest";

const FOR_BEGINNERS = "Для начинающих";
const STARTED = "Начало работы";
const TEAM_WORK = "Совместная работа";

export const gitLessons = [
  new LessonItem(
    "Что такое контроль версий?",
    FOR_BEGINNERS,
    new LessonRequest("Что такое контроль версий? Какие самые популярные"),
    [new LessonRequest("Что такое Git? Для чего используется", "Git")]
  ),
  new LessonItem(
    "Сохранение изменений",
    STARTED,
    new LessonRequest("Расскажи о локальном сохранении изменений в git"),
    [
      new LessonRequest("Расскажи о команде ```git add```", "git add"),
      new LessonRequest("Расскажи о команде ```git commit```", "git commit"),
      new LessonRequest("Расскажи о команде ```git diff```", "git diff"),
      new LessonRequest("Расскажи о команде ```git stash```", "git stash"),
      new LessonRequest(
        "Расскажи о файлу .gitignore, для чего нужен",
        ".gitignore"
      ),
    ]
  ),
  new LessonItem(
    "Проверка репозитория",
    STARTED,
    new LessonRequest(
      "Расскажи о том, как проверять состояние своего репозитория в git"
    ),
    [
      new LessonRequest("Расскажи о команде ```git status```", "git status"),
      new LessonRequest("Расскажи о команде ```git tag```", "git tag"),
      new LessonRequest("Расскажи о команде ```git blame```", "git blame"),
    ]
  ),
  new LessonItem(
    "Отмена изменений",
    STARTED,
    new LessonRequest("Расскажи о способах отменить изменения в git"),
    [
      new LessonRequest(
        "Расскажи о команде ```git checkout```",
        "git checkout"
      ),
      new LessonRequest("Расскажи о команде ```git clean```", "git clean"),
      new LessonRequest("Расскажи о команде ```git revert```", "git revert"),
      new LessonRequest("Расскажи о команде ```git reset```", "git reset"),
      new LessonRequest("Расскажи о команде ```git rm```", "git rm"),
    ]
  ),
  new LessonItem(
    "Переписывание истории",
    STARTED,
    new LessonRequest("Расскажи о способах переписывания истории в git"),
    [
      new LessonRequest(
        "Расскажи о команде ```git commit``` c влагом ```--amend```",
        "git commit --amend"
      ),
      new LessonRequest(
        "Расскажи о команде ```git rebase``` и всех его флагах",
        "git rebase"
      ),
      new LessonRequest("Расскажи о команде ```git reflog```", "git reflog"),
      new LessonRequest(
        "Почему  ```git rebase``` иногда нужно использовать с осторожностью?",
        "rebase с осторожностью"
      ),
    ]
  ),
  new LessonItem(
    "Синхронизация",
    TEAM_WORK,
    new LessonRequest(
      "Расскажи о совместной работе в git и почему необходима синхронизация между несколькими разработчиками?"
    ),
    [
      new LessonRequest("Расскажи о команде ```git remote```", "git remote"),
      new LessonRequest("Расскажи о команде ```git fetch```", "git fetch"),
      new LessonRequest("Расскажи о команде ```git push```", "git push"),
      new LessonRequest("Расскажи о команде ```git pull```", "git pull"),
    ]
  ),
  new LessonItem(
    "Использование веток",
    TEAM_WORK,
    new LessonRequest("Что такое ветки в git? Чем они могут быть полезны?"),
    [
      new LessonRequest("Расскажи о команде ```git branch```", "git branch"),
      new LessonRequest(
        "Расскажи о команде ```git checkout```",
        "git checkout"
      ),
      new LessonRequest("Расскажи о команде ```git merge```", "git merge"),
      new LessonRequest("Расскажи о команде ```git rebase```", "git rebase"),
      new LessonRequest(
        "Какие есть стратегии слияни в git?",
        "Стратегии слияни"
      ),
    ]
  ),
  new LessonItem(
    "Конфликты",
    TEAM_WORK,
    new LessonRequest("Как решать конфликты в git?"),
    [
      new LessonRequest(
        "Какие основные рекомендации для решения конфликта в git?",
        "Рекоментации"
      ),
      new LessonRequest(
        "Какие инструменты можно использовать, чтобы было проще решать конфликты",
        "Инструменты для решения конфликтов"
      ),
    ]
  ),
  new LessonItem("Процессы", TEAM_WORK, new LessonRequest("Какие "), [
    new LessonRequest(
      "Какие основные рабочие процессы есть при работе с git, какой порядок действий в них заложен?",
      "Рекоментации"
    ),
    new LessonRequest("Расскажи о GitFlow Workflow", "GitFlow Workflow"),
    new LessonRequest("Расскажи о Forking Workflow", "Forking Workflow"),
  ]),
];
