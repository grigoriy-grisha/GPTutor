# Chat Completions API - Подробная документация

## Обзор

Endpoint `/v1/chat/completions` предоставляет OpenAI-совместимый API для создания chat completions с использованием различных языковых моделей через OpenRouter.

**URL:** `POST /v1/chat/completions`  
**Тип контента:** `application/json`  
**Авторизация:** Bearer токен (API ключ пользователя)

---

## 🔐 Аутентификация

### API Key
```http
Authorization: Bearer sk-user-abc123def456...
```

**Как получить API ключ:**
1. Авторизуйтесь через VK Mini App
2. Вызовите `GET /vk-test` с VK токеном
3. В ответе получите `dbUser.apiKey`

### Валидация
- ✅ API ключ должен существовать в базе данных
- ✅ Пользователь должен быть активным (`isActive: true`)
- ✅ На балансе должно быть достаточно средств

---

## 📋 Параметры запроса

### Обязательные параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `messages` | `Array<Message>` | Массив сообщений диалога |

### Опциональные параметры

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `model` | `string` | `"google/gemini-2.5-flash-lite"` | Модель для генерации |
| `max_tokens` | `integer` | - | Максимальное количество токенов в ответе |
| `temperature` | `float` | - | Креативность (0.0-2.0) |
| `top_p` | `float` | - | Nucleus sampling (0.0-1.0) |
| `frequency_penalty` | `float` | - | Штраф за повторение слов (-2.0 до 2.0) |
| `presence_penalty` | `float` | - | Штраф за повторение тем (-2.0 до 2.0) |
| `stop` | `Array<string>` | - | Стоп-последовательности |
| `stream` | `boolean` | `false` | Включить streaming режим |

### Структура Message

```typescript
interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}
```

**Роли:**
- `system` - Системные инструкции для AI
- `user` - Сообщения пользователя
- `assistant` - Ответы AI (для контекста)

---

## 🤖 Поддерживаемые модели

### Рекомендуемые модели

| Модель | Провайдер | Описание | Стоимость |
|--------|-----------|----------|-----------|
| `google/gemini-2.5-flash-lite` | Google | Быстрая и дешевая (по умолчанию) | ~$0.01/1K токенов |
| `anthropic/claude-3-haiku` | Anthropic | Сбалансированная | ~$0.25/1K токенов |
| `openai/gpt-4o-mini` | OpenAI | Компактная GPT-4 | ~$0.15/1K токенов |
| `meta-llama/llama-3.1-8b-instruct` | Meta | Open source | ~$0.06/1K токенов |

### Все доступные модели
Полный список доступен через OpenRouter API. Система поддерживает **326 моделей**.

---

## 💰 Стоимость и биллинг

### Расчет стоимости
1. OpenRouter возвращает стоимость в долларах
2. GPTutor конвертирует в рубли (курс: **90₽ за $1**)
3. Стоимость автоматически списывается с баланса

### Информация о стоимости в ответе
```json
{
  "usage": {
    "cost_details": {
      "upstream_inference_completions_cost": 0.45
    }
  }
}
```

### Проверка баланса
- Баланс проверяется перед запросом
- При недостатке средств возвращается ошибка `402 Payment Required`

---

## 📤 Примеры запросов

### Простой запрос
```bash
curl -X POST http://localhost:3001/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-user-abc123..." \
  -d '{
    "messages": [
      {"role": "user", "content": "Привет! Как дела?"}
    ]
  }'
```

### Запрос с системной инструкцией
```bash
curl -X POST http://localhost:3001/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-user-abc123..." \
  -d '{
    "model": "anthropic/claude-3-haiku",
    "messages": [
      {"role": "system", "content": "Ты полезный AI ассистент, отвечающий кратко и по делу."},
      {"role": "user", "content": "Объясни что такое API"}
    ],
    "max_tokens": 200,
    "temperature": 0.7
  }'
```

### Streaming запрос
```bash
curl -X POST http://localhost:3001/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-user-abc123..." \
  -d '{
    "messages": [
      {"role": "user", "content": "Расскажи длинную историю"}
    ],
    "stream": true,
    "max_tokens": 500
  }'
```

---

## 📥 Форматы ответов

### Non-streaming ответ (обычный)
```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "google/gemini-2.5-flash-lite",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Привет! У меня всё отлично, спасибо что спросил! Как дела у тебя?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 24,
    "total_tokens": 36,
    "cost_details": {
      "upstream_inference_completions_cost": 0.45
    }
  }
}
```

### Streaming ответ (Server-Sent Events)
```
Content-Type: text/event-stream

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","created":1677652288,"model":"google/gemini-2.5-flash-lite","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","created":1677652288,"model":"google/gemini-2.5-flash-lite","choices":[{"index":0,"delta":{"content":"Привет"},"finish_reason":null}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","created":1677652288,"model":"google/gemini-2.5-flash-lite","choices":[{"index":0,"delta":{"content":"!"},"finish_reason":null}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","created":1677652288,"model":"google/gemini-2.5-flash-lite","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}

data: [DONE]
```

---

## ⚠️ Коды ошибок

### 400 Bad Request - Ошибка валидации
```json
{
  "error": "messages array is required"
}
```

**Причины:**
- Отсутствует параметр `messages`
- `messages` не является массивом
- Пустой массив `messages`

### 401 Unauthorized - Ошибка авторизации
```json
{
  "error": "Invalid API key or inactive user"
}
```

**Причины:**
- Отсутствует заголовок `Authorization`
- Неверный формат токена (не `Bearer ...`)
- API ключ не найден в базе данных
- Пользователь неактивен

### 402 Payment Required - Недостаток средств
```json
{
  "error": "Insufficient balance"
}
```

**Причины:**
- На балансе пользователя недостаточно средств
- Предварительная оценка стоимости превышает баланс

### 500 Internal Server Error - Серверная ошибка
```json
{
  "error": "Internal server error"
}
```

**Причины:**
- Ошибка OpenRouter API
- Ошибка базы данных
- Неожиданная системная ошибка

---

## 🔄 Streaming режим

### Особенности
- Ответ приходит в режиме реального времени
- Использует Server-Sent Events (SSE)
- Каждый chunk содержит часть ответа
- Завершается сообщением `data: [DONE]`

### Обработка в JavaScript
```javascript
const response = await fetch('/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk-user-...'
  },
  body: JSON.stringify({
    messages: [{"role": "user", "content": "Привет!"}],
    stream: true
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') return;
      
      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices[0]?.delta?.content;
        if (content) {
          console.log(content); // Выводим каждую часть ответа
        }
      } catch (e) {
        // Игнорируем ошибки парсинга
      }
    }
  }
}
```

---

## 📊 Логгирование и мониторинг

### Автоматическое логгирование
Система автоматически логгирует:
- ✅ Входящие запросы с параметрами
- ✅ Время выполнения
- ✅ Использованную модель
- ✅ Количество токенов
- ✅ Стоимость в рублях
- ✅ Ошибки и их причины

### Пример логов
```json
{
  "timestamp": "2024-09-28 10:30:15",
  "level": "info",
  "message": "LLM Request: google/gemini-2.5-flash-lite",
  "type": "llm",
  "model": "google/gemini-2.5-flash-lite",
  "userId": "123",
  "requestId": "abc-123-def",
  "stream": false,
  "messagesCount": 2
}
```

---

## 🔧 Технические детали

### Внутренняя архитектура
1. **Валидация** - проверка API ключа и параметров
2. **Авторизация** - поиск пользователя в базе данных
3. **Подготовка** - формирование параметров для OpenRouter
4. **Выполнение** - вызов OpenRouter API
5. **Обработка** - расчет стоимости и списание с баланса
6. **Ответ** - возврат результата клиенту

### Используемые сервисы
- **OpenRouterService** - интеграция с OpenRouter API
- **LLMCostEvaluate** - расчет стоимости в рублях
- **UserRepository** - работа с пользователями
- **LoggerService** - структурированное логгирование

### Производительность
- Среднее время ответа: **1-3 секунды**
- Поддержка concurrent запросов
- Автоматический retry для временных ошибок
- Graceful handling ошибок OpenRouter

---

## 🧪 Тестирование

### Ручное тестирование
```bash
# Простой тест
curl -X POST http://localhost:3001/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{"messages":[{"role":"user","content":"Test"}]}'

# Тест streaming
curl -X POST http://localhost:3001/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{"messages":[{"role":"user","content":"Test"}],"stream":true}'
```

### Автоматическое тестирование
В проекте есть готовые тесты:
```bash
npm run test:completion
npm run test:openai
```

---

## 📈 Лимиты и ограничения

### Текущие лимиты
- **Максимальный размер запроса**: 10MB
- **Timeout**: 60 секунд
- **Rate limiting**: настраивается администратором
- **Минимальный баланс**: 1 рубль

### Рекомендации
- Используйте подходящую модель для вашей задачи
- Оптимизируйте длину промптов
- Мониторьте расход баланса
- Обрабатывайте ошибки корректно

---

## 🔗 Совместимость с OpenAI SDK

API полностью совместим с OpenAI SDK. Достаточно изменить base URL:

### Python (openai)
```python
import openai

client = openai.OpenAI(
    api_key="sk-user-your-api-key",
    base_url="http://localhost:3001/v1"
)

response = client.chat.completions.create(
    model="google/gemini-2.5-flash-lite",
    messages=[
        {"role": "user", "content": "Привет!"}
    ]
)
```

### JavaScript (openai)
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'sk-user-your-api-key',
  baseURL: 'http://localhost:3001/v1',
});

const completion = await openai.chat.completions.create({
  model: 'google/gemini-2.5-flash-lite',
  messages: [
    {role: 'user', content: 'Привет!'},
  ],
});
```

---

## 🆘 Поддержка и отладка

### Частые проблемы
1. **401 Unauthorized** - проверьте API ключ
2. **402 Payment Required** - пополните баланс
3. **400 Bad Request** - проверьте формат запроса
4. **500 Internal Error** - обратитесь в поддержку

### Отладка
- Проверьте логи в `logs/combined-YYYY-MM-DD.log`
- Используйте Request ID из заголовка `X-Request-ID`
- Мониторьте баланс через `/vk-test`

### Контакты
- **Документация**: http://localhost:8080
- **Поддержка**: support@gptutor.site
- **GitHub**: https://github.com/your-repo/gptutor-backend-v2


