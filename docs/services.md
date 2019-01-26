# Services

Located in `@kiwicom/nitro/lib/services/<service>`.

**List:**

* [auth](#auth)
* [brand](#brand)
* [currency](#currency)
* [fetched](#fetched)
* [intl](#intl)
* [log](#log)
* [modal](#modal)

## Auth

**Import:**
```js
import { Consumer, Provider } from "@kiwicom/nitro/lib/services/auth/context";
```

**Types:**
```js
type MyBookingInput = {|
  bid: string,
  email: string,
  iata: string,
  departure: Date,
|};

type RegisterInput = {|
  firstName: string,
  lastName: string,
  email: string,
  password: string,
|};

export type Context = {|
  auth: Auth | null,
  loading: boolean,
  environment: Environment,
  onMyBooking: (input: MyBookingInput) => Promise<void>,
  onRegister: (input: RegisterInput) => Promise<void>,
  onSocialAuth: (provider: SocialProvider) => Promise<void>,
  onSignIn: (email: string, password: string) => Promise<void>,
  onSignOut: () => void,
|};

declare var context: React.Context<Context>;

export const { Consumer, Provider } = context;
```

See types:
* [Auth](./records#auth)

_TODO_

### InitAuth

**Import:**
```js
import InitAuth from "@kiwicom/nitro/lib/components/InitAuth";
```

**Types:**
```js
type MyBookingInput = {|
  bid: string,
  email: string,
  iata: string,
  departure: Date,
|};

type RegisterInput = {|
  firstName: string,
  lastName: string,
  email: string,
  password: string,
|};

type Arg = {|
  auth: Auth | null,
  loading: boolean,
  environment: Environment,
  onMyBooking: (input: MyBookingInput) => Promise<void>,
  onRegister: (input: RegisterInput) => Promise<void>,
  onSocialAuth: (provider: SocialProvider) => Promise<void>,
  onSignIn: (email: string, password: string) => Promise<void>,
  onSignOut: () => void,
|};

type Props = {|
  token: string | null,
  brand: Brand,
  redirectURL: string,
  onMyBooking: (token: string) => void,
  onRegister: () => void,
  onSocialAuth: (authURL: string) => void,
  onSignIn: (token: string) => void,
  onSignOut: () => void,
  children: (arg: Arg) => React.Node,
|};
```

See types:
* [Auth](./records#auth)
* [Brand](./records#brand)

_TODO_

## Brand

**Import:**
```js
import { Consumer, Provider } from "@kiwicom/nitro/lib/services/brand/context";
```

**Types:**
```js
declare var context: React.Context<Brand>;

export const { Consumer, Provider } = context;
```

See types:
* [Brand](./records#brand)

_TODO_

## Currency

**Import:**
```js
import { Consumer, Provider } from "@kiwicom/nitro/lib/services/currency/context";
```

**Types:**
```js
export type Context = {|
  currency: Currency,
  available: Currencies,
  recommended: Currency[],
  onChange: (code: string) => void,
|};

declare var context: React.Context<Context>;

export const { Consumer, Provider } = context;
```

See types:
* [Currency](./records#currency)

_TODO_

### InitCurrency

**Import:**
```js
import InitCurrency from "@kiwicom/nitro/lib/components/InitCurrency";
```

**Types:**
```js
type Arg = {|
  currency: Currency,
  available: Currencies,
  recommended: Currency[],
  onChange: (code: string) => void,
|};

type Props = {|
  brand: Brand,
  countries: Countries,
  affiliate: string,
  ip: string,
  initialCurrency: string,
  langCurrency: string,
  children: (arg: Arg) => React.Node,
  onChange: (currency: string) => void,
  // defaulted
  mostUsed?: string[],
  // DI
  getCurrencies?: () => Promise<Currencies>,
  getGeoCountry?: (ip: string) => Promise<string>,
|};
```

See types:
* [Brand](./records#brand)
* [Currency](./records#currency)
* [Country](./records#country)

_TODO_

## Fetched

**Import:**
```js
import { Consumer, Provider } from "@kiwicom/nitro/lib/services/fetched/context";
```

**Types:**
```js
declare var context: React.Context<Fetched>;

export const { Consumer, Provider } = context;
```

See types:
* [Fetched](./records#fetched)

_TODO_

## Intl

**Import:**
```js
import { Consumer, Provider } from "@kiwicom/nitro/lib/services/intl/context";
```

**Types:**
```js
declare var context: React.Context<Intl>;

export const { Consumer, Provider } = context;
```

See types:
* [Intl](./records#intl)

Contains all necessary information regarding **i18n**:
* **[LangInfo](./records#langinfo)** - a record from the `data/languages.json` file
* **translations** - one of the files from `data/translations/<locale>_<hash>.json`, a key/value object
* **translate** function
* **`date-fns` locale**

Components for translating:
* [Text](./components#text)
* [TextNode](./components#textnode)
* [Translate](./components#translate)
* [TranslateNode](./components#translatenode)

### Translate function

If you need to output a string, not a component, use the `translate` function located in the context:

```js
<IntlConsumer>
  {({ translate }) => (
    <input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={translate(__("First name"))}
    />
  )}
</IntlConsumer>
```

### Date-fns locale

A promise that resolves to a `date-fns` locale. Defaults to `en-US`. To lazy load your own locale, use dynamic `import`:

```js
const LOCALES = {
  cs: () => import("date-fns/locale/cs"),
  enUS: () => import("date-fns/locale/en-US"),
  ru: () => import("date-fns/locale/ru"),
};

const ID = window.__INTL__.language.id;

const localeFn = LOCALES[ID] || LOCALES.enUS; // Fallback to 'en-US'

<InitIntl raw={intlRaw} getLocale={localeFn()}>
  {intl => (
    <IntlProvider value={intl}>
      <Root />
    </IntlProvider>
  )}
</InitIntl>
```

### InitIntl

**Import:**
```js
import InitIntl from "@kiwicom/nitro/lib/components/InitIntl";
```

**Types:**
```js
type Props = {|
  raw: IntlRaw,
  children: (arg: Intl) => React.Node,
  // defaulted
  getLocale?: Promise<$FlowFixMe>, // resolves en-US by default
|};
```

See types:
* [Intl](./records#intl)

Useful for initiating the **intl** context from raw intl data.

```js
import type { IntlRaw, Intl } from "@kiwicom/nitro/lib/records/Intl";

const raw: IntlRaw = window.__INTL__; // intl data from the server

const App = () => (
  <InitIntl raw={raw}>
    {(intl: Intl) => (
      <IntlProvider value={intl}>
        <Root />
      </IntlProvider>
    )}
  </InitIntl>
)

const node = document.getElementById("root");
if (node) {
  ReactDOM.hydrate(<App />, node);
}
```

On the server:

```js
import type { IntlRaw, Intl } from "@kiwicom/nitro/lib/records/Intl";

import { locales } from "./data";

export default function render(locale: string) {
  const raw: IntlRaw = locales[locale];

  const markup = ReactDOM.renderToString(
    <InitIntl raw={raw}>
      {(intl: Intl) => (
        <IntlProvider value={intl}>
          <Root />
        </IntlProvider>
      )}
    </InitIntl>
  );

  // <Html /> puts the raw intl data into window.__INTL__
  return ReactDOM.renderToStaticNodeStream(<Html intl={raw} />);
}
```

## Log

**Import:**
```js
import { Consumer, Provider } from "@kiwicom/nitro/lib/services/log/context";
```

**Types:**
```js
export type Context<E, D> = {|
  log: (event: Event<E, D>) => void,
|};

declare var context: React.Context<Context<any, any>>;

export const { Provider, Consumer } = context;
```

See types:
* [Event](./records#event)

_TODO_

## Modal

**Import:**
```js
import { Consumer, Provider } from "@kiwicom/nitro/lib/services/modal/context";
```

**Types:**
```js
export type Context = {|
  value: string,
  onChange: (value?: string) => void,
|};

declare var context: React.Context<Context>;

export const { Consumer, Provider } = context;
```

Holds an information about which modal is currently open. Only supports one modal **on purpose**.

> Initialize using the [Value](./components#value) component, it has no associated `InitModal` component.
