[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

### Нейросеть Chat GPT во ВКонтакте!

[<img src="./public/gptTutorBanner.png" alt="GPTutor Banner">](https://vk.com/app51602327_548334196)

## Желательные требования к проекту
- Node.js выше, чем 16 версия.
- npm выше, чем 8 версия.

## Как запустить приложение

`npm install` установит необходимые пакеты.

`npm run start` запускает проект и стартует сервер по адресу [`https://localhost:10888`](https://localhost:10888).

Приложение запустится, но для полноценной работы с Chat GPT нужен бэкенд.
Репозиторий бэкенда находится [вот тут](https://github.com/grigoriy-grisha/ChatGPT_Backend) все нужно для запуска найдете
в Readme.

После запуска бэкенда, чтобы приложение "увидело" его, нужно прописать адрес в .env

Достаточно скопировать в .env содержимое из [.env.example](.env.example).

## Технологический стек
- React, основной фреймворк.
- VK/UI, библиотека готовых компонентов от VK.
- [dignals](https://github.com/dmitriypereverza/dignals), крошечная бибилиотека сигналов, используется для управления состоянием приложения
## Правила коммитов
    
```
#Номер Issue <Тип коммита (Feat|Fix|Refactor)>: Описание коммита

close #Номер Issue
```
Примеры:

```
#47 <Feat>: Добавит "Действие выбора" для сообщений
close #47
``` 

```
#38 <Fix>: Правки после конфликта
close #38
``` 

```
#16 <Refactor>: Перевод проекта на typescript
close #16
``` 



