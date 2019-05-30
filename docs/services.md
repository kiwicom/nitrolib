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
* [Server](#server)
* [Session](#session)
* [Starred](#starred)
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

See [InitAuth](./components#initauth) for initializing the service.

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

Contains:
* auth information including the API token
* API token-infused _Relay_ environment
* information whether the user is in some kind of process of signing in
* callbacks for different operations regarding authentication

## Brand

Has all the necessary information regarding branding.

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

Contains the brand configuration object. It is static.

## Currency

Has all the necessary information and operations regarding currency.

Setup might look something like:

```js
// Rewrites currencies from fetched to new date structure
import rewriteCurrencies from "@kiwicom/nitro/lib/services/currency/serivces/rewriteCurrencies";

<CurrencyProvider
  value={{
    currency: available[currencyId],
    available,
    recommended: recommended.map(code => available[code]),
    onChange
  }}
>
  {children}
</CurrencyProvider>;

const connector: Connector<OwnProps, Props> = connect(state => ({
  // currency
  currencyId: getCurrency(state),
  available: rewriteCurrencies(getCurrencies(state)),
  recommended: getRecommendedCurrenciesSelectorJS(state)
}));

export default connector(NitroBridge);
```

See [InitCurrency](./components#initcurrency) for initializing the service.

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

Contains:
* currently selected currency
* available currencies
* recommended currencies
* callback for changing the currency

## Fetch

Contains utilities to be used with the `fetch` function.

### Handlers

**Import:**
```js
import * as handlers from "@kiwicom/nitro/lib/services/fetch/handlers";
```

**Types:**
```js
// Use when you need to handle common API errors, but want the raw response
declare export function handleError(res: Response): Promise<Response>;

// Use when you need to handle common API errors, and the response is a JSON
declare export function handleJSON<T>(res: Response): Promise<T>;
```

Utility functions for handling `fetch` responses.

### Headers

**Import:**
```js
import * as headers from "@kiwicom/nitro/lib/services/fetch/headers";
```

**Types:**
```js
declare export var JSON_GET: {|
  Accept: string,
|};

declare export var JSON_SEND: {|
  "Content-Type": string,
|};

declare export var JSON_BOTH: {|
  Accept: string,
  "Content-Type": string,
|};
```

Just utility objects to be used in the `headers` option when using `fetch`.

## Input

Functions related to normalization, validation and manipulation of input values.

### ComposeValidator

**Import:**
```js
import * as composeValidator from "@kiwicom/nitro/lib/services/input/composeValidator";
```

**Types:**
```js
export type Validator = (value: any) => string;

declare export default (...validators: Validator[]) => Validator;
```

Composes multiple validators into a single validator that returns the first error encountered.

### EmailCorrector

**Import:**
```js
import * as emailCorrector from "@kiwicom/nitro/lib/services/input/emailCorrector";
```

**Types:**
```js
declare export default (email: string) => string;
```

Tries to correct an email, giving you a recommended one back.

### Normalizers

**Import:**
```js
import * as normalizers from "@kiwicom/nitro/lib/services/input/normalizers";
```

**Types:**
```js
declare export var email: (value: string) => string;

declare export var numbers: (val: string) => string;
```



### Validators

**Import:**
```js
import * as validators from "@kiwicom/nitro/lib/services/input/validators";
```

**Types:**
```js
export type Error = string; // "" means no error

declare export var required: (val: mixed) => Error;

declare export var email: (val: string) => Error;

export type YearAfterOpts = {|
  offset: number,
  now: Date,
|};

declare export var yearAfter: (arg: YearAfterOpts) => (val: Date) => Error;

declare export var iata: (val: string) => Error;

declare export var departure: (val: Date, now?: Date) => Error;

declare export var password: (value: string) => Error;
```

Validators return error _translation keys_ for wrong inputs.

> Error is always a `string`, an empty string means no error.

## Intl

_TODO_

See [InitIntl](./components#initintl) for initializing the service.

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

### Translate

**Import:**
```js
import * as translate from "@kiwicom/nitro/lib/services/intl/translate";
```

**Types:**
```js
export type Values = { [key: string]: string | number };
export type Translate = (key: string, values?: Values) => string;
export type Translations = { [key: string]: string };

declare export default function translate(
  translations: Translations,
  key: string,
  values?: Values,
): string;
```



## Log

_TODO_

See [InitLog](./components#initlog) for initializing the service.

### Api

**Import:**
```js
import * as api from "@kiwicom/nitro/lib/services/log/api";
```

**Types:**
```js
declare export default function log(payload: Loglady): Promise<void>;
```

See types:
* [Loglady](./records#loglady)

**LogLady** API call.

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

_TODO_

### Globals

**Import:**
```js
import * as globals from "@kiwicom/nitro/lib/services/log/globals";
```

**Types:**
```js
type Static = {|
  brandingId: string,
  UTMs: { [key: string]: string },
  affilParams: { [key: string]: string },
  // Optional
  langId?: string,
  project?: string,
  module?: string,
  pageName?: string,
  deeplinkId?: string,
  pageViewId?: string,
  bid?: number,
  splitster?: { [key: string]: string },
|};

declare export default (statics: Static) => Globals;
```

See types:
* [Loglady](./records#loglady)

**DEPRECATED**

Utility for gathering the `global` object for **LogLady** tracking.

> Uses the `window` object, use only on the client!

### Logger

**Import:**
```js
import * as logger from "@kiwicom/nitro/lib/services/log/logger";
```

**Types:**
```js
export type Statics = {|
  project?: string,
  module?: string,
  pageName?: string,
  langId?: string,
  pageViewId?: string,
  brandingId: string,
  bid?: number,
  splitster?: { [key: string]: string },
  isLoggedIn?: boolean,
  affilParams?: { [key: string]: string },
  UTMs: { [key: string]: string },
|};

declare export var statics: Statics;

declare export var getGlobals: () => Globals;

declare export var log: (ev: Event, props: Props) => Promise<void>;
declare export var batch: (evs: EventPayload[]) => Promise<void>;
```

See types:
* [Loglady](./records#loglady)
* [Event](./records#event)

A service substituting FE's current `cuckoo`.

Setup:
* get session data with the `init` function from the [session](./services#session) service
* set attributes of the global `statics` variable
* call the `log` function

Also exports the `getGlobals` function that returns globals `LogLady` expects.

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

## Server



### AnalyseHeaders

**Import:**
```js
import * as analyseHeaders from "@kiwicom/nitro/lib/services/server/analyseHeaders";
```

**Types:**
```js
export type CookieSizes = {|
  total: number,
  splitster: number,
  recentSearch: number,
  other: number,
|};

export type Headers = { [string]: string };

export type AnalysePayload = {|
  total: number,
  url: number,
  headers: number,
  cookies: CookieSizes,
  cookiesToRemove: string[],
|};

declare export default (h: Headers, url: string, limit?: number) => AnalysePayload;
```



## Session

Contains everything regarding session data:
* **user** and **request** specific context data
* **cookies**
* **local storage**

### Context

**Import:**
```js
import * as context from "@kiwicom/nitro/lib/services/session/context";
```

**Types:**
```js
declare var context: React.Context<Session>;

export const { Consumer, Provider } = context;

export default context;
```

See types:
* [Session](./records#session)

Contains session data. It is static.

### Cookies

**Import:**
```js
import * as cookies from "@kiwicom/nitro/lib/services/session/cookies";
```

**Types:**
```js
type Options = {|
  expires?: number | Date,
  domain?: string,
  path?: string,
  secure?: boolean,
|};

declare export var load: (key: Cookie) => ?string;

declare export var save: (key: Cookie, value: string, opts?: Options) => void;

declare export var remove: (key: Cookie, opts?: Options) => void;
```

See types:
* [cookies](./consts#cookies)

Centralized medium for manipulating _cookies_.

### Ids

**Import:**
```js
import * as ids from "@kiwicom/nitro/lib/services/session/ids";
```

**Types:**
```js
declare export var makeUserId: () => string;

declare export var makeSessionId: () => string;

declare export var makePageViewId: () => string;
```

Functions for generating IDs.

### Init

**Import:**
```js
import * as init from "@kiwicom/nitro/lib/services/session/init";
```

**Types:**
```js
declare export default () => Session;
```

See types:
* [Session](./records#session)

Initializes the [session](./services#session) context.

> Uses the `window` object, unavailable on the server.

### Local

**Import:**
```js
import * as local from "@kiwicom/nitro/lib/services/session/local";
```

**Types:**
```js
declare export var load: (key: Local) => ?string;

declare export var save: (key: Local, value: string) => void;

declare export var remove: (key: Local) => void;
```

See types:
* [local](./consts#local)

Centralized medium for manipulating `localStorage`.

### Session

**Import:**
```js
import * as session from "@kiwicom/nitro/lib/services/session/session";
```

**Types:**
```js
declare export var load: (key: Session) => ?string;

declare export var save: (key: Session, value: string) => void;

declare export var remove: (key: Session) => void;
```

See types:
* [session](./consts#session)

Centralized medium for manipulating `sessionStorage`.

## Starred



See [InitStarred](./components#initstarred) for initializing the service.

### Context

**Import:**
```js
import * as context from "@kiwicom/nitro/lib/services/starred/context";
```

**Types:**
```js
export type Context = {|
  list: StarredItem[],
  isMobile: boolean,
  lang: string,
  onAdd: (arg: StarredItem) => void,
  onGoToStarred: (arg: StarredItem) => void,
  onRemove: (id: string, e: SyntheticEvent<HTMLDivElement>) => void,
  onClear: (e: SyntheticEvent<HTMLDivElement>) => void,
  onSetNotice: () => void,
  renderShareDialog: (arg: ShareDialog) => React.Node,
  makeShareUrl: (arg: StarredItem) => string,
|};

declare var context: React.Context<Context>;

export const { Consumer, Provider } = context;
```

See types:
* [Starred](./records#starred)



## Utils

_TODO_

