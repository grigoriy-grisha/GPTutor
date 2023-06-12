import { Interview } from "$/entity/interview/Interview";
import { ModeType } from "$/entity/lessons";
import { InterviewItem } from "$/entity/interview/InterviewItem";

export const htmlCssInterview = new Interview(ModeType.HTMLCSS_INTERWIEW, [
  new InterviewItem("Что такое HTML и для чего он используется?"),
  new InterviewItem("Что такое CSS и для чего он используется?"),
  new InterviewItem("Какие бывают методы задания стилей CSS?"),
  new InterviewItem("Какие свойства вы знаете для задания цвета?"),
  new InterviewItem("Какие теги используются для разметки таблиц?"),
  new InterviewItem("Какие значения свойства position существуют?"),
  new InterviewItem("Какие теги используются для вставки картинок?"),
  new InterviewItem("Какие есть методы создания layout?"),
  new InterviewItem("Какие теги используются для создания списков?"),
  new InterviewItem("Какие есть методы создания анимаций?"),
  new InterviewItem("Какие теги используются для создания ссылок?"),
  new InterviewItem("Какие есть методы создания адаптивности?"),
  new InterviewItem("Какие теги используются для создания форм?"),
  new InterviewItem("Какие есть методы создания перехода между страницами?"),
  new InterviewItem("Какие теги используются для создания заголовков?"),
  new InterviewItem("Какие бывают методы задания стилей CSS?"),
  new InterviewItem("Какие есть методы создания hover-эффектов?"),
  new InterviewItem(
    "Что такое семантическая разметка и для чего она используется?"
  ),
  new InterviewItem(
    "Каким образом вы реализуете медиа-запросы в CSS для создания адаптивных макетов?"
  ),
  new InterviewItem(
    "Какие единицы измерения использовали для задания размеров элементов?"
  ),
  new InterviewItem("Какие значения атрибута type используются в теге input?"),
  new InterviewItem("Какие есть методы для задания границ элемента?"),
]);
