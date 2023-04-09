import { LessonItem } from "../LessonItem";
import { LessonRequest } from "../LessonRequest";

const lessonJS1 = new LessonItem(
  "Переменные",
  new LessonRequest(
    "Объясни переменные const, let и var, в чем их отличия и покажи примеры"
  ),
  [
    new LessonRequest(
      "Объясни подробнее const в js, укажи примеры",
      "Переменные const"
    ),
    new LessonRequest("Объясни подробнее let, укажи примеры", "Переменные let"),
    new LessonRequest("Объясни подробнее var, укажи примеры", "Переменные var"),
    new LessonRequest("В чем отличия let от var?"),
    new LessonRequest("Когда лучше использовать let, const, var?"),
  ]
);

const lessonJS2 = new LessonItem(
  "Типы данных",
  new LessonRequest("Расскажи о типах данных в js"),
  [
    new LessonRequest("Объясни числа в js", "Числа"),
    new LessonRequest("Объясни строки в js", "Строки"),
    new LessonRequest("Объясни Булевый тип в js", "Булевый тип"),
    new LessonRequest("Объясни объекты в js", "Объекты"),
    new LessonRequest("Объясни Symbol в js", "Символы"),
    new LessonRequest("Объясни BigInt в js", "BigInt"),
    new LessonRequest("Объясни null в js", "null"),
    new LessonRequest("Объясни undefined в js", "undefined"),
    new LessonRequest("Объясни оператор typeof", "Оператор typeof"),
  ]
);

const lessonJS3 = new LessonItem(
  "Базовые операторы, математика",
  new LessonRequest(
    "Расскажи о базовых математических операторах в javascript, приведи примеры каждого из них"
  ),
  [
    new LessonRequest("Объясни сложение строк в js", "Сложение строк"),
    new LessonRequest("Объясни приведение к числу в js", "Приведение к числу"),
    new LessonRequest(
      "Объясни инкремент/декремент в js",
      "Инкремент/декремент"
    ),
    new LessonRequest(
      "Объясни побитовые операторы в js",
      "Побитовые операторы"
    ),
  ]
);

const lessonJS4 = new LessonItem(
  "Операторы сравнения",
  new LessonRequest("Расскажи об операторах сравнения в javascript"),
  [
    new LessonRequest("Объясни сравнение строк в js", "Сравнение строк"),
    new LessonRequest(
      "Объясни сравнение разных типов в js",
      "Сравнение разных типов"
    ),
    new LessonRequest("Объясни строгое сравнение в js", "Строгое сравнение"),
  ]
);

const lessonJS5 = new LessonItem(
  "Условия",
  new LessonRequest("Расскажи об условиях в javascript"),
  [
    new LessonRequest("Объясни ```if``` в js", "Инструкция «if»"),
    new LessonRequest("Объясни ```else``` в js", "Блок «else»"),
    new LessonRequest(
      "Объясни условный оператор ```?```",
      "Условный оператор «?»"
    ),
  ]
);

const lessonJS6 = new LessonItem(
  "Логические операторы",
  new LessonRequest("Расскажи об логических операторах в javascript"),
  [
    new LessonRequest("Объясни ```||``` в js", "|| (ИЛИ)"),
    new LessonRequest("Объясни ```&&``` в js", "&& (И)"),
    new LessonRequest("Объясни ```!``` в js", "! (НЕ)"),
  ]
);

const lessonJS7 = new LessonItem(
  "Циклы",
  new LessonRequest("Расскажи о циклах в js"),
  [
    new LessonRequest("Объясни цикл ```while``` в js", "Цикл «while»"),
    new LessonRequest("Объясни цикл ```do…while``` в js", "Цикл «do…while»"),
    new LessonRequest("Объясни цикл ```for``` в js", "Цикл «for»"),
    new LessonRequest("Объясни ```break``` в js", "«break»"),
    new LessonRequest("Объясни ```continue``` в js", "«continue»"),
  ]
);

const lessonJS8 = new LessonItem(
  "Массивы",
  new LessonRequest("Расскажи о массивах в js"),
  [
    new LessonRequest("Как создать массив в js", "Объявление"),
    new LessonRequest("Расскажи о методах массивв", "Методы массива"),
    new LessonRequest(
      "Расскажи о  ```pop/push```, ```shift/unshift``` в js",
      "pop/push, shift/unshift"
    ),
    new LessonRequest(
      "Расскажи о Многомерных массивах в js",
      "Многомерные массивы"
    ),
    new LessonRequest(
      "Расскажи о способах перебора массива в js",
      "Перебор массива"
    ),
  ]
);

const lessonJS9 = new LessonItem(
  "Функции",
  new LessonRequest("Расскажи о функциях в js"),
  [
    new LessonRequest(
      "Объясни Function Expression в js",
      "Function Expression"
    ),
    new LessonRequest(
      "Объясни Function Declaration в js",
      "Function Declaration"
    ),
    new LessonRequest(
      "Объясни стрелочные функции в js, в чем их отлчия",
      "Стрелочные функции"
    ),
    new LessonRequest("Объясни контекст функции в js", "Контекст"),
  ]
);

const lessonJS10 = new LessonItem(
  "Методы массивов",
  new LessonRequest("Расскажи о методах массивов в js"),
  [
    new LessonRequest("Расскажи о ```splice``` в js", "splice"),
    new LessonRequest("Расскажи о ```slice``` в js", "slice"),
    new LessonRequest("Расскажи о ```concat``` в js", "concat"),
    new LessonRequest("Расскажи о ```forEach``` в js", "Перебор: forEach"),

    new LessonRequest("Расскажи о методе ```filter``` в js", "filter"),
    new LessonRequest("Расскажи о методе ```map``` в js", "map"),
    new LessonRequest("Расскажи о методе ```sort``` в js", "sort"),
    new LessonRequest("Расскажи о методе ```reverse``` в js", "reverse"),
    new LessonRequest("Расскажи о методе ```reduce``` в js", "reduce"),
    new LessonRequest("Расскажи о  ```Array.isArray``` в js", "Array.isArray"),
    new LessonRequest(
      "Расскажи о методах ```indexOf```, ```lastIndexOf```, ```includes``` в js",
      "Поиск в массиве по значинию"
    ),
    new LessonRequest(
      "Расскажи о методах ```find```, ```findIndex```, ```findLastIndex``` в js",
      "Поиск в массиве с условием"
    ),
  ]
);

const lessonJS11 = new LessonItem(
  "Объекты",
  new LessonRequest("Расскажи об Объектах в js"),
  [
    new LessonRequest("Расскажи о доступе к полям объекта", "Доступ"),
    new LessonRequest(
      "Расскажи об изменениях полей в js",
      "Изменение значений"
    ),
    new LessonRequest(
      "Расскажи об удалении полей из обьекта",
      "Удаление полей"
    ),
    new LessonRequest(
      "Расскажи о проверки полей на существование в обьекте",
      "Проверка на существование"
    ),

    new LessonRequest(
      "Расскажи о способах перебора обьекта",
      "Перебор объектов"
    ),
    new LessonRequest("Расакажи о методах объектов", "Методы объектов"),
  ]
);

const lessonJS12 = new LessonItem(
  "Map и Set",
  new LessonRequest("Расскажи о ```Map``` и ```Set``` в js"),
  [
    new LessonRequest("Расскажи о ```Map``` в js", "Map"),
    new LessonRequest("Расскажи о ```Set``` в js", "Set"),
  ]
);

const lessonJS13 = new LessonItem(
  "Рекурсия",
  new LessonRequest("Расскажи о рекурсии в js"),
  [
    new LessonRequest(
      "Расскажи о различии рекурсивного обхода и цикличного",
      "Циклы и рекурсия"
    ),
    new LessonRequest(
      "Расскажи об рекурсивных структурах",
      "Рекурсивные структуры"
    ),
    new LessonRequest("Как обходить рекурсией деревья", "Деревья"),
    new LessonRequest(
      "Как обходоить рекурсией свзяные списки",
      "Связные списки"
    ),
  ]
);

const lessonJS14 = new LessonItem(
  "Область видимости",
  new LessonRequest("Расскажи об области видимости в js"),
  [new LessonRequest("Расскажи об видах области видимости", "Виды")]
);

const lessonJS15 = new LessonItem(
  "Замыкание",
  new LessonRequest("Объясни замыкание в js"),
  [
    new LessonRequest(
      "Покажи полезные примеры использования замыканий в js",
      "Примеры замыканий"
    ),
  ]
);

const lessonJS16 = new LessonItem(
  "Классы",
  new LessonRequest("Расскажи о классах в js"),
  [
    new LessonRequest("Покажи примеры классов в js", "Примеры классов"),
    new LessonRequest("Объясни свойства классов в js", "Свойства классов"),
    new LessonRequest("Объясни методы классов в js", "Методы классов"),
    new LessonRequest("Объясни наследование классов в js", "Наследование"),
    new LessonRequest(
      "Объясни статические свойства и методы в js",
      "Статические свойства и методы"
    ),
    new LessonRequest("Расскажи об instanceof в js", "instanceof"),
  ]
);

const lessonJS17 = new LessonItem(
  "Обработка ошибок",
  new LessonRequest("Расскажи об ошибках в js и как с ними работать"),
  [
    new LessonRequest("Объясни о try catch, покажи примеры", "try...catch"),
    new LessonRequest(
      "Расскажи про пользовательских ошибках, расширение базового класса Error",
      "Свои ошибки"
    ),
  ]
);

const lessonJS18 = new LessonItem(
  "Промисы",
  new LessonRequest("Расскажи об промисах в js"),
  [
    new LessonRequest(
      "Расскажи историю, почему были созданы промисы и какую проблему они решают",
      "История"
    ),
    new LessonRequest("Покажи примеры использования промисов", "Примеры"),
    new LessonRequest("Какие методы есть у промисов?", "Методы"),
    new LessonRequest(
      "Какие есть способы обработки ошибок в промисах?",
      "Обработка ошибок"
    ),
    new LessonRequest(
      "Расскажи о статических методах промисов, какие есть и для чего могут быть использованы",
      "Статические методы"
    ),
  ]
);

const lessonJS19 = new LessonItem(
  "async/await",
  new LessonRequest("Расскажи о синтаксисе async/await в js"),
  []
);

export const lessonsJs = [
  lessonJS1,
  lessonJS2,
  lessonJS3,
  lessonJS4,
  lessonJS5,
  lessonJS6,
  lessonJS7,
  lessonJS8,
  lessonJS9,
  lessonJS10,
  lessonJS11,
  lessonJS12,
  lessonJS13,
  lessonJS14,
  lessonJS15,
  lessonJS16,
  lessonJS17,
  lessonJS18,
  lessonJS19,
];
