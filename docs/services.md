# Services

Located in `@kiwicom/nitro/lib/services/<service>`.

**Context:**

* [auth](#auth)
* [brand](#brand)
* [currency](#currency)
* [fetched](#fetched)
* [intl](#intl)
* [log](#log)

## Contexts

Services that export a _React_ context.

### Auth

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

_TODO_

### Brand

**Import:**
```js
import { Consumer, Provider } from "@kiwicom/nitro/lib/services/brand/context";
```

**Types:**
```js
declare var context: React.Context<Brand>;

export const { Consumer, Provider } = context;
```

_TODO_

### Currency

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

_TODO_

### Fetched

**Import:**
```js
import { Consumer, Provider } from "@kiwicom/nitro/lib/services/fetched/context";
```

**Types:**
```js
declare var context: React.Context<Fetched>;

export const { Consumer, Provider } = context;
```

_TODO_

### Intl

**Import:**
```js
import { Consumer, Provider } from "@kiwicom/nitro/lib/services/intl/context";
```

**Types:**
```js
declare var context: React.Context<Intl>;

export const { Consumer, Provider } = context;
```

Contains all necessary information regarding **i18n**:
* **language info** - a record from the `data/languages.json` file, see `records/LangInfo.js` for the type and default value
* **translations** - one of the files from `data/translations/<locale>_<hash>.json`, a key/value object
* **translate function** - read below

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
  getLocale?: () => Promise<$FlowFixMe>, // resolves en-US by default
|};
```

_TODO_

### Log

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

_TODO_
