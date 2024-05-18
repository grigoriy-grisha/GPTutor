import { LessonItem } from "../LessonItem";
import { LessonRequest } from "../LessonRequest";

const FOR_BEGINNERS = "Основы языка";
const ADVANCED = "Продвинутые темы";

export const goLessons = [
  new LessonItem(
    "Язык Go",
    FOR_BEGINNERS,
    new LessonRequest(
      "Расскажи о языке Go, для чего применяется и в чем его приемущества"
    ),
    []
  ),
  new LessonItem(
    "Переменные",
    FOR_BEGINNERS,
    new LessonRequest("Расскажи о переменных в языке go"),
    [
      new LessonRequest("Расскажи о константах в go?", "Константы"),
      new LessonRequest(
        "Расскажи о кратком определении переменной в Go",
        "Краткое определение переменной"
      ),
    ]
  ),
  new LessonItem(
    "Типы данных",
    FOR_BEGINNERS,
    new LessonRequest("Расскажи о типах данных в языке go"),
    [
      new LessonRequest(
        "Расскажи о целочисленных типах в go",
        "Целочисленные типы"
      ),
      new LessonRequest(
        "Расскажи о цислах с плавающей точкой в go",
        "Числа с плавающей точкой"
      ),
      new LessonRequest(
        "Расскажи о комплексных числах в Go",
        "Комплексные числа"
      ),
      new LessonRequest("Расскажи о типе bool в Go", "bool"),
      new LessonRequest("Расскажи о строках в Go", "Строки"),
      new LessonRequest(
        "Расскажи о неявной типизации в Go",
        "Неявная типизация"
      ),
    ]
  ),
  new LessonItem(
    "Арифметические операции",
    FOR_BEGINNERS,
    new LessonRequest("Расскажи о арифметические операциях в языке go"),
    []
  ),
  new LessonItem(
    "Структуры данных",
    FOR_BEGINNERS,
    new LessonRequest("Какие есть структуры данных в go?"),
    [
      new LessonRequest(
        "Как объявить структуру в Go и какие операции можно выполнять с ней?",
        "Структуры"
      ),
      new LessonRequest("Как объявить и использовать массивы в Go?", "Массивы"),
      new LessonRequest(
        "Как создать и работать со срезами (slices) в Go?",
        "Срезы"
      ),
      new LessonRequest(
        "Как использовать карты (maps) в Go и для чего они хорошо подходят?",
        "Карты"
      ),
      new LessonRequest(
        "Как работать со строками в Go и какие функции доступны для работы с ними?",
        "Строки"
      ),
    ]
  ),
  new LessonItem(
    "Условные конструкции",
    FOR_BEGINNERS,
    new LessonRequest("Расскажи об условых конструкция в go"),
    [
      new LessonRequest("Расскажи о if...else в go", "if...else"),
      new LessonRequest("Расскажи о switch в go", "switch"),
    ]
  ),
  new LessonItem(
    "Циклы",
    FOR_BEGINNERS,
    new LessonRequest("Расскажи о Циклах в go"),
    [
      new LessonRequest("Расскажи о вложенных циклах в go", "Вложенные циклы"),
      new LessonRequest("Расскажи о перебор массивов в go", "Перебор массивов"),
      new LessonRequest("Расскажи о break и continue в go", "break и continue"),
    ]
  ),
  new LessonItem(
    "Функции",
    FOR_BEGINNERS,
    new LessonRequest("Расскажи о Функциях в go"),
    [
      new LessonRequest(
        "Что такое Параметры функции в go",
        "Параметры функции"
      ),
      new LessonRequest(
        "Расскажи о Неопределенное количество параметров в go",
        "Неопределенное количество параметров"
      ),
      new LessonRequest(
        "Расскажи о возвращение результата из функции в go",
        "Возвращение результата из функции"
      ),
      new LessonRequest("Расскажи о типе функции в go", "Тип функции"),
      new LessonRequest(
        "Расскажи о анонимных функциях в go",
        "Анонимные функции"
      ),
      new LessonRequest(
        "Расскажи о рекурсивных функциях в go",
        "Рекурсивные функции"
      ),
    ]
  ),
  new LessonItem(
    "Обработка ошибок",
    FOR_BEGINNERS,
    new LessonRequest("Расскажи об обработе ошибок в go"),
    [
      new LessonRequest(
        "Как возвращать и обрабатывать ошибки в функциях Go?",
        "Возвращение ошибки"
      ),
      new LessonRequest(
        "Как обрабатывать несколько ошибок одновременно в Go?",
        "Обработка нескольких ошибок"
      ),
      new LessonRequest(
        "Как создавать и использовать кастомные ошибки в Go?",
        "Кастомные ошибки"
      ),
      new LessonRequest(
        "Что такое panic и recover в Go и как их использовать для обработки критических ошибок?",
        "Panic и recover"
      ),
      new LessonRequest(
        "Как логировать ошибки в Go для отладки и мониторинга?",
        "Логирование ошибок"
      ),
    ]
  ),
  new LessonItem(
    "Указатели",
    ADVANCED,
    new LessonRequest("Что такое указатели в go"),
    [
      new LessonRequest(
        "Расскажи о пустом указателе в Go?",
        "Пустой указатель"
      ),
      new LessonRequest("Расскажи о функции new в Go?", "Функция new"),
      new LessonRequest(
        "Расскажи о том как передавать указатели как параметры функции в Go? Для чего это может быть нужно",
        "Указатели как параметры функции"
      ),
      new LessonRequest(
        "Расскажи о том как возвращать указатели из функции в Go? Для чего это может быть нужн",
        "Указатель как результат функции"
      ),
    ]
  ),
  new LessonItem(
    "Объявление типов",
    ADVANCED,
    new LessonRequest("Расскажи, как объявлять свои типы в go"),
    [
      new LessonRequest(
        "Расскажи как создать структуру и работать с ней в go?",
        "Структуры"
      ),
      new LessonRequest("Расскажи о функции new в Go?", "Функция new"),
      new LessonRequest("Расскажи о вложенных структурах в Go?", "Структуры"),
      new LessonRequest("Расскажи о методах структур", "Методы структур"),
      new LessonRequest(
        "Расскажи о методах указателей структур структур",
        "Методы указателей структур"
      ),
    ]
  ),
  new LessonItem(
    "Пакеты и импорты",
    ADVANCED,
    new LessonRequest("Что такое пакеты и импорты в Go?"),
    [
      new LessonRequest("Расскажи о ммпорте пакетов в go?", "Импорт пакетов"),
      new LessonRequest("Как создать модуль в Go?", "Создание модуля"),
      new LessonRequest(
        "Как загрузить внешний модуль в Go?",
        "Загрузка внешнего модуля"
      ),
      new LessonRequest(
        "Как подключить внешнмй модуль в Go?",
        "Подключение внешнего модуля"
      ),
    ]
  ),
  new LessonItem(
    "Интерфейсы",
    ADVANCED,
    new LessonRequest("Что такое интерфейсы в Go?"),
    [
      new LessonRequest(
        "Расскажи как объявить интерфейс в go?",
        "Объявление интерфейсов"
      ),
      new LessonRequest(
        "Расскажи о соответствии интерфейсу в Go?",
        "Соответствие интерфейсу"
      ),
      new LessonRequest("Расскажи о полиморфизме в Go?", "Полиморфизм"),
    ]
  ),
  new LessonItem(
    "Горутины",
    ADVANCED,
    new LessonRequest("Что такое Горутины в Go?"),
    [new LessonRequest("Как объявить горутину в go?", "Объявление")]
  ),
  new LessonItem(
    "Каналы",
    ADVANCED,
    new LessonRequest("Что такое Каналы в Go?"),
    [
      new LessonRequest("Как объявить Канал в go?", "Каналы"),
      new LessonRequest(
        "Расскажи о небуфферизированных каналах в go",
        "Небуфферизированные каналы"
      ),
      new LessonRequest(
        "Расскажи о буферизированных каналах в go",
        "Буферизированные каналы"
      ),
      new LessonRequest(
        "Расскажи о Однонаправленных каналах в go",
        "Однонаправленные каналы"
      ),
      new LessonRequest(
        "Расскажи о Возвращеним канала из функции",
        "Возвращение канала"
      ),
    ]
  ),
  new LessonItem(
    "Конкурентность и параллелизм",
    ADVANCED,
    new LessonRequest("Расскажи о Конкурентности и параллелизме в Go?"),
    [
      new LessonRequest(
        "Как работает планировщик горутин (goroutine scheduler) в Go?",
        "Горутины и планировщик"
      ),
      new LessonRequest(
        "Как реализовать распределенные вычисления с использованием Go?",
        "Распределенные вычисления"
      ),
      new LessonRequest(
        "Как обеспечить синхронизацию и обмен данными между горутинами в Go?",
        "Синхронизация и обмен данными"
      ),
      new LessonRequest(
        "Как использовать пул горутин (goroutine pool) для эффективного использования параллелизма в Go?",
        "Пул горутин"
      ),
      new LessonRequest(
        "Как использовать горутины в Go для выполнения web-скрапинга и парсинга данных?",
        "Web-скрапинг"
      ),
      new LessonRequest(
        "Как использовать мьютексы (mutex) в Go для обеспечения безопасности при работе с общими ресурсами?",
        "Мьютексы"
      ),
      new LessonRequest("Как использовать WaitGroup  в Go?", "WaitGroup"),
      new LessonRequest(
        "Какие примеры конкурентного программирования можно реализовать с помощью Go?",
        "Примеры использования"
      ),
    ]
  ),
  new LessonItem(
    "Работа с файлами и директориями",
    ADVANCED,
    new LessonRequest("Расскажи как работать с файлами и директориями в Go?"),
    [
      new LessonRequest(
        "Как открыть и прочитать содержимое файла в Go?",
        "Открытие и чтение файла"
      ),
      new LessonRequest(
        "Как записать данные в файл с помощью Go?",
        "Запись в файл"
      ),
      new LessonRequest(
        "Как удалить файл или директорию с помощью Go?",
        "Удаление файла и директории"
      ),
      new LessonRequest("Как переименовать файл в Go?", "Переименование файла"),
      new LessonRequest(
        "Как получить список файлов и директорий в определенной директории с помощью Go?",
        "Список файлов и директорий"
      ),
    ]
  ),
  new LessonItem(
    "Работа с сетью",
    ADVANCED,
    new LessonRequest("Расскажи о работе с сетью в Go?"),
    [
      new LessonRequest(
        "Как создать TCP сервер и клиент в Go?",
        "TCP сервер и клиент"
      ),
      new LessonRequest("Как отправлять HTTP запросы в Go?", "HTTP запросы"),
      new LessonRequest(
        "Как использовать Go для веб-скрапинга и парсинга HTML-страниц?",
        "Web-скрапинг и парсинг HTML"
      ),
      new LessonRequest("Как работать с JSON-данными в Go?", "Работа с JSON"),
      new LessonRequest(
        "Как создать WebSocket сервер и клиент с использованием Go?",
        "WebSocket"
      ),
    ]
  ),
  new LessonItem(
    "Работа с базами данных",
    ADVANCED,
    new LessonRequest("Расскажи о работе с базами данных в Go?"),
    [
      new LessonRequest(
        "Как подключиться к базе данных (например, SQLite или PostgreSQL) с помощью Go?",
        "Подключение к базе данных"
      ),
      new LessonRequest(
        "Как выполнять SQL-запросы и получать результаты в Go?",
        "Выполнение запросов"
      ),
      new LessonRequest(
        "Что такое ORM (Object-Relational Mapping) в Go и как его использовать для работы с базой данных в go?",
        "ORM"
      ),
      new LessonRequest(
        "Как использовать транзакции для обеспечения целостности данных при работе с базой данных в Go?",
        "Транзакции"
      ),
      new LessonRequest(
        "Как проводить миграции базы данных с помощью Go?",
        "Миграции"
      ),
    ]
  ),
  new LessonItem(
    "Web-разработка",
    ADVANCED,
    new LessonRequest("Расскажи о работе с базами данных в Go?"),
    [
      new LessonRequest(
        "Как создать простой HTTP-сервер с использованием Go?",
        "HTTP-сервер"
      ),
      new LessonRequest(
        "Как управлять маршрутизацией запросов (routing) в Go?",
        "Маршрутизация запросов"
      ),
      new LessonRequest(
        "Как использовать шаблонизацию (templating) для генерации HTML-страниц в Go?",
        "Шаблонизация"
      ),
      new LessonRequest(
        "Как реализовать систему аутентификации и авторизации пользователя в веб-приложении на Go?",
        "Аутентификация и авторизация"
      ),
      new LessonRequest(
        "Как использовать web-сокеты (WebSockets) для реализации двусторонней связи между клиентом и сервером в Go?",
        "Web-сокеты"
      ),
    ]
  ),
];
