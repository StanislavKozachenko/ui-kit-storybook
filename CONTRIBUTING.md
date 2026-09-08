# Contributing

## Установка окружения

```bash
npm install
```

## Скрипты

```bash
npm run storybook        # Storybook dev-сервер на :6006
npm run test              # прогон тестов (Vitest + Playwright, включая сторисы как smoke-тесты)
npm run test:coverage     # то же самое + отчёт о покрытии (порог задан в vitest.config.ts)
npm run typecheck         # tsc --noEmit
npm run build              # сборка пакета (tsup) + компиляция Tailwind CSS в dist/styles.css
npm run build-storybook   # статическая сборка Storybook
```

CI (`.github/workflows/ci.yml`) на каждый push/PR в `main`/`master` прогоняет тот же набор шагов: typecheck → тесты с покрытием → сборка пакета → сборка Storybook.

## Структура проекта

- `src/components/*` — публичные компоненты (`Button`, `Input`) и их обёртки над примитивами
- `src/shared/ui/shadcn/*` — примитивы shadcn/ui; менять их исходники напрямую нельзя, только через `npx shadcn add <component>` (алиасы в `components.json` уже настроены на `@/shared/ui/shadcn`)
- `src/globals.css` — Tailwind v4 CSS-first конфиг, тема (light/dark) и CSS-переменные

## Конвенции

- Все размеры в Tailwind-классах — только относительные единицы (rem дефолтной шкалы), без `px`
- Тема переключается классом `.dark`, это синхронизировано со Storybook через `@storybook/addon-themes`
- Новый компонент должен стилизовать 5 состояний: default, hovered, focused, error, disabled
- Публичный API — только то, что реально нужно потребителю (`Button`/`Input` + их `Props`-типы); служебные хелперы, cva-варианты примитивов и т.п. наружу не экспортируются

## Тестирование

- Vitest в browser mode через Playwright (Chromium), не jsdom — тесты видят реальный рендер и computed styles
- `@storybook/addon-vitest` дополнительно прогоняет каждую сторис как smoke-тест — новый компонент с историями в Storybook автоматически получает базовую регрессионную проверку
- Порог покрытия (`vitest.config.ts`) считается только по `src/components/**`

## Версионирование

Используем [changesets](https://github.com/changesets/changesets):

```bash
npm run changeset        # описать изменение перед PR
npx changeset version    # поднять версию и обновить CHANGELOG.md
```

Публикация (`npm publish`) в этом репозитории не выполняется — пакет не публикуется в npm, changesets используется только для демонстрации процесса версионирования. Если публикация всё же понадобится, учтите: `.changeset/config.json` сейчас содержит `"access": "restricted"`, что npm не позволяет для unscoped-имени пакета — нужно будет сменить на `"public"`.
