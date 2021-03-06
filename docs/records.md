# Records

Located in `@kiwicom/nitro/lib/records/<record>`.

* [Affiliate](#affiliate)
* [Airline](#airline)
* [Auth](#auth)
* [Baggage](#baggage)
* [BaggageInfo](#baggageinfo)
* [Brand](#brand)
* [BrandLanguage](#brandlanguage)
* [Continents](#continents)
* [CookieSettings](#cookiesettings)
* [Country](#country)
* [Currency](#currency)
* [Event](#event)
* [Fetched](#fetched)
* [Intl](#intl)
* [Itinerary](#itinerary)
* [LangInfo](#langinfo)
* [Languages](#languages)
* [Location](#location)
* [Loglady](#loglady)
* [Price](#price)
* [Sector](#sector)
* [Segment](#segment)
* [Session](#session)
* [Starred](#starred)
* [Station](#station)
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

export type PasswordStrengthEnum = "WEAK" | "MEDIUM" | "STRONG";

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

declare export var getEmail: (a: Auth) => string;

declare export var authDefault: Auth | null;
```

See types:
* [User](./records#user)

_TODO_

## Baggage

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Baggage";
import type { Baggage } from "@kiwicom/nitro/lib/records/Baggage";
```

**Types:**
```js
export type BaggageCategory = "holdBag" | "handBag";
export type BaggageSubCategory = "holdBag" | "personalItem" | "cabinBag";
export type PassengerGroup = "adult" | "teen" | "child" | "infant";
export type OrderStatusType = "unpaid" | "processing" | "notAvailable";
export type Gender = "male" | "female";
export type OverviewContextType = "MMB-PassengerCard" | "MMB-PassengersSummary" | "booking";

export type Restrictions = {|
  weight: ?number,
  height: ?number,
  width: ?number,
  length: ?number,
  dimensionsSum: ?number,
|};

export type Conditions = {
  isPriority?: string[],
  passengerGroups: PassengerGroup[],
};
export type Definition = {|
  index: number,
  category: BaggageSubCategory,
  price: PriceType,
  restrictions: Restrictions,
  conditions: Conditions,
|};

export type TileDefinition = {|
  ...Definition,
  originalIndex?: number,
  isCurrent?: boolean,
|};

export type Definitions = {|
  handBag: Definition[],
  holdBag: Definition[],
|};

export type Combination = {|
  index: number,
  indices: number[],
  price: PriceType,
  conditions: Conditions,
|};

export type Combinations = {|
  handBag: Combination[],
  holdBag: Combination[],
|};

export type BaggageType = {
  definitions: Definitions,
  combinations: Combinations,
};

export type TileItem = {|
  category: BaggageSubCategory,
  restrictions: Restrictions,
|};

export type ItemType = {|
  ...TileItem,
  amount: number,
  conditions: {
    isPriority?: string[],
    passengerGroups: PassengerGroup[],
  },
|};

export type OptionBaggage = {|
  index: number,
  pickerType: BaggageCategory,
  price: PriceType,
  items: { [key: string]: ItemType },
|};

export type FAQLinksHandlerType = BaggageSubCategory => void;

export type BaggagePassengerType = {|
  paxId: number,
  firstName: string,
  middleName?: string,
  lastName: string,
|};

export type Passenger = {|
  ...BaggagePassengerType,
  baggage: {
    holdBag: number, // index of baggage combination
    handBag: number, // index of baggage combination
  },
|};

export type DefinitionWithPassenger = {|
  originalIndex: number,
  category: BaggageSubCategory,
  restrictions: Restrictions,
  passengers: BaggagePassengerType[],
|};
```

See types:
* [Price](./records#price)

Baggage

- baggages data type according to snake_case-camelCase mapped API response

## BaggageInfo

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/BaggageInfo";
import type { BaggageInfo } from "@kiwicom/nitro/lib/records/BaggageInfo";
```

**Types:**
```js
type SizeUnit = "CM" | "INCH";

type WeightUnit = "KG" | "POUND";

type SizeValue = {|
  value: string,
  unit: SizeUnit,
|};

type WeightValue = {|
  value: string,
  unit: WeightUnit,
|};

export type BaggageInfo = {|
  height: SizeValue,
  length: SizeValue,
  width: SizeValue,
  weight: WeightValue,
|};

export type BagsInfo = {|
  hasNoCheckedBags: boolean,
  checkedBag: BaggageInfo,
  handBag: BaggageInfo,
|};
```

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
      productDarker?: string,
      productLightHover: string,
      productLightActive: string,
      productNormalActive: string,
      productDarkHover?: string,
      productDarkActive?: string,
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

## CookieSettings

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/CookieSettings";
import type { CookieSettings } from "@kiwicom/nitro/lib/records/CookieSettings";
```

**Types:**
```js
export type CookieSettings = {|
  marketing: boolean,
  performance: boolean,
|};
```



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
type CurrencyFormat = {|
  format: string,
  precision: number,
|};

export type FetchedCurrency = {|
  enabledOnAffilId: string | string[],
  fallback: string,
  format: string,
  id: string,
  name: string,
  rate: number,
  round?: string,
  precision: string,
  uncertainFormat: boolean,
|};

export type FetchedCurrencies = { [key: string]: FetchedCurrency };

export type Currency = {|
  id: string,
  name: string,
  code: string,
  format: CurrencyFormat,
  fallback: Currency | null,
  enabledOnAffilId: string | string[],
  rate: string,
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
    bigQuery: boolean,
    datadog?: boolean,
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

## Itinerary

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Itinerary";
import type { Itinerary } from "@kiwicom/nitro/lib/records/Itinerary";
```

**Types:**
```js
export type Provider = {|
  id: string,
  name: string,
  code: string,
  hasHighProbabilityOfPriceChange: boolean,
|};

type BagsInfo = {|
  hasNoCheckedBags: boolean,
  checkedBag: BaggageInfo,
  handBag: BaggageInfo,
|};

type Common = {|
  id: string,
  price: Money,
  provider: Provider,
  duration: number,
  bagsInfo: BagsInfo,
|};

type BookingProvider = {|
  name: string,
  siteName: string,
|};
type BookingOption = {|
  provider: BookingProvider,
  price: Money,
  token: string,
|};

export type ItineraryOneWay = {|
  ...Common,
  type: "oneWay",
  bookingOptions: BookingOption,
  sector: string, // normalized, Sector
|};

export type ItineraryReturn = {|
  ...Common,
  type: "return",
  bookingOptions: BookingOption,
  outbound: string, //  normalized, Sector
  inbound: string, //  normalized, Sector
|};

export type ItineraryOneWayDeep = {|
  ...ItineraryOneWay,
  sector: SectorDeep,
|};

declare export var itineraryOneWay: {
  sector: Schema,
};

export type ItineraryReturnDeep = {|
  ...ItineraryReturn,
  outbound: SectorDeep,
  inbound: SectorDeep,
|};

declare export var itineraryReturn: {
  outbound: Schema,
  inbound: Schema,
};

export type ItineraryMulticity = {|
  ...Common,
  type: "multicity",
  sectors: string[], // normalized, Sector[]
|};

export type ItineraryMulticityDeep = {|
  ...ItineraryMulticity,
  sectors: SectorDeep[],
|};

declare export var itineraryMulticity: {
  sectors: Schema,
};

export type ItineraryNomad = {|
  ...Common,
  type: "nomad",
  sectors: string[], // normalized, Sector[]
|};

export type ItineraryNomadDeep = {|
  ...ItineraryNomad,
  sectors: SectorDeep[],
|};

declare export var itineraryNomad: {
  sectors: Schema,
};

export type Itinerary = ItineraryOneWay | ItineraryReturn | ItineraryMulticity | ItineraryNomad;

export type ItineraryDeep =
  | ItineraryOneWayDeep
  | ItineraryReturnDeep
  | ItineraryMulticityDeep
  | ItineraryNomadDeep;

export type ItineraryNormalized = {|
  result: Itinerary,
  entities: {|
    sector: { [id: string]: Sector },
    segment: { [id: string]: Segment },
    carrier: { [id: string]: Carrier },
  |},
|};

declare export var flatten: (data: ItineraryDeep) => ItineraryNormalized;
```

See types:
* [Sector](./records#sector)
* [Segment](./records#segment)
* [Money](./records#money)
* [BaggageInfo](./records#baggageinfo)



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
declare export var fixDurationFormat: (time: string) => string;
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
  type: "country" | "special" | string,
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
  project?: string,
  userId: string,
  accountId?: string,
  email?: string,
  module?: string,
  pageName?: string,
  langId?: string,
  sessionId?: string,
  deeplinkId?: string,
  pageViewId?: string,
  affilId: string,
  affilParams?: { [key: string]: string },
  brandingId: string,
  timestamp?: number,
  url: string,
  bid: ?number,
  splitster?: { [key: string]: string },
  UTMs: { [key: string]: string },
  bookingSessionId?: string,
  screenWidth?: number,
  screenHeight?: number,
  viewportWidth?: number,
  viewportHeight?: number,
  isLoggedIn?: boolean,
  browserPrivacyMode?: string,
  connectionType?: string,
  connectionSpeed?: number,
  connectionSpeedMax?: number,
|};

export type Loglady = {|
  events: EventPayload[],
  global: Globals,
|};
```

See types:
* [Event](./records#event)

A data type for our [Loglady](https://loglady.skypicker.com/api-docs/) tracking system.

## Price

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Price";
import type { Price } from "@kiwicom/nitro/lib/records/Price";
```

**Types:**
```js
export type PriceType = {
  amount: number,
  base: number,
  service: number,
  serviceFlat: number,
  merchant: number,
  currency: string,
};
```

Price

- common Price type

## Sector

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Sector";
import type { Sector } from "@kiwicom/nitro/lib/records/Sector";
```

**Types:**
```js
export type Stopover = {|
  nightsCount: number,
  arrival: Station,
  departure: Station,
|};

export type Sector = {|
  id: string,
  segments: string[], // normalized, Segment[]
  carriers: string[], // normalized, Carrier[]
  duration: number,
  stopover: Stopover,
|};

export type SectorDeep = {|
  ...Sector,
  segments: SegmentDeep[],
  carriers: Carrier[],
|};

// eslint-disable-next-line import/prefer-default-export
declare export var getSector: (obj: ItineraryNormalized, id: string) => Sector;
declare export var getSectors: (obj: ItineraryNormalized) => Sector[];
```

See types:
* [Station](./records#station)
* [Segment](./records#segment)
* [Itinerary](./records#itinerary)

A part of [Itinerary](#Itinerary).

## Segment

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Segment";
import type { Segment } from "@kiwicom/nitro/lib/records/Segment";
```

**Types:**
```js
export type Stop = {|
  station: Station,
  time: Date,
|};

type Guarantee = "KIWI_COM" | "CARRIER";

export type Layover = {|
  duration: number,
  guarantee: Guarantee,
  isStationChange: boolean,
  isBaggageRecheck: boolean,
|};

export type Carrier = {|
  id: string,
  name: string,
  code: string,
|};

type SeatDimenstion = {|
  value: string,
  unit: "CM" | "INCH" | "DEGREE",
|};

export type SeatInfo = {|
  pitch: SeatDimenstion,
  width: SeatDimenstion,
  recline: SeatDimenstion,
  hasPower: boolean,
  hasAudioVideo: boolean,
  hasWifi: boolean,
|};

export type Segment = {|
  id: string,
  source: Stop,
  destination: Stop,
  duration: number,
  type: "BUS" | "FLIGHT" | "TRAIN",
  code: string,
  layover: Layover,
  carrier: string, // normalized, Carrier
  operatingCarrier: string, // normalized, Carrier
  seatInfo: SeatInfo,
|};

export type Segments = { [key: string]: Segment };

export type SegmentDeep = {|
  ...Segment,
  carrier: Carrier,
  operatingCarrier: Carrier,
|};

declare export var getSegment: (obj: ItineraryNormalized, id: string) => Segment;
declare export var getSegments: (obj: ItineraryNormalized, ids: string[]) => Segment[];
```

See types:
* [Station](./records#station)
* [Itinerary](./records#itinerary)

A part of [Itinerary](#Itinerary).

## Session

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Session";
import type { Session } from "@kiwicom/nitro/lib/records/Session";
```

**Types:**
```js
export type Session = {|
  userId: string,
  sessionId: string,
  pageViewId: string,
  deeplinkId?: string, // TODO not optional in v4
  affiliate: Affiliate | null,
  UTMs: { [key: string]: string },
|};

declare export var sessionDefault: Session;
```

See types:
* [Affiliate](./records#affiliate)

Contains **user** and **request** specific information.

## Starred

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Starred";
import type { Starred } from "@kiwicom/nitro/lib/records/Starred";
```

**Types:**
```js
export type CabinClass = "economy" | "business" | "first" | "premium";

export type PassengersCount = {|
  adults: number,
  children: number,
  infants: number,
|};

export type StarredFormData = {|
  origin: string,
  destination: string,
  outboundDate: string,
  inboundDate: string,
  multicity: string,
  salesman: string,
  passengers: PassengersCount,
  cabinClass: CabinClass,
  filters: any,
  lang: string,
  places: Array<{ id: string, slug: string }>,
  returnUrl: string,
  starType: string,
|};

export type StarredItem = {|
  id: string,
  form: StarredFormData,
  lastPrice: number,
  itinerary: ItineraryDeep,
  priceUpdatedAt: Date,
  createdAt: Date,
  updatedAt: Date,
|};

export type ShareDialog = {|
  itinerary: ItineraryDeep,
  lang: string,
  shareUrl: string,
  passengers: PassengersCount,
  cabinClass: CabinClass,
  isMobile: boolean,
  onSetNotice: () => void,
  onClose: () => void,
|};

declare export var isMulti: (object: PassengersCount) => boolean;
declare export var getSum: (object: PassengersCount) => number;
declare export var getTransKey: (object: PassengersCount) => string;
```

See types:
* [Itinerary](./records#itinerary)

_TODO_

## Station

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Station";
import type { Station } from "@kiwicom/nitro/lib/records/Station";
```

**Types:**
```js
export type LocationArea = {|
  id: string,
  name: string,
  code: string,
  slug: string,
|};

export type Station = {|
  id: string,
  name: string,
  code: string,
  city: LocationArea,
  country: LocationArea,
  type: "AIRPORT" | "BUS_STATION" | "TRAIN_STATION",
|};
```

A part of [Segment](#segment) and [Sector](#sector).

## Theme

**Imports:**
```js
import * as fns from "@kiwicom/nitro/lib/records/Theme";
import type { Theme } from "@kiwicom/nitro/lib/records/Theme";
```

**Types:**
```js
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
type Balance = {|
  amount: number,
  currency: string,
|};

export type User = {|
  id: string,
  email: string,
  verified: boolean,
  firstname: string,
  lastname: string,
  photo?: string,
  apiToken: string,
  affiliateId: string,
  cardDiscount: number,
  balanceDiscount: number,
  balances: Balance[],
|};

declare export var userDefault: User | null;

export type MapUserInput = {|
  user_id: string,
  email: string,
  email_verified: boolean,
  first_name: string,
  photo?: string,
  last_name: string,
  affiliate_id: string,
|};

declare export var mapUser: (input: MapUserInput) => User;
```

_TODO_
