import { LessonItem } from "../LessonItem";
import { LessonRequest } from "../LessonRequest";

const BASIS = "Основы Typescript";
const ADVANCED = "Продвинутые темы Typescript";
const UTILITY_TYPES = "Utility Types в Typescript";

export const typescriptLessons = [
  new LessonItem(
    "Что такое Typescript?",
    BASIS,
    new LessonRequest("Что такое Typescript?"),
    [
      new LessonRequest("Для чего используется?"),
      new LessonRequest("Что такое строгая типизация?", "Строгая типизация"),
      new LessonRequest("Какие преимущества над javascript?", "Преимущества"),
      new LessonRequest(
        "Чем удобен Typescript преимущества над javascript?",
        "Удобства"
      ),
    ]
  ),
  new LessonItem(
    "Примитивные типы?",
    BASIS,
    new LessonRequest("Какие есть примитивные типы в Typescript?"),
    [
      new LessonRequest("Расскажи про тип ```string``` в Typescript", "string"),
      new LessonRequest("Расскажи про тип ```number``` в Typescript", "number"),
      new LessonRequest(
        "Расскажи про тип ```boolean`` в Typescript",
        "boolean"
      ),
      new LessonRequest("Расскажи про тип ```any`` в Typescript", "any"),
      new LessonRequest("Расскажи про тип ```void`` в Typescript", "void"),
      new LessonRequest(
        "Расскажи про ```null и undefined`` в Typescript",
        "null и undefined"
      ),
      new LessonRequest("Расскажи про ```Array`` в Typescript", "Array"),
      new LessonRequest("Расскажи про ```Tuple`` в Typescript", "Tuple"),
      new LessonRequest("Расскажи про ```Enum`` в Typescript", "Enum"),
      new LessonRequest("Расскажи про ```Never`` в Typescript", "Never"),
      new LessonRequest("Расскажи про ```Symbol`` в Typescript", "Symbol"),
    ]
  ),
  new LessonItem(
    "Пользовательские типы",
    BASIS,
    new LessonRequest(
      "Что такое пользовательские типы в Typescript? Как их объявить."
    ),
    [
      new LessonRequest(
        "Расскажи про ```interface``` в Typescript",
        "interface"
      ),
      new LessonRequest("Расскажи про ```type``` в Typescript", "type"),
      new LessonRequest("Расскажи про ```enum``` в Typescript", "enum"),
    ]
  ),
  new LessonItem(
    "Типизация функций в Typescript",
    BASIS,
    new LessonRequest("Как типизировать функции в Typescript?"),
    [
      new LessonRequest(
        "Как типизировать параметры функций в Typescript?",
        "Параметры"
      ),
      new LessonRequest(
        "Как типизировать возвращаемое значение функции в Typescript?",
        "Возвращаемое значение"
      ),
      new LessonRequest(
        "Объясни что такое необязательные параметры функции в Typescript?",
        "Необязательные параметры"
      ),
    ]
  ),
  new LessonItem(
    "Ключевое слово interface",
    BASIS,
    new LessonRequest(
      "Что такое ```interface``` в Typescript. Для чего используется, как объявить."
    ),
    [
      new LessonRequest(
        "Какие возможности предоставляют интерфейсы в TypeScript?",
        "Возможности"
      ),
      new LessonRequest(
        "Как можно типизировать функции с помозью interface в TypeScript?",
        "Типизация функций"
      ),
      new LessonRequest(
        "Что такое наследование интерфейсов?",
        "Наследование интерфейсов"
      ),
    ]
  ),
  new LessonItem(
    "Ключевое слово type",
    BASIS,
    new LessonRequest(
      "Что такое ```type``` в Typescript. Для чего используется, как объявить."
    ),
    []
  ),
  new LessonItem(
    "Ключевое слово enum",
    BASIS,
    new LessonRequest(
      "Что такое ```enum``` в Typescript. Для чего используется, как объявить."
    ),
    []
  ),
  new LessonItem(
    "Классы в TypeScript",
    ADVANCED,
    new LessonRequest("Что такое класс в TypeScript?"),
    [
      new LessonRequest("Как объявить класс в TypeScript?", "Объявление"),
      new LessonRequest(
        "Методы и свойства классов в TypeScript?",
        "Методы и свойства"
      ),
      new LessonRequest("Как наследовать классы в TypeScript?", "Наследование"),
      new LessonRequest(
        "Что такое абстрактный класс в Typescript?",
        "Абстрактный класс"
      ),
      new LessonRequest(
        "Как указать свойства классе readonly? И что это значит?",
        "readonly"
      ),
      new LessonRequest(
        "Какие модификаторы доступа к свойствам класса есть в Typescript?",
        "Доступ к свойствам"
      ),
      new LessonRequest(
        "Расскажи о наследовании интерфеса классом в Typescript?",
        "Наследование интерфейсов"
      ),
    ]
  ),
  new LessonItem(
    "Дженерики в TypeScript",
    ADVANCED,
    new LessonRequest("Что такое дженерики в TypeScript?"),
    [
      new LessonRequest(
        "Для чего используются Джинерики?",
        "Для чего используются"
      ),
      new LessonRequest("Как объявить дженерики в TypeScript?", "Объявление"),
      new LessonRequest(
        "Какие преимущества дают джинерики в TypeScript?",
        "Приемущства"
      ),
      new LessonRequest(
        "Можно ли использовать дженерики вместе с классами?",
        "С классами"
      ),
      new LessonRequest(
        "Можно ли использовать дженерики вместе с пользовательскими типами?",
        "С типами"
      ),
      new LessonRequest(
        "Можно ли использовать дженерики вместе с интерфейсами?",
        "С интерфейсами"
      ),
      new LessonRequest(
        "Какие ограничения есть у дженериков в TypeScript?",
        "Ограничения"
      ),
    ]
  ),
  new LessonItem(
    "Модули в TypeScript",
    ADVANCED,
    new LessonRequest("Что такое модули в TypeScript?"),
    [
      new LessonRequest("Что такое модули в TypeScript?", "Объявление"),
      new LessonRequest(
        "Какие типы экспорта модулей есть в TypeScript?",
        "Типы экспорта"
      ),
      new LessonRequest(
        "Как импортировать модули в TypeScript?",
        "Импорт модулей"
      ),
      new LessonRequest(
        "Какие соглашения о именовании модулей в TypeScript существуют?",
        "Соглашения"
      ),
    ]
  ),
  new LessonItem(
    "Декораторы в TypeScript",
    ADVANCED,
    new LessonRequest("Что такое декораторы в TypeScript?"),
    [
      new LessonRequest(
        "Какие типы декораторов существуют в TypeScript?",
        "Типы декораторов"
      ),
      new LessonRequest("Как объявить декоратор в TypeScript?", "Объявление"),
      new LessonRequest(
        "Как добавить декоратор к классу, методу или свойству?",
        "К классу, методу или свойству"
      ),
      new LessonRequest(
        "Какие примеры использования декораторов в TypeScript?",
        "Примеры"
      ),
    ]
  ),
  new LessonItem(
    "Примеси (Mixins) в TypeScript",
    ADVANCED,
    new LessonRequest("Что такое примеси в TypeScript?"),
    [
      new LessonRequest(
        "Как создать примеси в TypeScript?",
        "Создание примесей"
      ),
      new LessonRequest(
        "Какие возможности предоставляют примеси в TypeScript?",
        "Возможности"
      ),
      new LessonRequest(
        "Какие примеры использования примесей в TypeScript существуют?",
        "Примеры"
      ),
      new LessonRequest(
        "Какие проблемы могут возникнуть при использовании примесей в TypeScript?",
        "Проблемы"
      ),
    ]
  ),
  new LessonItem(
    "Вызов функции в контексте определенного типа данных (ThisType)",
    ADVANCED,
    new LessonRequest("Что такое ThisType в TypeScript?"),
    [
      new LessonRequest(
        "Как объявить функцию с использованием ThisType в TypeScript?",
        "Объявление"
      ),
      new LessonRequest(
        "Какие особенности работы контекста в TypeScript?",
        "Особенности"
      ),
      new LessonRequest(
        "Какие примеры использования ThisType в TypeScript существуют?",
        "Примеры"
      ),
      new LessonRequest(
        "Какие проблемы могут возникнуть при использовании ThisType в TypeScript?",
        "Проблемы"
      ),
    ]
  ),

  new LessonItem(
    "Оператор keyof в TypeScript",
    ADVANCED,
    new LessonRequest("Что такое оператор keyof в TypeScript?"),
    [
      new LessonRequest(
        "Какие типы данных можно использовать вместе с оператором keyof в TypeScript?",
        "С какими типами работает"
      ),
      new LessonRequest(
        "Какие возможности предоставляет оператор keyof в TypeScript?",
        "Какие возможности"
      ),
      new LessonRequest(
        "Какие примеры использования оператора keyof в TypeScript существуют?",
        "Примеры"
      ),
      new LessonRequest(
        "Какие проблемы могут возникнуть при использовании оператора keyof в TypeScript?",
        "Проблемы"
      ),
    ]
  ),
  new LessonItem(
    "Вариантность типов (Type Variance) в TypeScript",
    ADVANCED,
    new LessonRequest("Что такое вариантность типов в TypeScript?"),
    [
      new LessonRequest(
        "Какова разница между ковариантностью и контрвариантностью в TypeScript?",
        "Ковариантность и контрвариантность"
      ),
      new LessonRequest(
        "Какие возможности предоставляет вариантность типов в TypeScript?",
        "Какие возможности"
      ),
      new LessonRequest(
        "Какие примеры использования вариантности типов в TypeScript существуют?",
        "Примеры"
      ),
      new LessonRequest(
        "Какие проблемы могут возникнуть при использовании вариантности типов в TypeScript?",
        "Проблемы"
      ),
    ]
  ),
  new LessonItem(
    "Типы данных с условием (Conditional Types) в TypeScript",
    ADVANCED,
    new LessonRequest("Что такое условные типы данных в TypeScript?"),
    [
      new LessonRequest(
        "Как объявить условные типы данных в TypeScript?",
        "Объявление"
      ),
      new LessonRequest(
        "Какие возможности предоставляют условные типы данных в TypeScript?",
        "Какие возможности"
      ),
      new LessonRequest(
        "Какие примеры использования условных типов данных в TypeScript существуют?",
        "Примеры"
      ),
      new LessonRequest(
        "Какие проблемы могут возникнуть при использовании условных типов данных в TypeScript?",
        "Проблемы"
      ),
    ]
  ),
  new LessonItem(
    "infer в TypeScript",
    ADVANCED,
    new LessonRequest(
      "Что такое infer в TypeScript и для чего его используют?"
    ),
    [
      new LessonRequest(
        "Какова синтаксическая конструкция infer в TypeScript?",
        "Объявление"
      ),
      new LessonRequest(
        "Какие типы данных могут быть определены с помощью infer в TypeScript?",
        "Какие типы данных"
      ),
      new LessonRequest(
        "Какие примеры использования infer в TypeScript существуют?",
        "Примеры"
      ),
      new LessonRequest(
        "Какие примеры использования infer в TypeScript существуют?",
        "Проблемы"
      ),
    ]
  ),
  new LessonItem(
    " Pick в TypeScript",
    UTILITY_TYPES,
    new LessonRequest("Что такое Pick в TypeScript и для чего его используют?"),
    []
  ),
  new LessonItem(
    " Omit в TypeScript",
    UTILITY_TYPES,
    new LessonRequest("Что такое Omit в TypeScript и для чего его используют?"),
    []
  ),
  new LessonItem(
    " Partial в TypeScript",
    UTILITY_TYPES,
    new LessonRequest("Что такое Pick в Partial и для чего его используют?"),
    []
  ),
  new LessonItem(
    " Record в TypeScript",
    UTILITY_TYPES,
    new LessonRequest("Что такое Pick в Record и для чего его используют?"),
    []
  ),
  new LessonItem(
    " Parameters в TypeScript",
    UTILITY_TYPES,
    new LessonRequest(
      "Что такое Parameters в TypeScript и для чего его используют?"
    ),
    []
  ),
  new LessonItem(
    " Required в TypeScript",
    UTILITY_TYPES,
    new LessonRequest(
      "Что такое Record в TypeScript и для чего его используют?"
    ),
    []
  ),
  new LessonItem(
    " Awaited в TypeScript",
    UTILITY_TYPES,
    new LessonRequest(
      "Что такое Awaited в TypeScript и для чего его используют?"
    ),
    []
  ),
  new LessonItem(
    " Exclude в TypeScript",
    UTILITY_TYPES,
    new LessonRequest(
      "Что такое Exclude в TypeScript и для чего его используют?"
    ),
    []
  ),
  new LessonItem(
    " NonNullable в TypeScript",
    UTILITY_TYPES,
    new LessonRequest(
      "Что такое NonNullable в TypeScript и для чего его используют?"
    ),
    []
  ),
  new LessonItem(
    " ConstructorParameters в TypeScript",
    UTILITY_TYPES,
    new LessonRequest(
      "Что такое ConstructorParameters в TypeScript и для чего его используют?"
    ),
    []
  ),
  new LessonItem(
    " ReturnType в TypeScript",
    UTILITY_TYPES,
    new LessonRequest(
      "Что такое ReturnType в TypeScript и для чего его используют?"
    ),
    []
  ),
  new LessonItem(
    " InstanceType в TypeScript",
    UTILITY_TYPES,
    new LessonRequest(
      "Что такое InstanceType в TypeScript и для чего его используют?"
    ),
    []
  ),
  new LessonItem(
    " ThisParameterType в TypeScript",
    UTILITY_TYPES,
    new LessonRequest(
      "Что такое ThisParameterType в TypeScript и для чего его используют?"
    ),
    []
  ),
  new LessonItem(
    " ThisType в TypeScript",
    UTILITY_TYPES,
    new LessonRequest(
      "Что такое ThisType в TypeScript и для чего его используют?"
    ),
    []
  ),
  new LessonItem(
    "String Manipulation Types в TypeScript",
    UTILITY_TYPES,
    new LessonRequest("Что такое String Manipulation Types в TypeScript?"),
    [
      new LessonRequest(
        "Что такое Uppercase в TypeScript и для чего его используют?",
        "Uppercase"
      ),
      new LessonRequest(
        "Что такое Lowercase в TypeScript и для чего его используют?",
        "Lowercase"
      ),
      new LessonRequest(
        "Что такое Capitalize в TypeScript и для чего его используют?",
        "Capitalize"
      ),
      new LessonRequest(
        "Что такое Uncapitalize в TypeScript и для чего его используют?",
        "Uncapitalize"
      ),
    ]
  ),
];
