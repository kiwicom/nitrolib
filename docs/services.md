# Services

Located in `@kiwicom/nitro/lib/services/<service>`.

**List:**

* [Auth](#auth)
* [Brand](#brand)
* [Currency](#currency)
* [Fetch](#fetch)
* [Input](#input)
* [Intl](#intl)
* [Log](#log)
* [Modal](#modal)
* [Utils](#utils)

## Auth

Contains everything regarding authentication.

**Examples:**

A fresh setup might look something like:

```js
// ...
import InitAuth from "@kiwicom/nitro/lib/components/InitAuth";
import { Provider as AuthProvider } from "@kiwicom/nitro/lib/services/auth/context";
import type { Brand } from "@kiwicom/nitro/lib/records/Brand";
// ...

const AUTH_COOKIE = "AUTH_TOKEN"; // or whatever you save it as

const brand: Brand = window.__BRAND__;

const handleMyBooking = (token: string) => {
  // redirect the user to MMB
}

const handleRegister = () => {
  // tell the user to check his email
}

const handleSocialAuth = (authURL: string) => {
  // redirect the user to the given URL
}

const handleSignIn = (token: string) => {
  // save the token into cookies as AUTH_COOKIE
}

const handleSignOut = () => {
  // remove AUTH_COOKIE from cookies
}

const NitroProvider = () => (
  <InitAuth
    token={cookies.get(AUTH_COOKIE) || null}
    brand={brand}
    redirectURL={window.location.href} // maybe clean it up from UTMs if needed, or add misc info
    onMyBooking={handleMyBooking}
    onRegister={handleRegister}
    onSocialAuth={handleSocialAuth}
    onSignIn={handleSignIn}
    onSignOut={handleSignOut}
  >
    {auth => (
      <AuthProvider value={auth}>
        <App />
      </AuthProvider>
    )}
  </InitAuth>
);
// ...
```

You can of course not use the `InitAuth` component and hook the provider up to your existing setup.

### Api

**Import:**
```js
import * as api from "@kiwicom/nitro/lib/services/auth/api";
```

**Types:**
```js
declare export function getTokenUser(token: string): Promise<User>;

export type MyBookingInput = {|
  bid: string,
  email: string,
  iata: string,
  departure: Date,
|};

declare export function getMyBookingToken(input: MyBookingInput): Promise<string>;

type LoginInput = {|
  email: string,
  password: string,
  brand: string,
|};

declare export function signIn(input: LoginInput): Promise<AuthUser>;

declare export function logout(token: string): Promise<void>;

export type RegisterInput = {|
  firstName: string,
  lastName: string,
  email: string,
  password: string,
|};

declare export function register(brand: string, input: RegisterInput): Promise<void>;

type SocialAuthProvider = "facebook" | "google";

declare export function socialAuth(provider: SocialAuthProvider, url: string): Promise<string>;

declare export function resetPassword(email: string, brandId: string): Promise<void>;
```

See types:
* [User](./records#user)
* [Auth](./records#auth)

See [InitAuth](./components#initauth) for initializing the service.



### Context

**Import:**
```js
import * as context from "@kiwicom/nitro/lib/services/auth/context";
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

export default context;
```

See types:
* [Auth](./records#auth)

See [InitAuth](./components#initauth) for initializing the service.

_TODO_

## Brand

_TODO_

### Context

**Import:**
```js
import * as context from "@kiwicom/nitro/lib/services/brand/context";
```

**Types:**
```js
declare var context: React.Context<Brand>;

export const { Consumer, Provider } = context;

export default context;
```

See types:
* [Brand](./records#brand)

_TODO_

## Currency

_TODO_

### Context

**Import:**
```js
import * as context from "@kiwicom/nitro/lib/services/currency/context";
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

export default context;
```

See types:
* [Currency](./records#currency)

See [InitCurrency](./components#initcurrency) for initializing the service.

_TODO_

## Fetch

_TODO_


## Input

_TODO_


## Intl

_TODO_

### Context

**Import:**
```js
import * as context from "@kiwicom/nitro/lib/services/intl/context";
```

**Types:**
```js
export type Context = {|
  ...Intl,
  onDebug: () => void,
|};

declare var context: React.Context<Context>;

export const { Consumer, Provider } = context;

export default context;
```

See types:
* [Intl](./records#intl)

See [InitIntl](./components#initintl) for initializing the service.

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

## Log

_TODO_

### Context

**Import:**
```js
import * as context from "@kiwicom/nitro/lib/services/log/context";
```

**Types:**
```js
export type Context = {|
  log: (event: Event, props: Props) => void,
|};

declare var context: React.Context<Context>;

export const { Provider, Consumer } = context;

export default context;
```

See types:
* [Event](./records#event)

See [InitLog](./components#initlog) for initializing the service.

_TODO_

## Modal

_TODO_

### Context

**Import:**
```js
import * as context from "@kiwicom/nitro/lib/services/modal/context";
```

**Types:**
```js
export type Context = {|
  value: string,
  onChange: (value?: string) => void,
|};

declare var context: React.Context<Context>;

export const { Consumer, Provider } = context;

export default context;
```

Holds an information about which modal is currently open. Only supports one modal **on purpose**.

> Initialize using the [Value](./components#value) component, it has no associated `InitModal` component.

## Utils

_TODO_

