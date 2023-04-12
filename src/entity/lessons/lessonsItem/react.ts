import { LessonItem } from "../LessonItem";
import { LessonRequest } from "../LessonRequest";

const FOR_BEGINNERS = "Для новичоков";

const ADVANCED = "Продвинутые темы";

export const reactLessons = [
  new LessonItem(
    "Что такое React",
    FOR_BEGINNERS,
    new LessonRequest("Что такое React, какие проблемы решает"),
    []
  ),
  new LessonItem(
    "Первое react приложение",
    FOR_BEGINNERS,
    new LessonRequest("Как создать и запустить свое первое react приложение?"),
    []
  ),
  new LessonItem(
    "JSX",
    FOR_BEGINNERS,
    new LessonRequest("Что такое JSX и для чего он нужен?"),
    [
      new LessonRequest(
        "Как бы выглядел синтаксис React без jsx и почему?",
        "Реакт без JSX"
      ),
    ]
  ),
  new LessonItem(
    "Условный ренндеринг",
    FOR_BEGINNERS,
    new LessonRequest("Что такое Условный ренеринг в React? Покажи примеры"),
    []
  ),
  new LessonItem(
    "Children",
    FOR_BEGINNERS,
    new LessonRequest("Что такое children в React?"),
    [new LessonRequest("Расскажи о метода Children в React", "Методы Children")]
  ),
  new LessonItem(
    "Списки и ключи",
    FOR_BEGINNERS,
    new LessonRequest("Как в React вывести список компонентов?"),
    [
      new LessonRequest("Что такое ключи в реакт? Для чего они нужны", "Ключи"),
      new LessonRequest(
        "Почему ключи должны быть уникальные?",
        "Уникальность ключей"
      ),
    ]
  ),
  new LessonItem(
    "Основы React",
    FOR_BEGINNERS,
    new LessonRequest(
      "Что предствялет из себя простое приложение на React, объясни основные самые простые концепты React"
    ),
    [
      new LessonRequest(
        "Что такое рендеринг в React, как происходит рендеринг React",
        "Рендеринг React"
      ),
      new LessonRequest(
        "Что такое компоненты в React, какие компоненты бывают?",
        "Компоненты"
      ),
      new LessonRequest("Что такое props в React?", "props"),
    ]
  ),
  new LessonItem(
    "Состояние. Работы с компонентами-классами",
    FOR_BEGINNERS,
    new LessonRequest(
      "Что такое состояние в React, покажи пример для классовых компонентов"
    ),
    [
      new LessonRequest(
        "Расскажи подробнее о состоянии классовых компонентов",
        "State"
      ),
      new LessonRequest(
        "Расскажи о методах жизненного цикла в классовых компонентах",
        "Методы жиненного цикла"
      ),
      new LessonRequest(
        "Расскажи о Refs в классовых компонентах и для чего нужны",
        "Refs"
      ),
    ]
  ),
  new LessonItem(
    "События",
    FOR_BEGINNERS,
    new LessonRequest("Как работать с событиями в React? Покажи примеры"),
    [new LessonRequest("Что такое SyntheticEvent", "SyntheticEvent")]
  ),
  new LessonItem(
    "Хуки. Управление функциональными компонентами",
    FOR_BEGINNERS,
    new LessonRequest("Что такое хуки в React, перечисли основные"),
    [
      new LessonRequest(
        "Какие обязательные правила должны соблюдаться для оптимальной работы хуков?",
        "Правила хуков"
      ),
      new LessonRequest(
        "Как создать пользователский хук",
        "Пользовательский хук"
      ),
      new LessonRequest(
        "Чем подход хуков отличается от подхода в классовых компонентах?",
        "Отличие классовых компонент и хуков"
      ),
      new LessonRequest(
        "Расскажи о хуке useState, для чего нужен, покажи различие от классовых компонент",
        "useState"
      ),
      new LessonRequest(
        "Расскажи о хуке useEffect, для чего нужен, покажи различие от классовых компонент",
        "useEffect"
      ),
      new LessonRequest(
        "Расскажи о хуке useRef, для чего нужен, покажи различие от классовых компонент",
        "useRef"
      ),
    ]
  ),
  new LessonItem(
    "Фрагменты",
    FOR_BEGINNERS,
    new LessonRequest("Что такое фрагменты в React?"),
    [new LessonRequest("Для чего нужны фрагменты в React?", "Для чего нужны?")]
  ),
  new LessonItem(
    "Контекст",
    FOR_BEGINNERS,
    new LessonRequest("Что такое контекст в React?"),
    [
      new LessonRequest(
        "Когда использовать контекст в React?",
        "Когда использовать"
      ),
      new LessonRequest(
        "Какие основные приемущества предоставляет контекст?",
        "Приемущества"
      ),
      new LessonRequest(
        "Расскажи как использовать контекст в функциональных компонентах?",
        "Как использовать"
      ),
    ]
  ),
  new LessonItem(
    "Предохранители. Error Boundary",
    ADVANCED,
    new LessonRequest("Что такое предохранители в React?"),
    [
      new LessonRequest(
        "Напиши компонент Error Boundary и объясни его работу и использование",
        "Пример"
      ),
      new LessonRequest(
        "Какие ограничения есть у компонентов-предохранителей в React?",
        "Огрмничения"
      ),
    ]
  ),
  new LessonItem(
    "Перенаправление рефов",
    ADVANCED,
    new LessonRequest("Что такое перенаправление рефов в React?"),
    [
      new LessonRequest(
        "Покажи пример компонента с перенаправлением рефов",
        "Пример"
      ),
    ]
  ),
  new LessonItem(
    "Компоненты высшего порядка",
    ADVANCED,
    new LessonRequest("Что такое компонент высшего порядка в React?"),
    [
      new LessonRequest(
        "Для чего нужны компоненты высшего порядка в React?",
        "Для чего нужны?"
      ),
      new LessonRequest(
        "Покажи пример компонента высшего порядка и его использование",
        "Пример"
      ),
    ]
  ),
  new LessonItem(
    "Порталы",
    ADVANCED,
    new LessonRequest("Что такое порталы в React? Для чего нужен?"),
    [
      new LessonRequest(
        "Покажи пример использования порталов в React?",
        "Пример"
      ),
    ]
  ),
  new LessonItem(
    "Оптимизация производительности",
    ADVANCED,
    new LessonRequest(
      "Какие есть проблемы с производительностью в React? Как с ними бороться?"
    ),
    [
      new LessonRequest(
        "Какие основные рекомендации для оптимизации React приложения?",
        "Рекомендации"
      ),
      new LessonRequest(
        "Как избавиться от лишних рендеро в классовых компонентах?",
        "Лишние рендеры в Классовых"
      ),
      new LessonRequest(
        "Как избавиться от лишних рендеро в функциональных компонентах?",
        "Лишние рендеры в Функциональных"
      ),
      new LessonRequest(
        "Расскажи подробнее о shouldComponentUpdate, для чего он нужен",
        "shouldComponentUpdate"
      ),
      new LessonRequest(
        "Расскажи подробнее о React.memo, для чего он нужен",
        "React.memo"
      ),
      new LessonRequest(
        "Расскажи подробнее о useCallback, для чего он нужен и какую проблему решает?",
        "useCallback"
      ),
      new LessonRequest(
        "Расскажи подробнее о useMemo, для чего он нужен и какую проблему решает?",
        "useMemo"
      ),
    ]
  ),
  new LessonItem(
    "Рендер-пропсы",
    ADVANCED,
    new LessonRequest("Что такое рендер-пропсы?"),
    [new LessonRequest("Покажи пример использования Рендер-пропсов", "Пример")]
  ),
  new LessonItem(
    "Проверка типов с помощью PropTypes",
    ADVANCED,
    new LessonRequest("Что такое PropTypes в React?"),
    [
      new LessonRequest(
        "Покажи примеры использования PropTypes в React",
        "Пример"
      ),
    ]
  ),
  new LessonItem(
    "Проверка типов с помощью PropTypes",
    ADVANCED,
    new LessonRequest("Что такое PropTypes в React?"),
    [
      new LessonRequest(
        "Покажи примеры использования PropTypes в React для функциональных компонентов",
        "Пример"
      ),
    ]
  ),
  new LessonItem(
    "Справочник хуков",
    ADVANCED,
    new LessonRequest("Покажи все хуки в React"),
    [
      new LessonRequest("Расскажи о хуке ```useState```", "useState"),
      new LessonRequest("Расскажи о хуке ```useEffect```", "useEffect "),
      new LessonRequest("Расскажи о хуке ```useContext```", "useContext "),
      new LessonRequest("Расскажи о хуке ```useReducer```", "useReducer"),
      new LessonRequest("Расскажи о хуке ```useCallback```", "useCallback"),
      new LessonRequest("Расскажи о хуке ```useMemo```", "useMemo"),
      new LessonRequest("Расскажи о хуке ```useRef```", "useRef"),
      new LessonRequest(
        "Расскажи о хуке ```useImperativeHandle```",
        "useImperativeHandle"
      ),
      new LessonRequest(
        "Расскажи о хуке ```useLayoutEffect```",
        "useLayoutEffect"
      ),
      new LessonRequest("Расскажи о хуке ```useDebugValue```", "useDebugValue"),
      new LessonRequest(
        "Расскажи о хуке ```useDeferredValue```",
        "useDeferredValue"
      ),
      new LessonRequest("Расскажи о хуке ```useTransition```", "useTransition"),
      new LessonRequest("Расскажи о хуке ```useId```", "useId"),
      new LessonRequest(
        "Расскажи о хуке ```useSyncExternalStore```",
        "useSyncExternalStore"
      ),
      new LessonRequest(
        "Расскажи о хуке ```useInsertionEffect```",
        "useInsertionEffect"
      ),
    ]
  ),
];
