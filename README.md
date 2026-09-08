# ui-kit-storybook

Мини UI-Kit компании: `Button` и `Input` поверх примитивов [shadcn/ui](https://ui.shadcn.com/), стилизованные [Tailwind CSS v4](https://tailwindcss.com/) со светлой/тёмной темой, задокументированные в [Storybook](https://storybook.js.org/) и покрытые тестами на [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/).

## Установка

```bash
npm install ui-kit-storybook
```

Пакет полагается на `react`/`react-dom` (`>=19.0.0`), указанные как `peerDependencies` — версию выбирает потребитель, пакет не тянет свою.

Подключите стили один раз в точке входа приложения:

```ts
import "ui-kit-storybook/styles.css";
```

## Импорт компонентов

Доступен как импорт из корня пакета, так и из файла конкретного компонента — оба варианта резолвятся в собственный чанк (`tsup`-сборка с раздельными entry-точками):

```ts
import { Button, Input } from "ui-kit-storybook";
// или точечно
import { Button } from "ui-kit-storybook/button";
import { Input } from "ui-kit-storybook/input";
```

## Тема (светлая/тёмная)

Тема переключается CSS-классом `.dark` на любом родительском элементе (обычно на `<html>`), Tailwind v4 CSS-first конфиг (`@custom-variant dark`) и Storybook (`@storybook/addon-themes`) синхронизированы с этим же механизмом:

```html
<html class="dark">
  <!-- всё внутри рендерится в тёмной теме -->
</html>
```

## Компоненты

### `Button`

```tsx
import { Button } from "ui-kit-storybook";

<Button variant="outline" size="lg">Сохранить</Button>
<Button error>Ошибка операции</Button>
<Button disabled>Недоступно</Button>
```

Расширяет все пропсы shadcn `Button` (`variant`, `size`, `asChild`, стандартные атрибуты `<button>`) и добавляет:

| Проп    | Тип       | Описание                                                                 |
|---------|-----------|---------------------------------------------------------------------------|
| `error` | `boolean` | Форсирует деструктивный внешний вид (маппится на `variant="destructive"`) независимо от переданного `variant` |

Состояния `hover`/`focus-visible`/`disabled` уже стилизованы примитивом shadcn; обёртка добавляет только кастомное фокус-кольцо и `error`.

### `Input`

```tsx
import { Input } from "ui-kit-storybook";

<Input label="Email" placeholder="example@domain.com" />
<Input label="Пароль" type="password" errorText="Минимум 8 символов" />
<Input label="Недоступно" disabled />
```

Расширяет все пропсы shadcn `Input` (стандартные атрибуты `<input>`) и добавляет:

| Проп        | Тип      | Описание                                                        |
|-------------|----------|--------------------------------------------------------------------|
| `label`     | `string` | Подпись поля, автоматически связывается с `<input>` через `htmlFor`/`id` |
| `errorText` | `string` | Текст ошибки под полем; также выставляет `aria-invalid` и `aria-describedby` на `<input>` |

Состояния `default`/`hovered`/`focused`/`error`/`disabled` стилизованы напрямую в обёртке.

### Интеграция с react-hook-form + zod

`Input` — обычный `forwardRef`-совместимый (в терминах React 19 — принимающий `ref` как обычный проп) контролируемый/неконтролируемый компонент без внутренней логики форм, поэтому напрямую совместим с `register()`:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input } from "ui-kit-storybook";

const schema = z.object({
  username: z.string().min(3).max(20),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Input
        label="Имя пользователя"
        errorText={errors.username?.message}
        {...register("username")}
      />
      <Button type="submit">Отправить</Button>
    </form>
  );
}
```

`react-hook-form`/`zod` не являются зависимостями пакета — это выбор потребителя, компонент лишь совместим с их API (`register`, `formState.errors`).

## Структура сборки

- `dist/index.js` + `dist/index.d.ts` — корневой вход (`Button`, `Input`)
- `dist/button.js` + `dist/button.d.ts` — только `Button`
- `dist/input.js` + `dist/input.d.ts` — только `Input`
- `dist/styles.css` — скомпилированные Tailwind-стили с CSS-переменными темы
- Формат — чистый ESM, `react`/`react-dom` вынесены во `external` (не бандлятся)

## Contributing

Хотите поднять окружение, запустить тесты/Storybook локально или выпустить изменение через changesets — см. [CONTRIBUTING.md](./CONTRIBUTING.md).

## Лицензия

[ISC](./LICENSE)
