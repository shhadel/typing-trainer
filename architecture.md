# Архитектурные требования

## Структура проекта

В репозитории два npm-проекта: основное приложение coursework-app и библиотека компонентов ui.

### `coursework-app`

Назначение - тренажёр печати со страницами тренировки, текстов и статистики.

- src/pages/ - HomePage.tsx, TrainingPage.tsx, StatisticsPage.tsx, TextsPage.tsx, TextDetailsPage.tsx, NotFoundPage.tsx.
- src/components/ - AppLayout.tsx, SidebarNav.tsx, PracticeText.tsx, RaceTrack.tsx.
- src/data/demoData.ts - демонстрационные тексты, типы и хранение результатов в localStorage.
- src/data/demoData.test.ts - тесты данных и локального хранения.
- src/App.tsx - описание маршрутов.
- src/main.tsx - точка входа, BrowserRouter и подключение стилей.
- src/index.css - стили приложения.
- vite.config.ts, tsconfig.json, vitest.config.ts - настройки сборки, типов и тестов.

### `ui`

Назначение - общие React-компоненты и их стили.

- src/index.tsx - компоненты и их типы.
- src/index.test.tsx - тесты компонентов.
- src/styles.css - стили библиотеки.
- tsconfig.json, vitest.config.ts - настройки TypeScript и тестов.

## Компоненты

В `coursework-app`:

- AppLayout выводит общую навигацию и активную страницу.
- SidebarNav содержит ссылки на разделы.
- PracticeText показывает текст и поле для набора.
- RaceTrack показывает прогресс тренировки.

В `ui`:

- Button - кнопка действия.
- Card - контейнер.
- StatCard - показатель с подписью.
- PageTitle - заголовок и описание страницы.
- EmptyState - сообщение для пустого списка.

## Библиотеки

- React 19.3.1 - интерфейс.
- React DOM 19.3.1 - отображение приложения и тестовый рендер компонентов.
- React Router DOM 7.18.6 - маршрутизация.
- Vite 8.3.8 и @vitejs/plugin-react 6.3.0 - dev-сервер и сборка.
- TypeScript 5.9.3 - типизация приложения и библиотеки.
- ESLint 10.15.0, typescript-eslint 8.73.0, @stylistic/eslint-plugin 5.10.0 - проверка кода и форматирования.
- @eslint/js 10.0.1, globals 17.14.0, eslint-plugin-react-hooks 7.1.1 и eslint-plugin-react-refresh 0.5.8 - дополнительные правила ESLint.
- @types/react и @types/react-dom 19.3.0 - типы для React.
- Vitest 4.1.12 и @vitest/coverage-v8 4.1.12 - тесты и покрытие.
- @typing-trainer/ui 1.0.0 - локальная библиотека общих компонентов.

## Роутинг

BrowserRouter находится в src/main.tsx. Все страницы вложены в AppLayout.

- / - HomePage, главная страница.
- /train - TrainingPage, тренировка с текстом по умолчанию.
- /train?textId=1 - тренировка с выбранным текстом.
- /stats - StatisticsPage, история и показатели.
- /texts - TextsPage, каталог.
- /texts/:textId - TextDetailsPage, страница текста с параметром textId.
- NotFoundPage, неизвестный адрес.

Защищённых маршрутов нет: авторизация не входит в MVP.

## Использование библиотеки ui

coursework-app подключает ui как workspace-зависимость @typing-trainer/ui. Страницы импортируют из неё кнопки, карточки, заголовки и пустое состояние. В main.tsx подключён файл стилей @typing-trainer/ui/styles.css.
