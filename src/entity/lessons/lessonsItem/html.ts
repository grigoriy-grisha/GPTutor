import { LessonItem } from "../LessonItem";
import { LessonRequest } from "../LessonRequest";

const StartedHTML = "Введение в HTML";
const CommonHTML = "Основные понятия в HTML";
const StartedCSS = "Введение в CSS";
const CommonCSS = "Основные понятия в CSS";

export const htmlLessons = [
  new LessonItem(
    "Что такое HTML",
    StartedHTML,
    new LessonRequest("Объясни что такое HTML"),
    [
      new LessonRequest(
        "Что нужно для того, чтобы работать с HTML?",
        "Как начать?"
      ),
    ]
  ),
  new LessonItem(
    "Составляющие HTML",
    StartedHTML,
    new LessonRequest("Объясни из чего состоит HTML"),
    [
      new LessonRequest(
        "Что такое элементы в HTML, объясни их синтаксис и покажи примеры",
        "Элементы"
      ),
      new LessonRequest(
        "Что такое атрибуты в HTML, объясни их синтаксис и покажи примеры",
        "Атрибуты"
      ),
      new LessonRequest(
        "Расскажи о глобальных атрибутах",
        "Глобальные атрибуты"
      ),
      new LessonRequest(
        "Расскажи о пользователских атрибутах",
        "Пользовательские атрибуты"
      ),
    ]
  ),
  new LessonItem(
    "Структура HTML документа",
    CommonHTML,
    new LessonRequest("Объясни стрктуру HTML документа"),
    [
      new LessonRequest("Для чего нужен тег meta"),
      new LessonRequest("Для чего нужен тег head"),
      new LessonRequest("Для чего нужен тег body"),
    ]
  ),
  new LessonItem(
    "Элементы в HTML",
    CommonHTML,
    new LessonRequest("Объясни какие элементы в HTML чаще всего используются"),
    [
      new LessonRequest(
        "Расскажи об элементах группировки",
        "Элементы группирвоки"
      ),
      new LessonRequest("Расскажи о заголовках в HTML", "Заголовки"),
      new LessonRequest(
        "Расскажи как использовать изображения в HTML",
        "Изображения"
      ),
      new LessonRequest("Расскажи о списках в HTML", "Списки"),
      new LessonRequest("Расскажи о ссылках в HTML", "Ссылки"),
      new LessonRequest("Расскажи о таблицах в HTML", "Таблицы"),
      new LessonRequest("Расскажи о фреймах в HTML", "Фреймы"),
    ]
  ),
  new LessonItem(
    "Работа с формами",
    CommonHTML,
    new LessonRequest(
      "Расскажи об элементах формы в HTML и для чего они могут быть использованы"
    ),
    [
      new LessonRequest("Расскажи о кнопках в HTML", "Кнопки"),
      new LessonRequest("Расскажи о тексовых полях в HTML", "Ввод текста"),
      new LessonRequest(
        "Расскажи об элементах для ввода чисел в HTML",
        "Ввод чисел"
      ),
      new LessonRequest(
        "Расскажи о радиобаттноах и чекбоксах в HTML",
        "Флажки и метки"
      ),
      new LessonRequest(
        "Расскажи об элементах для вода цвета в HTML",
        "Ввод цвета"
      ),
      new LessonRequest(
        "Расскажи об элементах для ввода даты и времени в HTMlб",
        "Ввод даты и время"
      ),
      new LessonRequest(
        "Расскажи об элементах для работы с файлами в HTML",
        "Работа с файлами"
      ),
      new LessonRequest("Расскажи об элементе select", "select"),
      new LessonRequest("Расскажи об элементе textarea", "textarea"),
    ]
  ),
  new LessonItem(
    "Основные атрибуты в HTML",
    CommonHTML,
    new LessonRequest("Объясни какие атрибуты в HTML чаще всего используются"),
    [
      new LessonRequest("Расскажи об атррибуте class", "class"),
      new LessonRequest("Расскажи об атрибуте id", "id"),
      new LessonRequest("Расскажи об атрибуте alt", "alt"),
      new LessonRequest("Расскажи об атрибуте type", "type"),
      new LessonRequest("Расскажи об атрибуте placeholder", "placeholder"),
      new LessonRequest("Расскажи об атрибуте lang", "lang"),
      new LessonRequest("Расскажи об атрибуте rel", "rel"),
      new LessonRequest("Расскажи об атрибуте download", "download"),
      new LessonRequest("Расскажи о таблицах в title", "title"),
    ]
  ),
  new LessonItem(
    "Семантика",
    CommonHTML,
    new LessonRequest(
      "Расскажи об семантических элементах в HTML, для чего они могут быть нужны"
    ),
    [
      new LessonRequest("Расскажи об элементе article", "article"),
      new LessonRequest("Расскажи об элементе section", "section"),
      new LessonRequest(
        "Расскажи об элементах header и footer",
        "header и footer"
      ),
      new LessonRequest("Расскажи об элементе aside", "aside"),
      new LessonRequest("Расскажи об элементе main", "main"),
    ]
  ),
  new LessonItem(
    "Что такое CSS",
    StartedCSS,
    new LessonRequest("Объясни что такое CSS"),
    [
      new LessonRequest(
        "Что нужно для того, чтобы работать с CSS?",
        "Как начать?"
      ),
    ]
  ),
  new LessonItem(
    "Что такое CSS",
    StartedCSS,
    new LessonRequest("Объясни что такое CSS"),
    [
      new LessonRequest(
        "Что нужно для того, чтобы работать с CSS?",
        "Как начать?"
      ),
      new LessonRequest("Что такое стили?"),
      new LessonRequest(
        "Какие есть способы задать стили элементам?",
        "Способы стилизации"
      ),
    ]
  ),
  new LessonItem(
    "Селекторы",
    StartedCSS,
    new LessonRequest("Объясни что такое селекторы в CSS и покажи примеры"),
    [
      new LessonRequest("Какие есть виды селеторов?", "Виды селекторов"),
      new LessonRequest(
        "Как работают приоритеты селекторов?",
        "Приоритеты селекторов"
      ),
      new LessonRequest(
        "Как работают приоритеты селекторов?",
        "Приоритеты селекторов"
      ),
    ]
  ),
  new LessonItem(
    "Расшиернные селекторы",
    CommonCSS,
    new LessonRequest("Объясни сложные селекторы в CSS"),
    [
      new LessonRequest(
        "Расскажи о селекторах дочерних элементов",
        "Дочерние элементы"
      ),
      new LessonRequest(
        "Расскажи о селекторах элементов одного уровня",
        "Элементы одного уровня"
      ),
      new LessonRequest(
        "Что такое псевдоклассы в CSS? Расскажи о самых популярных",
        "Псевдоклассы"
      ),
      new LessonRequest(
        "Расскажи о псевдоклассах дочерних элементов в CSS",
        "Псевдоклассы дочерних элементов"
      ),
      new LessonRequest(
        "Расскажи о псевдоклассах форм в CSS",
        "Псевдоклассы форм"
      ),
      new LessonRequest("Расскажи о псевдоэлементах в CSS", "Псевдоэлементы"),
      new LessonRequest(
        "Расскажи о селекторах атрибутов в CSS",
        "Селекторы атрибутов"
      ),
      new LessonRequest(
        "Расскажи наследовании стилей в CSS",
        "Наследование стилей"
      ),
    ]
  ),
  new LessonItem(
    "Свойства",
    CommonCSS,
    new LessonRequest("Объясни что такое свойства в CSS"),
    [
      new LessonRequest(
        "На что влияют свойства в css, как можно кстомизировать HTML элементы?",
        "На что влияют свойства"
      ),
    ]
  ),
  new LessonItem(
    "Цвет в css",
    CommonCSS,
    new LessonRequest("Какие есть свойства для изменения цвета в css?"),
    [
      new LessonRequest("Что меняет свойстово color?", "color"),
      new LessonRequest("Что меняет свойстово background?", "background"),
    ]
  ),
  new LessonItem(
    "Стилизация шрифтов",
    CommonCSS,
    new LessonRequest("Какие есть свойства для стилизации шрифтов в css?"),
    [
      new LessonRequest("Что меняет свойстово font-family?", "font-family"),
      new LessonRequest("Что меняет свойстово font-size?", "font-size"),
      new LessonRequest("Что меняет свойстово font-weight?", "font-weight"),
      new LessonRequest("Что меняет свойстово word-wrap?", "word-wrap"),
      new LessonRequest("Что меняет свойстово text-align?", "text-align"),
    ]
  ),
  new LessonItem(
    "Внешние шрифты",
    CommonCSS,
    new LessonRequest("Что такое внешние шрифты в css?"),
    [
      new LessonRequest(
        "Какие есть способы подключать шрифты в css",
        "Способы подклчения шрифтов"
      ),
      new LessonRequest(
        "Что такое font-face, для чего оно используется?",
        "font-face"
      ),
      new LessonRequest(
        "Как подключать стили локально?",
        "Подключение шрифтов локально"
      ),
      new LessonRequest(
        "Как подключать шрифты черезь google-fonts",
        "Подклчение google-fonts шрифтов"
      ),
    ]
  ),
  new LessonItem(
    "Форматирование текста",
    CommonCSS,
    new LessonRequest("Какие есть способы форматирования текста в css?"),
    [
      new LessonRequest("Расскажи о свойстве text-transform", "text-transform"),
      new LessonRequest(
        "Расскажи о свойстве text-decoration",
        "text-decoration"
      ),
      new LessonRequest("Расскажи о свойстве letter-spacing", "letter-spacing"),
      new LessonRequest("Расскажи о свойстве word-spacing", "word-spacing"),
      new LessonRequest("Расскажи о свойстве text-shadow", "text-shadow"),
    ]
  ),
  new LessonItem(
    "Блочная модель",
    CommonCSS,
    new LessonRequest("Расскажи что таклое блочная модель"),
    []
  ),
  new LessonItem(
    "Отступы",
    CommonCSS,
    new LessonRequest("Какие бывают отступы в css?"),
    [
      new LessonRequest("Расскажи о внешних отступах в css", "Внешние отступы"),
      new LessonRequest(
        "Расскажи о внутренних отступах в css",
        "Внутренние отступы"
      ),
    ]
  ),
  new LessonItem(
    "Размеры элементов",
    CommonCSS,
    new LessonRequest("Расскажи как управлять размерами элементов"),
    [
      new LessonRequest("Обхясни свойства width и height", "width и height"),
      new LessonRequest(
        "Обхясни свойства min-width и min-height",
        "min-width и max-height"
      ),
      new LessonRequest(
        "Обхясни свойства max-width и max-height",
        "max-width и max-height"
      ),
      new LessonRequest(
        "Расскажи о свойстве box-sizing в css",
        "Переопределение разеров блока"
      ),
    ]
  ),
  new LessonItem(
    "Размеры элементов",
    CommonCSS,
    new LessonRequest("Расскажи как управлять размерами элементов"),
    [
      new LessonRequest("Обхясни свойства width и height", "width и height"),
      new LessonRequest(
        "Обхясни свойства min-width и min-height",
        "min-width и max-height"
      ),
      new LessonRequest(
        "Обхясни свойства max-width и max-height",
        "max-width и max-height"
      ),
      new LessonRequest(
        "Расскажи о свойстве box-sizing в css",
        "Переопределение разеров блока"
      ),
    ]
  ),
  new LessonItem(
    "Свойство display",
    CommonCSS,
    new LessonRequest(
      "Расскажи о свойствей display и какие значения оно может принимать, расскажи подробнее о каждом значении"
    ),
    []
  ),
  new LessonItem(
    "Flexbox",
    CommonCSS,
    new LessonRequest(
      "Что такое flexbox в css, для чего нужно и какие проблемы решает"
    ),
    [
      new LessonRequest("Расскажи о свойстве align-items", "align-items"),
      new LessonRequest(
        "Расскажи о свойстве justify-content",
        "justify-content"
      ),
      new LessonRequest("Расскажи о свойстве flex-direction", "flex-direction"),
      new LessonRequest("Расскажи о свойстве flex-flow", "flex-flow"),
      new LessonRequest("Расскажи о свойстве align-self", "align-self"),
      new LessonRequest(
        "Расскажи о свойствах flex-basis, flex-shrink, flex-grow",
        "flex-basis, flex-shrink, flex-grow"
      ),
      new LessonRequest("Расскажи о свойстве align-content", "align-content"),
    ]
  ),
  new LessonItem(
    "Grid",
    CommonCSS,
    new LessonRequest(
      "Что такое grid в css, для чего нужно и какие проблемы решает"
    ),
    [new LessonRequest("Чем отличается grid от flex?", "Отличия от flex")]
  ),
  new LessonItem(
    "CSS переменные",
    CommonCSS,
    new LessonRequest("Что такое CSS переменные?"),
    []
  ),
  new LessonItem(
    "Адаптив",
    CommonCSS,
    new LessonRequest("Что такое Адаптив в верстке?"),
    [
      new LessonRequest("Расскажи о метатеге viewport", "Метатег viewport"),
      new LessonRequest("Расскажи о media query", "Media query"),
      new LessonRequest(
        "Подскажи общие советы для адаптивного дизайна",
        "Советы"
      ),
    ]
  ),
  new LessonItem(
    "Позиционирование",
    CommonCSS,
    new LessonRequest("Расскажи о всех видах позиционирования в css"),
    [
      new LessonRequest("Расскажи о position static", "position:static"),
      new LessonRequest("Расскажи о position absolute", "position:relative"),
      new LessonRequest("Расскажи о position absolute", "position:absolute"),
      new LessonRequest("Расскажи о position fixed", "position:fixed"),
      new LessonRequest("Расскажи о position sticky", "position:sticky"),
      new LessonRequest(
        "Расскажи о том, как позиционировать один элемент относительно другого",
        "Позиционирование относительно другого элемента"
      ),
    ]
  ),
  new LessonItem(
    "Overflow",
    CommonCSS,
    new LessonRequest("Расскажи о свойстве overflow и всех его значениях"),
    [
      new LessonRequest(
        "Расскажи подробнее о значении visible свойства overflow",
        "visible"
      ),
      new LessonRequest(
        "Расскажи подробнее о значении hidden свойства overflow",
        "hidden"
      ),
      new LessonRequest(
        "Расскажи подробнее о значении auto свойства overflow",
        "auto"
      ),
      new LessonRequest(
        "Расскажи подробнее о значении scroll свойства overflow",
        "scroll"
      ),
      new LessonRequest(
        "Расскажи о overflow-x, overflow-y",
        "overflow-x, overflow-y"
      ),
    ]
  ),
  new LessonItem(
    "Единицы измерения",
    CommonCSS,
    new LessonRequest(
      "Расскажи о еденицах измерения в css, чем каждые друг от друга отличаются"
    ),
    []
  ),
  new LessonItem(
    "CSS переменные",
    CommonCSS,
    new LessonRequest("Что такое CSS переменные?"),
    []
  ),
];
