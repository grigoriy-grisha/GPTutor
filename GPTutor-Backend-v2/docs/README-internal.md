# 🔧 GPTutor Internal API Documentation

Внутренняя документация API для административных операций GPTutor.

## 📋 Обзор

Этот набор документации предназначен **только для внутреннего использования** администраторами системы GPTutor. Содержит все административные endpoints, которые не должны быть видны в публичной документации.

## 🚀 Быстрый старт

### Установка зависимостей

```bash
cd docs
npm install
```

### Запуск сервера документации

```bash
npm start
```

Документация будет доступна по адресу: http://localhost:3002

### Разработка

```bash
npm run dev
```

## 📁 Структура файлов

```
docs/
├── internal-api.yaml          # OpenAPI спецификация для внутренних роутов
├── internal.html              # HTML страница с документацией
├── serve-internal.js          # Сервер для обслуживания документации
├── package.json              # Зависимости для сервера документации
└── README-internal.md         # Этот файл
```

## 🔐 Доступные Endpoints

### System
- `GET /health` - Проверка состояния сервера

### Authentication  
- `GET /vk-test` - Тест VK авторизации
- `POST /update-token` - Обновление API токена пользователя

### Models
- `GET /v1/models` - Получение списка доступных моделей

### Chat Completions
- `POST /v1/chat/completions` - Создание chat completion

## 🔑 Авторизация

### VK Auth
Для административных операций требуется VK подпись:
```
Authorization: Bearer <vk-signature>
```

### API Key Auth
Для пользовательских операций требуется API ключ:
```
Authorization: Bearer sk-...
```

## 🛠️ Разработка

### Добавление нового endpoint

1. Добавьте endpoint в соответствующий контроллер
2. Обновите `internal-api.yaml` с описанием нового endpoint
3. Перезапустите сервер документации

### Обновление документации

1. Отредактируйте `internal-api.yaml`
2. При необходимости обновите `internal.html`
3. Перезапустите сервер

## 🔒 Безопасность

⚠️ **ВАЖНО:** Эта документация содержит внутренние endpoints и не должна быть доступна публично!

- Используйте только в защищенной сети
- Ограничьте доступ по IP адресам
- Не размещайте на публичных серверах без аутентификации

## 📊 Мониторинг

Сервер документации предоставляет health check endpoint:
```
GET /health
```

## 🐛 Отладка

### Проверка OpenAPI спецификации

```bash
curl http://localhost:3002/internal-api.yaml
```

### Проверка health check

```bash
curl http://localhost:3002/health
```

## 📝 Примеры использования

### Проверка состояния сервера

```bash
curl http://localhost:3001/health
```

### Тест VK авторизации

```bash
curl -H "Authorization: Bearer <vk-signature>" \
     http://localhost:3001/vk-test
```

### Обновление токена пользователя

```bash
curl -X POST \
     -H "Authorization: Bearer <vk-signature>" \
     http://localhost:3001/update-token
```

### Получение списка моделей

```bash
curl http://localhost:3001/v1/models
```

## 🔄 Обновления

При обновлении API:

1. Обновите `internal-api.yaml`
2. Проверьте совместимость с существующими клиентами
3. Обновите версию в `package.json`
4. Перезапустите сервер документации

## 📞 Поддержка

Для вопросов по внутренней документации обращайтесь к команде разработки GPTutor.

---

**Версия:** 2.0.0  
**Последнее обновление:** 2024-01-15  
**Автор:** GPTutor Team


