# 🚀 Быстрый старт - GPTutor API Documentation

## Запуск документации

### Одной командой
```bash
npm run docs
```

Документация будет доступна по адресу: **http://localhost:8080**

### Автоматическое открытие в браузере (Windows)
```bash
npm run docs:open
```

## 📋 Доступные страницы

После запуска сервера будут доступны:

| URL | Описание |
|-----|----------|
| http://localhost:8080/ | 🏠 Главная страница с навигацией |
| http://localhost:8080/index.html | 📖 API документация (светлая тема) |
| http://localhost:8080/dark.html | 🌙 API документация (темная тема) |
| http://localhost:8080/test-examples.html | 🧪 Интерактивное тестирование |
| http://localhost:8080/openapi.yaml | 📄 OpenAPI спецификация |
| http://localhost:8080/CHAT_COMPLETIONS_API.md | 📚 Подробная документация |

## ✨ Возможности

### 🎨 Scalar UI
- Современный и красивый интерфейс
- Намного лучше стандартного Swagger UI
- Поддержка светлой и темной темы

### 🔧 Try-it функционал
- Тестирование API прямо в браузере
- Автоматическая генерация примеров кода
- Поддержка всех параметров запроса

### 📖 Богатый контент
- Подробные описания в Markdown
- Примеры для всех endpoints
- Коды ошибок и их объяснения
- Информация о стоимости и биллинге

### 🧪 Интерактивное тестирование
- Отдельная страница для тестирования
- Готовые примеры запросов
- Поддержка streaming режима
- Отображение стоимости запросов

## 🔧 Настройка

### Изменение порта
Отредактируйте `docs/serve.js`:
```javascript
const port = 8080; // измените на нужный порт
```

### Кастомизация тем
Отредактируйте `docs/index.html` или `docs/dark.html`:
```javascript
data-configuration='{
  "theme": "purple",        // purple, saturn, mars
  "darkMode": false,        // true/false
  "layout": "modern"        // modern, classic
}'
```

## 📤 Деплой

### Статические файлы
Скопируйте файлы из папки `docs/` на любой статический хостинг:
- GitHub Pages
- Vercel
- Netlify
- AWS S3

### Docker
```dockerfile
FROM nginx:alpine
COPY docs/ /usr/share/nginx/html/
EXPOSE 80
```

### Nginx
```nginx
server {
    listen 80;
    root /path/to/docs;
    index welcome.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

## 🛠 Разработка

### Структура файлов
```
docs/
├── welcome.html          # Главная страница
├── index.html            # Scalar (светлая тема)
├── dark.html             # Scalar (темная тема)
├── test-examples.html    # Интерактивное тестирование
├── openapi.yaml          # OpenAPI спецификация
├── serve.js              # Сервер разработки
├── CHAT_COMPLETIONS_API.md # Подробная документация
└── README.md             # Полная документация
```

### Редактирование OpenAPI
Основной файл спецификации: `docs/openapi.yaml`

После изменений перезапустите сервер:
```bash
# Остановите сервер (Ctrl+C)
npm run docs
```

### Добавление новых страниц
1. Создайте HTML файл в папке `docs/`
2. Добавьте ссылку в `welcome.html`
3. Обновите сервер если нужно

## 🎯 Примеры использования

### Тестирование API
1. Запустите документацию: `npm run docs`
2. Откройте http://localhost:8080/test-examples.html
3. Введите ваш API ключ
4. Выберите пример или введите свой запрос
5. Нажмите "Отправить запрос"

### Изучение API
1. Откройте http://localhost:8080/index.html
2. Изучите доступные endpoints
3. Используйте Try-it для тестирования
4. Копируйте примеры кода

### Интеграция с клиентами
1. Скачайте OpenAPI спецификацию: http://localhost:8080/openapi.yaml
2. Используйте генераторы кода (OpenAPI Generator)
3. Или используйте готовые SDK с измененным base URL

## 🔗 Полезные ссылки

- [Scalar Documentation](https://github.com/scalar/scalar)
- [OpenAPI 3.0.3 Specification](https://spec.openapis.org/oas/v3.0.3)
- [GPTutor Backend Repository](https://github.com/your-repo/gptutor-backend-v2)

---

**Готово!** Теперь у вас есть красивая и функциональная документация API 🎉


