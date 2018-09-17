# Services

Context:
* [Intl](#intl)
* [Brand](#brand)
* [Theme](#theme)
* [Fetched](#fetched)
* [Currency](#currency)
* [Auth](#auth)

Extra:
* [Fetch](#fetch)
* [Input](#input)

## Context

Services that use React's context API.

> See [CLI](./cli.md) docs regarding getting the necessary data files

### Intl

Located in `@kiwicom/nitro/lib/services/intl/context`. Exports a `Provider` and a `Consumer`.

Contains all necessary information regarding **i18n**:
* **language info** - a record from the `data/languages.json` file, see `records/LangInfo.js` for the type and default value
* **translations** - one of the files from `data/translations/<locale>_<hash>.json`, a key/value object
* **translate function** - read below

**Provider** props:
```js
type Props = {|
  value: Intl, // see records/Intl.js
|};
```

#### InitIntl

_TODO_

#### Translate

There's a pure function used for translating in `services/intl/translate.js` exported as default, with a bunch of types regarding translating.

Exported types:
```js
export type Values = { [key: string]: string | number };
export type Translate = (key: string, values?: Values) => string; // the context's 'translate' function signature
export type Translations = { [key: string]: string };
```

Exported `translate` function:
```js
function translate(translations: Translations, key: string, values: Values = {}): string {
  // ...code
}
```

### Brand

Located in `@kiwicom/nitro/lib/services/brand/context`. Exports a `Provider` and a `Consumer`.

Contains a brand from the `data/brands.json` file. Alters behavior of components based on the brand.

See `records/Brand.js` for the type and default value.

**Provider** props:
```js
type Props = {|
  value: Brand, // see records/Brand.js
|};
```

### Theme

See `records/Theme.js` for the type, utilities and and default value.

To create a theme, use `styled-components`' `ThemeProvider` and the `getBrandTheme` function.

The `getBrandTheme` takes two arguments:
1. `Brand` - see `records/Brand.js`
2. `boolean` - RTL or not

Example:
```js
import { ThemeProvider } from "styled-components";
import { getBrandTheme } from "@kiwicom/nitro/lib/records/Theme";
import type { Brand } from "@kiwicom/nitro/lib/records/Brand";
import type { LangInfo } from "@kiwicom/nitro/lib/records/LangInfo";

type Props = {|
  brand: Brand,
  langInfo: LangInfo,
|};

const MyProvider = ({ brand, language, children }) => (
  <ThemeProvider theme={getBrandTheme(brand, language.direction === "rtl")}>
    {children}
  </ThemeProvider>
); 
```

The created theme is compatible with `@kiwicom/orbit-components`.
