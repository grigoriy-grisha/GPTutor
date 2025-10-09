# 🎨 Поддержка сгенерированных изображений

## ✨ Что добавлено

Добавлена поддержка изображений, которые генерирует AI модель (например, `google/gemini-2.5-flash-image`).

## 🔧 Технические детали

### 1. MessageModel

**Добавлено новое поле:**
```typescript
generatedImages: ImageAttachment[] = []; // Изображения от модели
```

**Новые методы:**
- `addGeneratedImages(images)` - добавляет изображения от модели
- `setGeneratedImages(images)` - устанавливает изображения
- `hasGeneratedImages` - getter для проверки наличия изображений

### 2. ChatViewModel

**Обновлен метод `streamCompletion`:**
- Парсит `delta.images` из ответа API
- Добавляет сгенерированные изображения в сообщение
- Логирует процесс для отладки

### 3. MessageItem

**Добавлен блок отображения:**
- Изображения отображаются после контента
- Responsive дизайн (max-width: 512px)
- Lazy loading для оптимизации
- Скругленные углы (border-radius: 8px)

---

## 📊 Формат API

### Запрос к модели с генерацией изображений:

```typescript
{
  "model": "google/gemini-2.5-flash-image",
  "messages": [
    {
      "role": "user",
      "content": "Нарисуй кота"
    }
  ],
  "stream": true
}
```

### Ответ от модели (SSE):

```json
{
  "id": "gen-1760008258-...",
  "provider": "Google AI Studio",
  "model": "google/gemini-2.5-flash-image",
  "object": "chat.completion.chunk",
  "created": 1760008258,
  "choices": [
    {
      "index": 0,
      "delta": {
        "role": "assistant",
        "content": "",
        "images": [
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA..."
            },
            "index": 0
          }
        ]
      },
      "finish_reason": "stop"
    }
  ]
}
```

---

## 🎨 Отображение на UI

### Структура сообщения:

```
┌─────────────────────────────────────┐
│ 🤖 Assistant                        │
│                                     │
│ Вот изображение кота:              │ ← content
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │      [Generated Image]          │ │ ← generatedImages
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 💰 Cost: 0.05 RUB                  │
└─────────────────────────────────────┘
```

### CSS стили:

```css
.generated-images {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
}

.generated-image {
  width: 100%;
  max-width: 512px;
  height: auto;
  border-radius: 8px;
}
```

---

## 🔄 Процесс обработки

```
1. Модель генерирует изображение
   ↓
2. Backend отправляет SSE с delta.images
   ↓
3. ChatViewModel парсит images из delta
   ↓
4. message.addGeneratedImages(images)
   ↓
5. MessageModel сохраняет в generatedImages[]
   ↓
6. MessageItem отображает изображения
   ↓
7. Пользователь видит результат
```

---

## 🎯 Поддерживаемые форматы изображений

### Base64:
```typescript
{
  "type": "image_url",
  "image_url": {
    "url": "data:image/png;base64,iVBORw0KGgo..."
  }
}
```

### URL:
```typescript
{
  "type": "image_url",
  "image_url": {
    "url": "https://example.com/image.png"
  }
}
```

---

## 💡 Примеры использования

### Генерация изображения:

**Пользователь:**
> Нарисуй красивый закат над морем

**Ассистент:**
> Вот изображение красивого заката над морем:
> 
> [Изображение отображается]

### Множественные изображения:

Если модель вернет несколько изображений, они отобразятся вертикально:

```typescript
delta.images = [
  { type: "image_url", image_url: { url: "data:image/png..." } },
  { type: "image_url", image_url: { url: "data:image/png..." } },
  { type: "image_url", image_url: { url: "data:image/png..." } }
]
```

---

## 🐛 Отладка

### Проверка в консоли:

```javascript
// В ChatViewModel при получении изображений:
console.log("Parsed images:", images);
// [{ type: "image_url", image_url: { url: "data:..." } }]

console.log("Adding generated images:", images.length, "images");
// Adding generated images: 1 images

// В MessageModel:
message.generatedImages
// [{ type: "image_url", ... }]
```

### Проверка в DevTools:

```javascript
// Посмотреть сгенерированные изображения
chatViewModel.messages.forEach(msg => {
  if (msg.generatedImages.length > 0) {
    console.log('Message with images:', msg.id, msg.generatedImages);
  }
});
```

---

## 📱 Responsive дизайн

Изображения адаптируются под размер экрана:

- **Desktop:** max-width: 512px
- **Mobile:** width: 100% (растягивается на всю ширину)
- **Aspect ratio:** сохраняется автоматически (height: auto)

---

## 🚀 Модели с поддержкой генерации изображений

- `google/gemini-2.5-flash-image` ✅
- `google/gemini-pro-vision-image` (если есть)
- Другие модели с суффиксом `-image`

---

## ✅ Что работает

- ✅ Парсинг изображений из SSE
- ✅ Сохранение в сообщении
- ✅ Отображение на UI
- ✅ Поддержка Base64
- ✅ Поддержка URL
- ✅ Множественные изображения
- ✅ Lazy loading
- ✅ Responsive дизайн

---

## 🔮 Будущие улучшения

- [ ] Кнопка "Скачать изображение"
- [ ] Полноэкранный просмотр
- [ ] Галерея для множественных изображений
- [ ] Копирование изображения в буфер обмена
- [ ] Поделиться изображением

---

## 📚 Связанные файлы

- `MessageModel.ts` - модель сообщения с изображениями
- `ChatViewModel.ts` - обработка SSE и парсинг images
- `MessageItem.tsx` - отображение изображений на UI

---

## 🎉 Готово!

Теперь модель может возвращать изображения, и они будут автоматически отображаться в чате! 🎨

