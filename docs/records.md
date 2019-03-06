# Records

Located in `@kiwicom/nitro/lib/records/<record>`.

* [Affiliate](#affiliate)
* [Airline](#airline)
* [Auth](#auth)
* [Brand](#brand)
* [BrandLanguage](#brandlanguage)
* [Continents](#continents)
* [Country](#country)
* [Currency](#currency)
* [Event](#event)
* [Fetched](#fetched)
* [Intl](#intl)
* [LangInfo](#langinfo)
* [Languages](#languages)
* [Location](#location)
* [Loglady](#loglady)
* [Theme](#theme)
* [User](#user)

## Affiliate

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Affiliate";
import type { Affiliate } from "@kiwicom/nitro/lib/records/Affiliate";
```

**Types:**
```js
export type Affiliate = {|
  id: string,
  params: { [key: string]: string },
|};
```

Holds information specific for the given affiliate.

## Airline

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Airline";
import type { Airline } from "@kiwicom/nitro/lib/records/Airline";
```

**Types:**
```js
export type Airline = {|
  id: string,
  lcc: number,
  name: string,
|};

export type Airlines = {
  [key: string]: Airline,
};

declare export var airlineDefault: Airline;
```

_TODO_

## Auth

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Auth";
import type { Auth } from "@kiwicom/nitro/lib/records/Auth";
```

**Types:**
```js
export type AuthUser = {|
  type: "user",
  user: User,
  token: string,
|};

export type AuthMagic = {|
  type: "magic",
  email: string,
  token: string,
|};

export type AuthToken = {|
  type: "token",
  bid: number,
  token: string,
|};

export type Auth = AuthUser | AuthMagic | AuthToken;

export type SocialProvider = "facebook" | "google";

declare export var authDefault: Auth | null;
```

See types:
* [User](./records#user)

_TODO_

## Brand

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Brand";
import type { Brand } from "@kiwicom/nitro/lib/records/Brand";
```

**Types:**
```js
export type Brand = {|
  domain: string,
  home_redirect_url: string,
  communication: {|
    push_notifications_sending: {|
      filter_out: string[],
      enabled: boolean,
    |},
    newsletter: {|
      enabled: boolean,
    |},
    email_sending: {|
      support_sender_address: string,
      info_sender_address: string,
      human_resources_address: string,
      at_the_airport_address: string,
      guarantee_address: string,
      sender_name: string,
      filter_out: string[],
      main_sender_address: string,
      enabled: boolean,
      help_request_address: string,
      business_address: string,
      refund_reply_address: string,
      archive_email_proxy_list: [string, string, string, string, string, string, string, string],
      marketing_address: string,
      signing_domain: string,
      legal_address: string,
    |},
    sms_sending: {|
      twilio_number: string,
      sender_name: string,
      filter_out: string[],
      enabled: boolean,
      nexmo_number: string,
      company_name: string,
    |},
  |},
  api: {|
    helpcenter: string,
  |},
  booked_at: string,
  partner: string,
  id: string,
  support_247: boolean,
  contacts: {|
    phones: {|
      enabled: boolean,
      locales: {
        [lang: string]: {|
          number: string,
          id: string,
          native_support: string,
        |},
      },
    |},
    emails: {|
      enabled: boolean,
      locales: {
        [lang: string]: {|
          webFormAlias?: string,
          webFormEmail: string,
          id?: string,
          email?: string,
        |},
      },
    |},
    chat: {|
      enabled: boolean,
    |},
  |},
  base_url: string,
  content: {|
    eticket: {|
      credit_cards: {|
        primary_string: string,
        show_signature: boolean,
        secondary_string: string,
      |},
    |},
    media: {|
      instagram: {|
        link: string,
        enabled: boolean,
      |},
      twitter: {|
        link: string,
        enabled: boolean,
      |},
      youtube: {|
        enabled: boolean,
      |},
      linkedin: {|
        link: string,
        enabled: boolean,
      |},
      blog: {|
        enabled: boolean,
      |},
      facebook: {|
        link: string,
        enabled: boolean,
      |},
    |},
    search: {|
      sorting: {|
        enabled: boolean,
      |},
      modes: {|
        return: {
          enabled: boolean,
        },
        oneway: {
          enabled: boolean,
        },
        salesman: {
          enabled: boolean,
        },
        multicity: {
          enabled: boolean,
        },
      |},
    |},
    legal: {|
      booking_agreement: {|
        t_key: string,
      |},
      cookies: {|
        t_key: string,
      |},
      terms: {|
        t_key: string,
      |},
      privacy: {|
        t_key: string,
      |},
    |},
    general: {|
      trustpilot: {|
        link: string,
        enabled: boolean,
      |},
    |},
    promotion: {|
      uber: {|
        link: string,
        code: string,
        enabled: boolean,
      |},
      rentalcars: {},
      mobile_apps: {|
        download: {|
          link: string,
          enabled: boolean,
        |},
        android: {|
          link: string,
          enabled: boolean,
          id: string,
        |},
        ios: {|
          link: string,
          enabled: boolean,
          id: string,
        |},
      |},
      car_rental: {|
        mail_link_base_url: string,
        mail_link: string,
        enabled: boolean,
        external: boolean,
        email_enabled: boolean,
      |},
      accommodation: {|
        mail_link_base_url: string,
        enabled: boolean,
        external: boolean,
        email_enabled: boolean,
      |},
    |},
    pages: {|
      about: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      terms: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      invite: {|
        link: string,
        enabled: boolean,
      |},
      privacy: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      top_routes: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      media: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      brand: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      gdpr_terms: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      faq: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      stories: {|
        link: string,
        enabled: boolean,
      |},
      branding: {|
        link: string,
        enabled: boolean,
      |},
      security: {|
        link: string,
        enabled: boolean,
      |},
      careers: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
      guarantee: {|
        fully_qualified: boolean,
        link: string,
        enabled: boolean,
      |},
    |},
  |},
  theme: {|
    colors: {|
      "danger-900": string,
      "primary-800": string,
      "danger-300": string,
      "google-800": string,
      "accent-500": string,
      "grey-500": string,
      "danger-800": string,
      "accent-200": string,
      "success-300": string,
      "primary-900": string,
      "danger-400": string,
      "accent-100": string,
      "grey-400": string,
      "neutral-200": string,
      "neutral-500": string,
      "primary-300": string,
      "success-200": string,
      "warning-400": string,
      "grey-200": string,
      "neutral-400": string,
      "warning-500": string,
      "trip-start": string,
      "google-500": string,
      "neutral-700": string,
      "accent-800": string,
      "neutral-300": string,
      "accent-900": string,
      "neutral-600": string,
      "danger-500": string,
      "accent-300": string,
      "danger-200": string,
      "insurance-plus": string,
      "grey-700": string,
      white: string,
      "grey-900": string,
      "grey-600": string,
      "neutral-900": string,
      "facebook-500": string,
      "grey-100": string,
      "warning-300": string,
      "success-400": string,
      "warning-600": string,
      "warning-800": string,
      "facebook-600": string,
      "primary-600": string,
      "grey-800": string,
      "success-700": string,
      "warning-700": string,
      "primary-100": string,
      "neutral-100": string,
      "text-secondary": string,
      "mail-footer-500": string,
      "success-100": string,
      "warning-100": string,
      "mail-button-500": string,
      "google-600": string,
      "primary-400": string,
      "success-900": string,
      "warning-200": string,
      "mail-header-500": string,
      "facebook-800": string,
      "primary-200": string,
      "success-500": string,
      "primary-500": string,
      "text-primary": string,
      "accent-600": string,
      "brand-info": string,
      "danger-700": string,
      "warning-900": string,
      "trip-end": string,
      "accent-700": string,
      "neutral-800": string,
      "danger-600": string,
      "success-800": string,
      "danger-100": string,
      "success-600": string,
      "accent-400": string,
      "primary-700": string,
    |},
    palette: {|
      productNormal: string,
      productNormalHover: string,
      productLight: string,
      productDark: string,
      productLightHover: string,
      productLightActive: string,
      productNormalActive: string,
    |},
  |},
  company_name: string,
  localization: {|
    languages: {|
      default: string,
      locales: {
        [lang: string]: {|
          enabled: boolean,
          mailing: boolean,
        |},
      },
    |},
  |},
  auth: {|
    credentials: boolean,
    social_google: {|
      enabled: boolean,
    |},
    social_facebook: {|
      enabled: boolean,
    |},
  |},
  web_title: string,
  affilid: string,
  services: {|
    add_bags: {|
      enabled: boolean,
    |},
    refunds: {|
      enabled: boolean,
    |},
    change_flights: {|
      enabled: boolean,
    |},
    watchdog: {|
      enabled: boolean,
    |},
    insurance: {|
      enabled: boolean,
    |},
    guarantee: {|
      enabled: boolean,
    |},
  |},
  fallbackDomain: string,
  name: string,
  web_link: string,
  payments: {|
    zooz_id: string,
    refund_methods: {|
      origin: {|
        enabled: boolean,
      |},
      credits: {|
        enabled: boolean,
      |},
      pay_pal: {|
        enabled: boolean,
      |},
      voucher: {|
        enabled: boolean,
      |},
      bank_transfer: {|
        enabled: boolean,
      |},
    |},
    whitelisted_currencies: string[],
    payment_methods: {|
      alipay: {|
        enabled: boolean,
      |},
      sofort: {|
        enabled: boolean,
      |},
      cup: {|
        enabled: boolean,
      |},
      paypal: {|
        enabled: boolean,
      |},
      credits: {|
        enabled: boolean,
      |},
      yandex: {|
        enabled: boolean,
      |},
      trustly: {|
        enabled: boolean,
      |},
      card: {|
        enabled: boolean,
      |},
    |},
  |},
  powered_by_kiwi: boolean,
|};

export type Brands = { [key: string]: Brand };

declare export var brandDefault: Brand;
```

_TODO_

## BrandLanguage

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/BrandLanguage";
import type { BrandLanguage } from "@kiwicom/nitro/lib/records/BrandLanguage";
```

**Types:**
```js
export type BrandLanguage = {|
  defaultLocale: string,
  languages: Languages,
  continents: string[],
|};

export type BrandLanguages = {
  [brandId: string]: {
    [localeId: string]: BrandLanguage,
  },
};

declare export var brandLanguageDefault: BrandLanguage;
```

See types:
* [Languages](./records#languages)

_TODO_

## Continents

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Continents";
import type { Continents } from "@kiwicom/nitro/lib/records/Continents";
```

**Types:**
```js
export type Continents = { [key: string]: string[] };

declare export var tKeys: {|
  aas: string,
  ap: string,
  eu: string,
  mea: string,
|};

declare export var continentsDefault: Continents;
```

_TODO_

## Country

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Country";
import type { Country } from "@kiwicom/nitro/lib/records/Country";
```

**Types:**
```js
export type Country = {|
  id: string,
  currency: string,
  continent: string | string[],
  AR: string,
  BG: string,
  BR: string,
  CA: string,
  CN: string,
  CS: string,
  DA: string,
  DE: string,
  EL: string,
  EN: string,
  ES: string,
  FI: string,
  FR: string,
  HR: string,
  HU: string,
  ID: string,
  IE: string,
  IS: string,
  IT: string,
  JA: string,
  KO: string,
  LT: string,
  MX: string,
  NL: string,
  NO: string,
  NZ: string,
  PL: string,
  PT: string,
  RO: string,
  RU: string,
  SK: string,
  SR: string,
  SV: string,
  TH: string,
  TR: string,
  TW: string,
  UK: string,
  VN: string,
  HE: string,
|};

export type Countries = { [key: string]: Country };

declare export var countryDefault: Country;
```

_TODO_

## Currency

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Currency";
import type { Currency } from "@kiwicom/nitro/lib/records/Currency";
```

**Types:**
```js
export type Currency = {|
  id: string,
  name: string,
  format: string,
  uncertainFormat: boolean,
  round: string, // number string
  enabledOnAffilId: string | string[],
  fallback: string,
  rate: number,
|};

export type Currencies = {
  [key: string]: Currency,
};

declare export var getCode: (code: string) => string;
declare export var getSymbol: (format: string) => string;
declare export var convert: (currency: Currency, eur: number) => number;
declare export var format: (currency: Currency, price: number) => string;

declare export var getAvailableList: Currencies => Currency[];

declare export var currencyDefault: Currency;

declare export var MOST_USED_CURRENCIES: string[];
```

_TODO_

## Event

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Event";
import type { Event } from "@kiwicom/nitro/lib/records/Event";
```

**Types:**
```js
export type Category =
  | "Account"
  | "Auth"
  | "Booking"
  | "Content"
  | "Cookies"
  | "General"
  | "Holidays"
  | "Manage"
  | "Netverify"
  | "Nitro"
  | "Payment"
  | "Refund"
  | "Search"
  | "SmartFAQ"
  | "Watchdog";

export type Event = {|
  category: Category,
  subCategory?: string,
  action: string,
  detail?: string,
  destinations: {|
    exponea: boolean,
    ga: boolean,
    logmole: boolean,
  |},
|};

export type Props = { [key: string]: string | number | boolean };

export type EventPayload = {|
  ...Event,
  timestamp: number,
  props: Props,
|};

declare export var make: (event: Event, props: Props, now?: number) => EventPayload;
```

A data type for our [Loglady](https://loglady.skypicker.com/api-docs/) tracking system.

## Fetched

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Fetched";
import type { Fetched } from "@kiwicom/nitro/lib/records/Fetched";
```

**Types:**
```js
export type Fetched = {|
  airlines: Airlines,
  countries: Countries,
  continents: Continents,
  brandLanguage: BrandLanguage,
|};

declare export var fetchedDefault: Fetched;
```

See types:
* [Airline](./records#airline)
* [Country](./records#country)
* [Continents](./records#continents)
* [BrandLanguage](./records#brandlanguage)

_TODO_

## Intl

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Intl";
import type { Intl } from "@kiwicom/nitro/lib/records/Intl";
```

**Types:**
```js
export type IntlRaw = {|
  language: LangInfo,
  translations: Translations,
|};

export type Intl = {|
  ...IntlRaw,
  translate: Translate,
  getLocale: Promise<$FlowFixMe>, // Resolves 'date-fns' locale
|};

export type IntlsRaw = { [key: string]: IntlRaw };
export type Intls = { [key: string]: Intl };

declare export var intlDefault: Intl;
```

See types:
* [LangInfo](./records#langinfo)

Holds all necessary **i18n** data & functions.

## LangInfo

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/LangInfo";
import type { LangInfo } from "@kiwicom/nitro/lib/records/LangInfo";
```

**Types:**
```js
export type LangInfo = {|
  id: string,
  name: string,
  displayName: string,
  phone: string,
  email: string,
  defaultCountry: string,
  api: string,
  moment: string,
  jumio: string,
  nginx: string,
  countriesTranslations: string,
  phraseApp: string,
  translations: string,
  canonical: string,
  hreflang: string,
  iso: string,
  locations: string,
  dateFormat: string,
  dateFormatShort: string,
  dateFormatLong: string,
  dateFormatPlain: string,
  timeFormat: string,
  durationFormat: string,
  durationFormatShort: string,
  dimension: string,
  weight: string,
  latinInputs: boolean,
  currency: string,
  direction: string,
  flag: string,
  fontSubsets: string,
  firstNamePlaceholder: string,
  lastNamePlaceholder: string,
  addressPlaceholder: string,
  cityPlaceholder: string,
  zipCodePlaceholder: string,
  idNumberPlaceholder: string,
  companyVatPlaceholder: string,
  companyNamePlaceholder: string,
  distanceUnit: string,
  distanceUnitConversionRate: string,
  elevioLang: string,
  specialFont: string,
  decimalSeparator: string,
  thousandsSeparator: string,
  separateFourDigits: string,
|};

export type LangInfos = { [id: string]: LangInfo };

declare export var langInfoDefault: LangInfo;

declare export var fixDateFormat: (date: string) => string;
declare export var fixTimeFormat: (time: string) => string;
```

_TODO_

## Languages

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Languages";
import type { Languages } from "@kiwicom/nitro/lib/records/Languages";
```

**Types:**
```js
export type Language = {|
  id: string,
  name: string,
  flag: string,
  defaultCountry: string,
  continent: string | string[],
|};

export type Languages = { [key: string]: Language };

declare export var getByContinent: (languages: Language[], continent: string) => Language[];

export type LanguageNames = {|
  primary: string,
  secondary: string,
|};

declare export var getNames: (lang: Language) => LanguageNames;
```

_TODO_

## Location

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Location";
import type { Location } from "@kiwicom/nitro/lib/records/Location";
```

**Types:**
```js
export type LocationArea = {|
  id: string,
  name: string,
  slug: string,
  code: string,
|};

type Common = {|
  id: string,
  name: string,
  code?: string,
  slug: string,
  location: {|
    lat: number,
    lng: number,
  |},
|};

export type LocationCountry = {|
  ...Common,
  type: "country" | "special",
|};

export type LocationSubdivision = {|
  ...Common,
  type: "subdivision" | "autonomous_territory",
  country: LocationArea,
|};

export type LocationCity = {|
  ...Common,
  type: "city",
  country: LocationArea,
  subdivision: LocationArea,
|};

export type LocationAirport = {|
  ...Common,
  type: "airport" | "station",
  country: LocationArea,
  city: LocationArea,
|};

export type Location = LocationCountry | LocationSubdivision | LocationCity | LocationAirport;
```



## Loglady

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Loglady";
import type { Loglady } from "@kiwicom/nitro/lib/records/Loglady";
```

**Types:**
```js
export type Globals = {|
  userId: string,
  affilId: string,
  brandingId: string,
  url: string,
  langId?: string,
  sessionId?: string,
  project?: string,
  module?: string,
  pageName?: string,
  deeplinkId?: string,
  pageViewId?: string,
  bid?: number,
  splitster?: { [key: string]: string },
  UTMs: { [key: string]: string },
|};

export type Loglady = {|
  events: EventPayload[],
  global: Globals,
|};
```

See types:
* [Event](./records#event)

A data type for our [Loglady](https://loglady.skypicker.com/api-docs/) tracking system.

## Theme

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Theme";
import type { Theme } from "@kiwicom/nitro/lib/records/Theme";
```

**Types:**
```js
export type Theme = {|
  orbit: Tokens,
  rtl: boolean,
|};

export type ThemeProps = {| theme: Theme |};

declare export var themeDefault: Theme;

declare export var getBrandTheme: (brand: Brand, rtl?: boolean) => Theme;
```

See types:
* [Brand](./records#brand)

_TODO_

## User

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/User";
import type { User } from "@kiwicom/nitro/lib/records/User";
```

**Types:**
```js
export type User = {|
  id: string,
  email: string,
  verified: boolean,
  firstname: string,
  lastname: string,
  // apiToken: string,
  // affiliateId: string,
  // cardDiscount: number,
  // balanceDiscount: number,
  // balances: Array<{ amount: number, currency: string }>, ???
|};

declare export var userDefault: User | null;

export type MapUserInput = {|
  user_id: string,
  email: string,
  email_verified: boolean,
  first_name: string,
  last_name: string,
|};

declare export var mapUser: (input: MapUserInput) => User;
```

_TODO_
