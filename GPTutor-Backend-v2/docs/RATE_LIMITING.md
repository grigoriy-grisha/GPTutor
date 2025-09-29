# Rate Limiting Documentation

## Обзор

В проекте GPTutor Backend v2 реализована система rate limiting для защиты от злоупотреблений и обеспечения стабильной работы API.

## Архитектура

### Компоненты

1. **rateLimitMiddleware.ts** - основной middleware для rate limiting
2. **rateLimitConfig.ts** - конфигурация лимитов для разных роутов и окружений
3. **Интеграция в контроллеры** - каждый контроллер использует специфичные лимиты

### Принцип работы

- Каждый роут имеет свои лимиты запросов в минуту
- Лимиты различаются в зависимости от окружения (development, staging, production)
- Ключи для rate limiting генерируются на основе IP адреса и ID пользователя
- Автоматическая очистка устаревших записей каждые 5 минут

## Конфигурация

### Текущие лимиты

| Роут | Development | Staging | Production |
|------|-------------|---------|------------|
| `/health` | 100/мин | 100/мин | 100/мин |
| `/vk-test` | 30/мин | 30/мин | 30/мин |
| `/update-token` | 5/мин | 5/мин | 5/мин |
| `/upload` | 50/мин | 8/мин | 5/мин |
| `/v1/chat/completions` | 100/мин | 15/мин | 10/мин |
| `/v1/models` | 50/мин | 50/мин | 50/мин |

### Настройка лимитов

Для изменения лимитов отредактируйте файл `src/config/rateLimitConfig.ts`:

```typescript
export const RATE_LIMIT_CONFIG_BY_ENV = {
  production: {
    '/v1/chat/completions': {
      max: 10, // количество запросов
      timeWindow: 60 * 1000, // окно времени в миллисекундах
    },
  },
};
```

## Использование

### В контроллерах

```typescript
import { createRateLimitMiddleware, getRateLimitConfig } from '../middleware/rateLimitMiddleware';

// Создание middleware для конкретного роута
const rateLimit = createRateLimitMiddleware(getRateLimitConfig('/your-route')!);

// Применение в роуте
this.fastify.post(
  '/your-route',
  { preHandler: rateLimit },
  this.yourHandler.bind(this)
);
```

### Кастомные лимиты

```typescript
const customRateLimit = createRateLimitMiddleware({
  max: 5,
  timeWindow: 60 * 1000,
  keyGenerator: (request) => `custom:${request.ip}`,
  onLimitReached: (request, reply) => {
    reply.code(429).send({ error: 'Custom rate limit exceeded' });
  }
});
```

## Мониторинг

### Логирование

При превышении лимитов записываются логи с информацией:
- IP адрес клиента
- URL запроса
- Метод HTTP
- Количество запросов
- Максимальный лимит
- Время окна

### HTTP заголовки

При каждом запросе возвращаются заголовки:
- `X-RateLimit-Limit` - максимальный лимит
- `X-RateLimit-Remaining` - оставшиеся запросы
- `X-RateLimit-Reset` - время сброса лимита (Unix timestamp)

## Обработка ошибок

### Стандартная ошибка

```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Maximum 10 requests per 60 seconds.",
  "retryAfter": 45
}
```

### Кастомная обработка

```typescript
const rateLimit = createRateLimitMiddleware({
  max: 5,
  timeWindow: 60 * 1000,
  onLimitReached: (request, reply) => {
    // Кастомная логика обработки превышения лимита
    logger.warn('Custom rate limit exceeded', { ip: request.ip });
    reply.code(429).send({ 
      error: 'Custom limit exceeded',
      retryAfter: 60 
    });
  }
});
```

## Производительность

### Оптимизации

1. **In-memory store** - быстрый доступ к данным о лимитах
2. **Периодическая очистка** - автоматическое удаление устаревших записей
3. **Эффективные ключи** - оптимизированная генерация ключей для rate limiting

### Мониторинг производительности

```typescript
// Логирование производительности rate limiting
logger.info('Rate limit check', {
  duration: Date.now() - startTime,
  key,
  count: record.count
});
```

## Безопасность

### Защита от злоупотреблений

1. **Разные лимиты для разных роутов** - критичные операции имеют более строгие лимиты
2. **Комбинированные ключи** - учет IP и пользователя для более точного контроля
3. **Окружение-специфичные лимиты** - более строгие лимиты в продакшене

### Рекомендации

1. **Мониторинг** - отслеживайте логи превышения лимитов
2. **Настройка** - адаптируйте лимиты под нагрузку
3. **Тестирование** - проверяйте лимиты в разных окружениях

## Troubleshooting

### Частые проблемы

1. **Слишком строгие лимиты** - увеличьте `max` в конфигурации
2. **Слишком мягкие лимиты** - уменьшите `max` для критичных роутов
3. **Проблемы с производительностью** - проверьте размер store и частоту очистки

### Отладка

```typescript
// Включение debug логов
logger.debug('Rate limit check', {
  key,
  count: record.count,
  max: config.max,
  timeWindow: config.timeWindow
});
```
