# GPTutor Backend v2

Простой и быстрый бэкенд на Fastify с SQLite и Prisma ORM.

## Особенности

- 🚀 **Fastify** - быстрый веб-фреймворк
- 🗃️ **SQLite** - легковесная база данных
- 🔧 **Prisma** - современная ORM
- 📦 **TypeScript** - типизированный JavaScript
- 🐳 **Docker** - контейнеризация

## Структура базы данных

Одна простая таблица `users`:
- `id` - уникальный идентификатор
- `email` - email пользователя (опционально)
- `username` - имя пользователя (опционально)
- `vkId` - VK ID пользователя (опционально)
- `balance` - баланс пользователя
- `apiKey` - уникальный API ключ
- `isActive` - активен ли пользователь
- `createdAt` / `updatedAt` - временные метки

## API Endpoints

### Users
- `GET /users` - получить всех пользователей
- `GET /users/:id` - получить пользователя по ID
- `GET /users/by-api-key/:apiKey` - получить пользователя по API ключу
- `POST /users` - создать пользователя
- `PATCH /users/:id/balance` - обновить баланс
- `PATCH /users/:id/add-balance` - добавить к балансу
- `PATCH /users/:id/regenerate-api-key` - сгенерировать новый API ключ
- `DELETE /users/:id` - удалить пользователя

### Health
- `GET /health` - проверка состояния сервера

## Быстрый старт

### Локальная разработка

```bash
# Установить зависимости
npm install

# Настроить базу данных
npm run db:push

# Запустить в режиме разработки
npm run dev
```

### Продакшн

```bash
# Собрать проект
npm run build

# Запустить
npm start
```

### Docker

```bash
# Собрать образ
docker build -t gptutor-backend-v2 .

# Запустить контейнер
docker run -p 3001:3001 gptutor-backend-v2
```

## Переменные окружения

```env
DATABASE_URL="file:./dev.db"
PORT=3001
NODE_ENV=development
```

## Примеры использования

### Создать пользователя
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "username": "testuser", "balance": 100}'
```

### Получить пользователя по API ключу
```bash
curl http://localhost:3001/users/by-api-key/YOUR_API_KEY
```

### Добавить баланс
```bash
curl -X PATCH http://localhost:3001/users/USER_ID/add-balance \
  -H "Content-Type: application/json" \
  -d '{"amount": 50}'
```



