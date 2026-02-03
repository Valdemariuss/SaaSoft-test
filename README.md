# SaaSoft-test

Тестовое задание на позицию Frontend Developer.
Реализация формы управления учетными записями.

## Стек технологий

- **Vue.js 3** (Composition API)
- **TypeScript**
- **Pinia** (State Management)
- **Vite** (Build tool)
- **Pug** (HTML Preprocessor)
- **SCSS** (CSS Preprocessor)

## Функционал

- Добавление учетных записей.
- Валидация полей (Login, Password, Label length).
- Динамическое отображение поля "Пароль" в зависимости от типа записи (LDAP/Local).
- Хранение меток в виде массива объектов.
- Сохранение данных в `localStorage` (персистенция).
- Удаление записей.

## Установка и запуск

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

### Сборка для продакшена
```bash
npm run build
```
