import { Interview } from "$/entity/interview/Interview";
import { ModeType } from "$/entity/lessons";
import { InterviewItem } from "$/entity/interview/InterviewItem";

export const javascriptInterview = new Interview(
  ModeType.JAVASCRIPT_INTERVIEW,
  [
    new InterviewItem("Что такое JavaScript?"),
    new InterviewItem("Какие типы данных поддерживает JavaScript?"),
    new InterviewItem("Как объявить переменную в JavaScript?"),
    new InterviewItem(
      "Чем отличается оператор == от оператора === в JavaScript?"
    ),
    new InterviewItem(
      "Каким образом можно добавить элемент в конец массива в JavaScript?"
    ),
    new InterviewItem("Что такое функция в JavaScript и как ее объявить?"),
    new InterviewItem("Что такое метод объекта в JavaScript?"),
    new InterviewItem(
      "Каким образом можно выполнить асинхронный запрос данных с помощью JavaScript?"
    ),
    new InterviewItem(
      "Каким образом можно проверить тип данных переменной в JavaScript?"
    ),
    new InterviewItem(
      "Каким образом можно сделать задержку выполнения кода в JavaScript?"
    ),
    new InterviewItem(
      "Что такое замыкание (closure) в JavaScript и для чего оно используется?"
    ),
    new InterviewItem(
      "Каким образом можно обработать исключение (ошибку) в JavaScript?"
    ),
    new InterviewItem(
      "Что такое event bubbling и event delegation в контексте JavaScript?"
    ),
    new InterviewItem("Каким образом можно сортировать массив в JavaScript?"),
    new InterviewItem("Каким образом можно скопировать объект в JavaScript?"),
    new InterviewItem("Что такое hoisting в JavaScript?"),
    new InterviewItem(
      "Каким образом можно выполнить цикл (итерацию) по элементам массива или объекта в JavaScript?"
    ),
    new InterviewItem("Чем отличаются операторы && и || в JavaScript?"),
    new InterviewItem("Каким образом можно работать с датами в JavaScript?"),
    new InterviewItem(
      "Что такое стрелочные функции (arrow functions) в JavaScript и как их использовать?"
    ),
    new InterviewItem(
      "Каким образом можно импортировать и экспортировать модули в JavaScript?"
    ),
    new InterviewItem(
      "Что такое callback функция и зачем она используется в JavaScript?"
    ),
    new InterviewItem(
      "Каким образом можно проверить, является ли значение NaN в JavaScript?"
    ),
    new InterviewItem(
      "Чем отличается оператор for от оператора foreach в контексте JavaScript?"
    ),
    new InterviewItem("Что такое асинхронность (asynchrony) в JavaScript?"),
    new InterviewItem(
      "Каким образом можно выполнить параллельное выполнение задач в JavaScript?"
    ),
    new InterviewItem(
      "Что такое обещание (Promise) в JavaScript и каким образом оно используется для работы с асинхронным кодом?"
    ),
    new InterviewItem(
      "Каким образом можно обрабатывать ошибки при работе с промисами в JavaScript?"
    ),
    new InterviewItem(
      "Что такое async/await в JavaScript и каким образом это упрощает работу с асинхронным кодом?"
    ),
    new InterviewItem(
      "Чем отличается функция setTimeout от функции setInterval в JavaScript?"
    ),
    new InterviewItem(
      "Каким образом можно выполнить HTTP-запрос (GET, POST и другие) в JavaScript?"
    ),
    new InterviewItem(
      "Что такое RESTful API и каким образом можно работать с ними в JavaScript?"
    ),
    new InterviewItem(
      "Каким образом можно работать с локальным хранилищем (localStorage) в JavaScript?"
    ),
    new InterviewItem(
      "Что такое события (events) в JavaScript и каким образом можно их обрабатывать?"
    ),
    new InterviewItem(
      "Каким образом можно добавить и удалить класс у элемента в JavaScript?"
    ),
    new InterviewItem(
      "Что такое JSON и каким образом можно работать с ним в JavaScript?"
    ),
    new InterviewItem(
      "Каким образом можно валидировать форму (поля ввода данных) в JavaScript?"
    ),
    new InterviewItem(
      "Что такое рекурсия (recursion) в JavaScript и для чего она используется?"
    ),
    new InterviewItem(
      "Каким образом можно создать и использовать модули (библиотеки) в JavaScript?"
    ),
    new InterviewItem(
      "Что такое DOM (Document Object Model) в JavaScript и каким образом можно взаимодействовать с ним?"
    ),
    new InterviewItem(
      "Каким образом можно выполнить анимацию элементов в JavaScript?"
    ),
    new InterviewItem(
      "Что такое лямбда-выражения (arrow expressions) в JavaScript и каким образом они используются?"
    ),
  ]
);
