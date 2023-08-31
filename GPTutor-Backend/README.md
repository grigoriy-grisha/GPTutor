## Backend Mini Apps GPTutor

Бэкенд предназанчен для управления Api ключами для обхода лимитов Chat GPT


[<img src="./src/main/resources/gptTutorBanner.png" alt="GPTutor Banner">](https://vk.com/app51602327_548334196)

## Требования к проекту
- Java версия 17.
- Maven версия 3.
- Желательно редактор Intellij idea 

Запуск проекта 

Перез запуском проект нужно настроить в [application.properties](src%2Fmain%2Fresources%2Fapplication.properties)
необходимо прописать Api-ключи, которые будет раздавать сервер.
Так же необходимо прописать 16 значный секретный ключ, чтобы шифровать сообщения, ключ должен быть такой же, как и на фронтенде


Ключи необходимо указывать через запятую, настройка поддерживает от 1 api ключа
В таком виде.

Пример взят из файла [application.properties.example](src%2Fmain%2Fresources%2Fapplication.properties.example)
```
api.keys=sk-qqwesaddd1kfwLayTInVI2o5qVT3Bl1resWkP5FIzUGZgMZsadqZuJx
```

`mvn clean install -U` сборка проекта.

Запустить конфигурацию [ChatGptApplication.run.xml](.run%2FChatGptApplication.run.xml)

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

