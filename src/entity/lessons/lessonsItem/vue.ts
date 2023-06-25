import { LessonItem } from "../LessonItem";
import { LessonRequest } from "../LessonRequest";

const FOR_BEGINNERS = "Для новичоков";
const FOR_ADVANCED = "Продвинутые темы";

export const vueLessons = [
  new LessonItem(
    "Что такое Vue?",
    FOR_BEGINNERS,
    new LessonRequest("Что такое Vue? Какую проблему решает?"),
    [
      new LessonRequest(
        "Первое Vue приложение",
        "Как создать своей первое Vue приложение"
      ),
    ]
  ),
  new LessonItem(
    "Vue CLI",
    FOR_BEGINNERS,
    new LessonRequest("Что такое Vue CLI?"),
    [
      new LessonRequest("Установка", "Как установить Vue CLI?"),
      new LessonRequest(
        "Первое Vue приложение",
        "Как создать своей первое Vue приложение"
      ),
      new LessonRequest(
        "Создание проекта",
        "Как создать новый проект с помощью Vue CLI?"
      ),
      new LessonRequest(
        "Сборка проекта",
        "Как собрать проект с помощью Vue CLI?"
      ),
      new LessonRequest(
        "Режимы разработки и продакшена",
        "Какие режимы разработки и продакшена есть в Vue CLI и как их использовать?"
      ),
      new LessonRequest(
        "Настройка проекта",
        "Как настроить проект с помощью Vue CLI?"
      ),
    ]
  ),
  new LessonItem(
    "Шаблоны",
    FOR_BEGINNERS,
    new LessonRequest("Что такое шаблоны в Vue?"),
    [
      new LessonRequest(
        "Как vue декларативно отображает данные?",
        "Декларативная отрисовка"
      ),
    ]
  ),
  new LessonItem(
    "Директивы",
    FOR_BEGINNERS,
    new LessonRequest(
      "Какие директивы есть в Vue.js и для чего они используются?"
    ),
    [
      new LessonRequest("Что такое v-bind и как использовать?", "v-bind"),
      new LessonRequest(
        "В чем разница между v-if и v-show в Vue.js и когда использовать каждый?",
        "v-if и v-show"
      ),
      new LessonRequest(
        "Как использовать v-for для отображения списков в Vue.js?",
        "v-for"
      ),
      new LessonRequest("Что такое v-model и как использовать?", "v-model"),
      new LessonRequest(
        "Как использовать v-on для прослушивания событий в Vue.js?",
        "v-on"
      ),
    ]
  ),
  new LessonItem(
    "События",
    FOR_BEGINNERS,
    new LessonRequest("Как обрабатывать события в Vue.js?"),
    []
  ),
  new LessonItem(
    "Компоненты",
    FOR_BEGINNERS,
    new LessonRequest("Что такое Компоненты в Vue.js?"),
    [
      new LessonRequest(
        "Как создать компонент в Vue.js?",
        "Объясни v-for во Vue?"
      ),
      new LessonRequest(
        "Как создать компонент в Vue.js?",
        "Объясни v-for во Vue?"
      ),
      new LessonRequest(
        "Props",
        "Как передать данные в компоненты через Props?"
      ),
      new LessonRequest(
        "События компонентов",
        "Как обрабатывать события в компонентах в Vue.js?"
      ),
      new LessonRequest(
        "Слоты",
        "Что такое слоты и как они используются в компонентах Vue.js?"
      ),
      new LessonRequest(
        "Динамические компоненты",
        "Как использовать динамические компоненты в Vue.js?"
      ),
    ]
  ),
  new LessonItem(
    "Формы",
    FOR_BEGINNERS,
    new LessonRequest("Какие есть способы работы с формами во Vue?"),
    [
      new LessonRequest(
        "Двухстороннее связывание",
        "Как использовать двухстороннее связывание в формах Vue?"
      ),
      new LessonRequest(
        "Формы и валидация",
        "Как создать и использовать компоненты форм в Vue.js?"
      ),
      new LessonRequest(
        "Обработка событий формы",
        "Как обрабатывать события формы в Vue.js?"
      ),
      new LessonRequest(
        "Вывод ошибок валидации",
        "Как выводить ошибки валидации на форме в Vue.js?"
      ),
      new LessonRequest(
        "Очистка и сброс формы",
        "Как очистить и сбросить форму в Vue.js?"
      ),
    ]
  ),
  new LessonItem(
    "Стилизация",
    FOR_BEGINNERS,
    new LessonRequest("Какие есть способы стилизации во Vue?"),
    [
      new LessonRequest(
        "CSS классы в компонентах",
        "Как использовать CSS классы в компонентах Vue.js?"
      ),
      new LessonRequest(
        "Inline стили",
        "Как использовать inline стили в компонентах Vue.js?"
      ),
      new LessonRequest(
        "Scoped стили",
        "Что такое scoped стили и как использовать их в компонентах Vue.js?"
      ),
      new LessonRequest(
        "Глобальные стили",
        "Как использовать глобальные стили в Vue.js?"
      ),
      new LessonRequest(
        "Препроцессоры CSS",
        "Как использовать препроцессоры CSS (например, SASS или LESS) в Vue.js?"
      ),
    ]
  ),
  new LessonItem(
    "Роутинг в Vue",
    FOR_ADVANCED,
    new LessonRequest("Что такое роутниг в Vue? Для чего нужен"),
    [
      new LessonRequest(
        "Vue Router",
        "Что такое Vue Router и как его настроить?"
      ),
      new LessonRequest(
        "Динамический роутинг",
        "Как работать с динамическим роутингом в Vue?"
      ),
      new LessonRequest(
        "Обработка переходов",
        "Как обрабатывать переходы между страницами в Vue?"
      ),
      new LessonRequest(
        "Вложенные роуты",
        "Как использовать вложенные роуты в Vue?"
      ),
      new LessonRequest(
        "Редиректы и алиасы",
        "Как создавать редиректы и алиасы в роутинге Vue?"
      ),
    ]
  ),
  new LessonItem(
    "Vue Анимация",
    FOR_ADVANCED,
    new LessonRequest("Что такое анимации в Vue? Как их использовать?"),
    [
      new LessonRequest(
        "Переходы",
        "Как создать анимированные переходы между элементами в Vue?"
      ),
      new LessonRequest(
        "Директивы анимации",
        "Как использовать директивы анимации в Vue?"
      ),
      new LessonRequest(
        "Пользовательские транзишены",
        "Как создавать пользовательские транзишены в Vue?"
      ),
      new LessonRequest(
        "Анимация компонентов",
        "Как анимировать появление и исчезновение компонентов в Vue?"
      ),
      new LessonRequest(
        "Переходы между страницами",
        "Как создать анимацию переходов между страницами в Vue?"
      ),
    ]
  ),
  new LessonItem(
    "Vue Анимация",
    FOR_ADVANCED,
    new LessonRequest("Что такое анимации в Vue? Как их использовать?"),
    [
      new LessonRequest(
        "Переходы",
        "Как создать анимированные переходы между элементами в Vue?"
      ),
      new LessonRequest(
        "Директивы анимации",
        "Как использовать директивы анимации в Vue?"
      ),
      new LessonRequest(
        "Пользовательские транзишены",
        "Как создавать пользовательские транзишены в Vue?"
      ),
      new LessonRequest(
        "Анимация компонентов",
        "Как анимировать появление и исчезновение компонентов в Vue?"
      ),
      new LessonRequest(
        "Переходы между страницами",
        "Как создать анимацию переходов между страницами в Vue?"
      ),
    ]
  ),
  new LessonItem("Vuex", FOR_ADVANCED, new LessonRequest("Что такое Vuex?"), [
    new LessonRequest(
      "Установка и настройка Vuex",
      "Как установить и настроить Vuex в проекте Vue.js?"
    ),
    new LessonRequest(
      "Хранилище и модули",
      "Как создать хранилище и модули в Vuex?"
    ),
    new LessonRequest(
      "Геттеры и мутации",
      "Как использовать геттеры и мутации в Vuex?"
    ),
    new LessonRequest(
      "Действия и модифицирующие действия",
      "Как использовать действия и модифицирующие действия в Vuex?"
    ),
    new LessonRequest(
      "Подключение Vue компонентов к Vuex",
      "Как подключить Vue компоненты к Vuex?"
    ),
  ]),
  new LessonItem(
    "Тестирование в Vue.js",
    FOR_ADVANCED,
    new LessonRequest("Тестирование в Vue.js. Объясни"),
    [
      new LessonRequest(
        "Jest",
        "Как использовать Jest для тестирования в Vue.js?"
      ),
      new LessonRequest(
        "Vue Test Utils",
        "Как использовать Vue Test Utils для тестирования компонентов в Vue.js?"
      ),
      new LessonRequest(
        "Моки и заглушки",
        "Что такое моки и заглушки и как их использовать при тестировании в Vue.js?"
      ),
      new LessonRequest(
        "Асинхронное тестирование",
        "Как выполнять асинхронные тесты в Vue.js?"
      ),
      new LessonRequest(
        "Тестирование маршрутов",
        "Как тестировать маршруты в Vue.js?"
      ),
    ]
  ),
  new LessonItem(
    "Vue.js и API",
    FOR_ADVANCED,
    new LessonRequest("Как работать с API в Vue.js?"),
    [
      new LessonRequest(
        "AJAX запросы с Axios",
        "Как использовать Axios для AJAX запросов в Vue.js?"
      ),
      new LessonRequest(
        "Работа с REST API",
        "Как работать с REST API в Vue.js?"
      ),
      new LessonRequest(
        "Обработка ответов от сервера",
        "Как обрабатывать ответы от сервера в Vue.js?"
      ),
      new LessonRequest(
        "Аутентификация и авторизация",
        "Как реализовать аутентификацию и авторизацию в Vue.js?"
      ),
      new LessonRequest(
        "WebSockets и реактивность",
        "Как использовать WebSockets для реактивности в Vue.js?"
      ),
    ]
  ),
  new LessonItem(
    "Фильтры",
    FOR_ADVANCED,
    new LessonRequest("Что такое фильтры в Vue.js?"),
    [
      new LessonRequest(
        "Использование фильтров",
        "Как использовать фильтры в Vue.js?"
      ),
      new LessonRequest(
        "Свои фильтры",
        "Как создать собственные фильтры в Vue.js?"
      ),
      new LessonRequest(
        "Цепочки фильтров",
        "Как использовать цепочки фильтров в Vue.js?"
      ),
      new LessonRequest(
        "Фильтры в директивах",
        "Можно ли использовать фильтры в директивах в Vue.js?"
      ),
      new LessonRequest(
        "Компьютеризованные фильтры",
        "Что такое компьютеризованные фильтры и как их использовать в Vue.js?"
      ),
    ]
  ),
];
