# Constants

Located in `@kiwicom/nitro/lib/consts/<const>`.

**List:**
* [Config](#config)
* [Cookies](#cookies)
* [Events](#events)
* [Local](#local)
* [Modals](#modals)
* [Session](#session)

## Config

**Import:**
```js
import * as config from "@kiwicom/nitro/lib/consts/config";
```

**Types:**
```js
declare export default {|
  apiDateFormat: string,
  apiUrl: string,
  apiBookingUrl: string,
  bookingApiUrl: string,
  apiAuthUrl: string,
  authApiUrl: string,
  apiLocations: string,
  umbrellaUrl: string,
  mockApiUrl: string,
  logstashApiUrl: string,
  priceAlertUrl: string,
  cdnUrl: string,
  contentTeamImagesUrl: string,
  facebook: string,
  imagesUrl: string,
  iTunesAppId: string,
  iTunesAppIdCz: string,
  androidAppId: string,
  mail: string,
  rollbarAccessTokenClient: string,
  smartsuppKey: string,
  cupEnabledCurrencies: string[],
  cupEnabledLangs: string[],
  sofortEnabledCurrencies: string,
  sofortEnabledLangs: string[],
  trustlyEnabledCurrencies: string[],
  trustlyEnabledLangs: string[],
  mozioEnabledLangs: string[],
  parkcloudEnabledLangs: string[],
  yandexEnabledCurrencies: string[],
  paypalEnabledLangs: string[],
  paypalEnabledCurrencies: string[],
  paypalEnabledCurrenciesFull: string,
  twitter: string,
  urlDateFormat: string,
  userAppAppId: string,
  zoozIdSandbox: string,
  zoozId: string,
  zoozScriptUrlLocal: string,
  zoozScriptUrlRemote: string,
  POSApiUrl: string,
  POSEnabledCurrencies: string[],
  POSScriptUrlLocal: string,
  POSScriptUrlRemote: string,
  kayakPartnerId: string,
  facebookConversionId: string,
  affiliateWindowAdvertiserId: string,
  googleConversionId: string,
  infinarioDateFormat: string,
  continents: string[],
  linkedin: string,
  instagram: string,
  rebrandingDate: string,
  googleMapsJavascriptApiKey: string,
  bookingComOneWayDefaultNights: string,
  uberPromocode: string,
  FREE_POBEDA_BAG_WEIGHT: string,
  stagingEnvironmentUrl: string,
  airlinesWithOptionalMiddlename: string[],
  airlinesWithSplitFees: string[],
  soonDepartureThresholdHours: string,
  servicesSeatingAllowed: string[],
  servicesMealsDisallowed: string[],
  maxSearchMonths: string,
  metaApiUrl: string,
  pgpKey: string,
  feedbackAvailableLanguage: string[],
  totalBookingsStat: string,
  dailyQueriesStat: string,
  priceUpdatesStat: string,
  graphQLUrl: string,
|};
```

## Cookies

**Import:**
```js
import * as cookies from "@kiwicom/nitro/lib/consts/cookies";
```

**Types:**
```js
// All our cookies are meant to be centralized in this file for consistency
declare export var AFFILIATE_ID: "SKYPICKER_AFFILIATE";
declare export var COOKIES_CONSENT: "cookiesConsent";
declare export var USER_ID: "SKYPICKER_VISITOR_UNIQID";
declare export var UA_SESSION_TOKEN: "ua_session_token";

export type Cookie = string; // TODO specific once everyone uses this
```

## Events

**Import:**
```js
import * as events from "@kiwicom/nitro/lib/consts/events";
```

**Types:**
```js
declare export var API_ERROR: Event;
declare export var API_REQUEST: Event;
declare export var API_SUCCESS: Event;
declare export var API_REQUEST_FAILED: Event;
declare export var MODAL_OPEN: Event;
```

## Local

**Import:**
```js
import * as local from "@kiwicom/nitro/lib/consts/local";
```

**Types:**
```js
declare export var AFFILIATE_PARAMS: "affilParams";
declare export var STARRED_ID: "starredId";

export type Local = string; // TODO specific once everyone uses this
```

## Modals

**Import:**
```js
import * as modals from "@kiwicom/nitro/lib/consts/modals";
```

**Types:**
```js
export const NONE: "" = "";
export const MY_BOOKING: "myBooking" = "myBooking";
export const REGISTER: "register" = "register";
export const SIGN_IN: "signIn" = "signIn";
export const FORGOT_PASSWORD: "forgotPassword" = "forgotPassword";
export const SIDE_NAV: "sideNav" = "sideNav";
export const SUBSCRIPTION: "subscription" = "subscription";
export const DEBUG: "debug" = "debug";
export const CURRENCY_MENU: "currencyMenu" = "currencyMenu";
export const LANGUAGE_MENU: "languageMenu" = "languageMenu";

// FIXME remove usages, no need to separate
export type AuthModal = "myBooking" | "register" | "signIn" | "forgotPassword";

export type Modal =
  | ""
  | "myBooking"
  | "register"
  | "signIn"
  | "forgotPassword"
  | "sideNav"
  | "subscription"
  | "debug"
  | "currencyMenu"
  | "languageMenu";
```

## Session

**Import:**
```js
import * as session from "@kiwicom/nitro/lib/consts/session";
```

**Types:**
```js
declare export var SESSION_ID: "sessionId";
declare export var DEEPLINK_ID: "deeplinkId";
declare export var BOOKING_SESSION_ID: "bookingSessionId";

export type Session = string; // TODO specific once everyone uses this
```
