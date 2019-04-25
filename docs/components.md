# Components

Located in `@kiwicom/nitro/lib/components/<component>`.

**Features:**

* [CookiesConsent](#cookiesconsent)
* [Currency](#currency)
* [DatePicker](#datepicker)
* [Footer](#footer)
* [HeaderLinks](#headerlinks)
* [LocationPicker](#locationpicker)
* [MagicLogin](#magiclogin)
* [NavBar](#navbar)
* [SideBar](#sidebar)

**Utilities:**

* [BaggageOverview](#baggageoverview)
* [BaggagePaymentSummary](#baggagepaymentsummary)
* [BaggagePicker](#baggagepicker)
* [BookingSavingsBanner](#bookingsavingsbanner)
* [Button](#button)
* [ClickOutside](#clickoutside)
* [ClientOnly](#clientonly)
* [CloseByKey](#closebykey)
* [CustomerBaggageTile](#customerbaggagetile)
* [Desktop](#desktop)
* [InitAuth](#initauth)
* [InitCurrency](#initcurrency)
* [InitIntl](#initintl)
* [InitLog](#initlog)
* [InitSession](#initsession)
* [Mobile](#mobile)
* [Price](#price)
* [Text](#text)
* [TextNode](#textnode)
* [Toggle](#toggle)
* [Translate](#translate)
* [TranslateNode](#translatenode)
* [Value](#value)
* [ValueBind](#valuebind)

## Features

Actual components that do stuff. See [storybook](https://nitro-storybook-master.fe.staging.kiwi.com) for a live example.

### CookiesConsent

**Import:**
```js
import CookiesConsent from "@kiwicom/nitro/lib/components/CookiesConsent";
```

**Types:**
```js
type Props = {|
  onAccept: () => void,
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=CookiesConsent).

**Context needs:**
* [intl](./services#intl)

**Selectors `data-test`:**
* ```"CookiesConsent"```

Closeable cookies thingie.

### Currency

**Import:**
```js
import Currency from "@kiwicom/nitro/lib/components/Currency";
```

**Types:**
```js
type Props = {|
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
  inverted?: boolean,
  onSetModal?: (modal: ModalType) => void,
  // defaulted
  native?: boolean,
  loading?: React.Node,
|};

declare export default React.ComponentType<Props>;
```

See types:
* [modals](./consts#modals)

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=Currency).

**Context needs:**
* [currency](./services#currency)
* [log](./services#log)

**Selectors `data-test`:**
* ```"Currency"```
* ```"Currency-Open"```
* ```{`Currency-Item-${item.id}`}```

A currency picker.

### DatePicker

**Import:**
```js
import DatePicker from "@kiwicom/nitro/lib/components/DatePicker";
```

**Types:**
```js
type Props = {|
  value: Date,
  onChange: (date: Date) => void,
  label: string,
  icon?: React.Node,
  min: Date,
  max: Date,
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=DatePicker).

**Context needs:**
* [intl](./services#intl)

_TODOs_
- [ ] DI `new Date()` into components for tests

### Footer

**Import:**
```js
import Footer from "@kiwicom/nitro/lib/components/Footer";
```

**Types:**
```js
type Props = {||};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=Footer).

**Context needs:**
* [intl](./services#intl)

### HeaderLinks

**Import:**
```js
import HeaderLinks from "@kiwicom/nitro/lib/components/HeaderLinks";
```

**Types:**
```js
type Splitster = {
  // FIXME add a firm structure
  [key: string]: string,
};

type Response = {|
  splitster: Splitster,
  items: HeaderLink[],
|};

type Props = {|
  languageId: string,
  currencyId: string,
  searchForm: SearchForm | null,
  splitster: Splitster,
  active?: string, // TODO maybe add specific if ids are also specified
  inverted?: boolean,
  onFetch?: (services: Response) => void,
  testResponse?: Response, // TODO DI actual API call
|};

declare export default React.ComponentType<Props>;
```

See types:
* [HeaderLink](./records#headerlink)

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=HeaderLinks).

**Context needs:**
* [intl](./services#intl)
* [log](./services#log)

### LocationPicker

**Import:**
```js
import LocationPicker from "@kiwicom/nitro/lib/components/LocationPicker";
```

**Types:**
```js
type Props = {|
  value: Location | null,
  onChange: (loc: Location) => void,
  label: string,
  icon?: React.Node,
  // defaulted
  environment?: Environment,
|};

declare export default React.ComponentType<Props>;
```

See types:
* [Location](./records#location)

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=LocationPicker).

**Context needs:**
* [intl](./services#intl)

### MagicLogin

**Import:**
```js
import MagicLogin from "@kiwicom/nitro/lib/components/MagicLogin";
```

**Types:**
```js
type Props = {|
  initialScreen: "intro" | "signUp",
  type: "mmb" | "help" | "refer",
  disableSocialLogin?: boolean,
  onClose: () => void,
  onSignIn: (user: AuthUser) => void,
  onSocialLogin: (provider: SocialProvider) => Promise<void>,
|};

declare export default React.ComponentType<Props>;
```

See types:
* [Auth](./records#auth)

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=MagicLogin).

**Context needs:**
* [brand](./services#brand)
* [intl](./services#intl)
* [log](./services#log)

**Selectors `data-test`:**
* ```"MagicLogin"```
* ```"MagicLogin-AskForMagic"```
* ```"MagicLogin-CheckEmail"```
* ```"MagicLogin-CreateAccount"```
* ```"MagicLogin-Email"```
* ```"MagicLogin-Email"```
* ```"MagicLogin-Intro"```
* ```"MagicLogin-LoginViaSocials"```
* ```"MagicLogin-NoAccount"```
* ```"MagicLogin-Password"```
* ```"MagicLogin-Password"```
* ```"MagicLogin-PasswordConfirm"```
* ```"MagicLogin-PasswordInput"```
* ```"MagicLogin-SocialLogin"```

Modal component handling the whole login flow with magic link.

**Docs**

[WIKI - New login flow with magic link](https://kiwi.wiki/frontend/wiki/#/teams/account/login/magic-link-login)

**Props**

- **disableSocialLogin** - disable the possibility to login via social network on intro screen, which enables to bypass the whole login flow and user can log in even without previously existing account. Default: *false*
- **initialScreen** - by default it shows intro screen where user is asked for e-mail based on which following steps are decided. You can pass `signUp` to display registration form immediately.
- **type** - Explains the reason why user is asked to login, current options are `mmb` to manage bookings, `help` to get personalized help & `refer` to refer a friend to get a bonus. Default: `mmb`
- **onClose** - callback to close the modal. TODO: should be handled probably by `ModalContext` in future.

**`data-test` attributes for acceptance tests**

- `MagicLogin` can be used to test if modal is opened as it wraps the whole login modal.
- Different stages of login process:
  - `MagicLogin-Intro` - initial screen of the login (unless registration was triggered immediately)
    - additional section `MagicLogin-LoginViaSocials` is appended on same level in DOM as `AccountLogin` unless login with social networks without e-mail check is disallowed.
  - `MagicLogin-CreateAccount` - registration form
  - `MagicLogin-Password` - login screen which asks for kiwi.com password.
  - `MagicLogin-SocialLogin` - screen which offers login via FB/Google after successful e-mail check.
  - `MagicLogin-NoAccount` - when user has no account or booking, this screen is displayed where he can either proceed with registration or go back to intro screen.
  - `MagicLogin-CheckEmail` - this is shown upon successful request to reset password or when e-mail with magic link is sent.
- `MagicLogin-CloseButton` - close button for the whole login modal.
- `MagicLogin-AskForMagic` - button that sends e-mail with magic link when clicked
- Also, all inputs should have its own `data-test` attribute corresponding to their purpose - `MagicLogin-Email`, `MagicLogin-Password`

**Example**

```js
import * as React from "react"
import { connect } from "react-redux"
import MagicLogin from "@kiwicom/nitro/lib/components/MagicLogin"
import type { Connector } from "react-redux"
import type { AuthUser } from "@kiwicom/nitro/lib/records/Auth"

type Provider = "facebook" | "google"

type ConnectorHandlers = {|
  onSocialLogin: (provider: Provider) => Promise<*>,
  onSignIn: (userInfo: AuthUser) => void,
|}

type OwnProps = {|
  disableSocialLogin: boolean,
  initialScreen: "intro" | "signUp",
  type: "mmb" | "help" | "refer",
  onClose: () => void,
|}

type Props = {|
  ...ConnectorHandlers,
  ...OwnProps,
|}

// onSignIn fn should handle usual action which takes place after successful login via email & password  
const onSignIn = (user) => ({ type: LOGIN_SUCCESS, res: user })
// onSocialLogin fn should trigger full OAuth login process thought specified provider
const onSocialLogin = (provider: Provider) => {}

const connector: Connector<OwnProps, Props> = connect(
  null,
  dispatch => ({
    onSignIn: (user: AuthUser) => dispatch(onSignIn(user)),
    onSocialLogin: (provider: Provider) => dispatch(onSocialLogin(provider)),
  }),
)
export default connector(MagicLogin)
```

### NavBar

**Import:**
```js
import NavBar from "@kiwicom/nitro/lib/components/NavBar";
```

**Types:**
```js
type Props = {|
  starred: React.Node,
  subscription: React.Node,
  portal: string,
  onOpenFaq: ?() => void,
  onSetModal: (modal: Modal) => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
  onLogoClick: (ev: SyntheticMouseEvent<HTMLAnchorElement>) => void,
  // defaulted
  headerLinks?: React.Node, // null
  debug?: React.Node, // null
  inverted?: boolean, // false
|};

declare export default React.ComponentType<Props>;
```

See types:
* [modals](./consts#modals)

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=NavBar).

**Context needs:**
* [auth](./services#auth)
* [brand](./services#brand)
* [currency](./services#currency)
* [fetched](./services#fetched)
* [intl](./services#intl)
* [log](./services#log)
* [modal](./services#modal)

**Selectors `data-test`:**
* ```"NavBar"```
* ```"NavBar-Help"```
* ```"NavBar-SideNav"```
* ```"NavBar-SideNav-Close"```
* ```"NavBar-SideNav-Open"```

### SideBar

**Import:**
```js
import SideBar from "@kiwicom/nitro/lib/components/SideBar";
```

**Types:**
```js
type Props = {|
  shown: boolean,
  inverted?: boolean, // opens from the other side
  unmasked?: boolean, // removes outer mask and disables onClick
  onClick: () => void,
  children: React.Node,
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=SideBar).

A container for a sidebar sliding from the _right_ (_left_ in RTL). It is appended to `document.body`.

## Utilities

Things that help in development.

### BaggageOverview

**Import:**
```js
import BaggageOverview from "@kiwicom/nitro/lib/components/BaggageOverview";
```

**Types:**
```js
FAQLinksHandlerType,
  DefinitionWithPassenger,
  DefinitionWithId,
  OverviewContextType,
} from "../../records/Baggage";

type Props = {|
  definitions?: DefinitionWithId[],
  definitionsWithPassengers?: DefinitionWithPassenger[],
  FAQLinksHandler?: FAQLinksHandlerType,
  context: OverviewContextType,
|};
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=BaggageOverview).

**Context needs:**
* [intl](./services#intl)

**Selectors `data-test`:**
* ```"BaggageOverview-BaggageItem-Passengers"```
* ```"BaggageOverview-NoPersonalItem"```
* ```{`BaggageOverview-${context}`}```
* ```{`BaggageOverview-BaggageItem-${category}`}```

- renders baggage overview
- depending on props can be used as standalone component or wrapped in [Container ](`./components/Container`)

**Example:**

standalone

```js
<BaggageOverview
  definitions={definitions}
  FAQLinksHandler={category => {}}
  context="MMB-PassengerCard"
/>
```

wrapped in Container

```js
<Container
  passengers={[
    {
      paxId: 3,
      firstName: "George",
      lastName: "Bush",
      baggage: {
        holdBag: 0,
        handBag: 1
      }
    }
  ]}
  baggage={baggageData}
  context="booking"
>
  {({ props }) => <BaggageOverview {...props} />}
</Container>
```

### BaggagePaymentSummary

**Import:**
```js
import BaggagePaymentSummary from "@kiwicom/nitro/lib/components/BaggagePaymentSummary";
```

**Types:**
```js
type Passenger = {|
  paxId: number,
  firstName: string,
  lastName: string,
  baggage: {
    holdBag: number,
    handBag: number,
  },
|};

type Props = {|
  passengers: Passenger[],
  baggage: BaggageType,
|};
```

See types:
* [Baggage](./records#baggage)

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=BaggagePaymentSummary).

**Context needs:**
* [currency](./services#currency)
* [intl](./services#intl)

**Selectors `data-test`:**
* ```"BaggagePaymentSummary"```
* ```"BaggagePaymentSummary-TotalPayment"```
* ```{`BaggagePaymentSummary-PassengerBaggages-${paxId}-Price`}```
* ```{`BaggagePaymentSummary-PassengerBaggages-${paxId}`}```

- renders baggage payment summary
- renders baggages per passenger with price per passenger
- renders summary price for all baggages in itinerary

**Example:**

```js
<BaggagePaymentSummary
  passengers={[
    {
      paxId: 1,
      firstName: "Vaclav",
      lastName: "Havel",
      baggage: {
        holdBag: 1,
        handBag: 1
      }
    }
  ]}
  baggage={baggageData}
/>
```

### BaggagePicker

**Import:**
```js
import BaggagePicker from "@kiwicom/nitro/lib/components/BaggagePicker";
```

**Types:**
```js
type Props = {|
  changeBagCombination: (BaggageCategory, number) => void,
  passengerCategory: PassengerGroup,
  passengerBaggage: { handBag: number, holdBag: number },
  baggage: BaggageType,
  shouldShowRecheckNote: boolean,
  airlines: { [string]: Airline },
  pickerType: BaggageCategory,
  context: "booking" | "mmb",
  currentCombination?: number,
  prioBoardingLinkHandler: (Airline[]) => void,
|};
```

See types:
* [Baggage](./records#baggage)
* [Airline](./records#airline)

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=BaggagePicker).

**Context needs:**
* [currency](./services#currency)
* [intl](./services#intl)

**Selectors `data-test`:**
* ```"BaggagePicker-EmptyLabel"```
* ```"BaggagePicker-EmptyOption"```
* ```"BaggagePicker-NoPersonalItemLabel"```
* ```"BaggagePicker-OptionItem-Current"```
* ```"BaggagePicker-OptionItem-Price"```
* ```"BaggagePicker-PriorityBoardingInfo"```
* ```"BaggagePicker-RecheckAlert"```
* ```"BaggagePicker-ShowButton"```
* ```{`BaggagePicker-${pickerType}`}```
* ```{`BaggagePicker-Option-${index}`}```
* ```{`BaggagePicker-OptionItem-${category}`}```

- renders baggage picker

**Example:**

```js
<BaggagePicker
  airlines={airlines}
  baggage={baggageData}
  context="context"
  changeBagCombination={(type, index) => {}}
  passengerBaggage={{
    handBag: 1,
    holdBag: 1
  }}
  passengerCategory="adult"
  prioBoardingLinkHandler={airlines => console.log("prioAirlines", airlines)}
  pickerType="handBag"
  shouldShowRecheckNote={false}
/>
```

### BookingSavingsBanner

**Import:**
```js
import BookingSavingsBanner from "@kiwicom/nitro/lib/components/BookingSavingsBanner";
```

**Types:**
```js
type Props = {|
  amount: number,
  currency: string,
  onLearnMoreClick: (e: SyntheticEvent<HTMLButtonElement>) => void, // Triggers redirection to learn more article
  onMoreTripsClick: (e: SyntheticEvent<HTMLButtonElement>) => void, // Triggers modal with alternative trips
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=BookingSavingsBanner).

**Context needs:**
* [intl](./services#intl)

**Selectors `data-test`:**
* ```"BookingSavingsBanner"```
* ```"BookingSavingsBanner-LearnMore"```
* ```"BookingSavingsBanner-MoreTrips"```

Throw-away ticket banner indicating savings in €.

### Button

**Import:**
```js
import Button from "@kiwicom/nitro/lib/components/Button";
```

**Types:**
```js
type Props = {|
  ...$Diff<PropsOrbit, { children: ?React.Node }>,
  t: string,
  values?: { [key: string]: string | number },
  html?: boolean,
  transform?: (value: string) => string,
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=Button).

**Context needs:**
* [intl](./services#intl)

Our `Translate` wrapped in _Orbit_ `Button`. Accepts both our and their props.

Button component shorter and nicer!

### ClickOutside

**Import:**
```js
import ClickOutside from "@kiwicom/nitro/lib/components/ClickOutside";
```

**Types:**
```js
type Props = {|
  onClickOutside: (ev: MouseEvent) => void,
  children: React.Node | React.Node[],
  // defaulted
  active?: boolean, // true
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=ClickOutside).

Fires a callback whenever a user clicks outside of this component.

**Example:**
```js
const MyComponent = ({ open, onCloseModal }: Props) => (
  <ClickOutside active={open} onClickOutside={onCloseModal}>
    <MyModal open={open} />
  </ClickOutside>
);
```

### ClientOnly

**Import:**
```js
import ClientOnly from "@kiwicom/nitro/lib/components/ClientOnly";
```

**Types:**
```js
type Props = {|
  children: React.Node,
  // defaulted
  loader?: React.Node, // null
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=ClientOnly).

Renders only on the client, useful for wrapping components that break **server-side rendering**.

**Example:**
```js
const MyComponent = () => (
  <ClientOnly>
    <>
      <ComponentWithSideEffects />
      <ComponentUsingTheWindowObject />
    </>
  </ClientOnly>
);
```

### CloseByKey

**Import:**
```js
import CloseByKey from "@kiwicom/nitro/lib/components/CloseByKey";
```

**Types:**
```js
type Props = {|
  onClose: (ev: KeyboardEvent) => void,
  children: React.Node,
  // defaulted
  closeKey?: string, // Escape
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=CloseByKey).

Fires a callback whenever a user presses the close button (_Escape_ by default).

### CustomerBaggageTile

**Import:**
```js
import CustomerBaggageTile from "@kiwicom/nitro/lib/components/CustomerBaggageTile";
```

**Types:**
```js
type Props = {|
  firstName: string,
  middleName?: string,
  lastName: string,
  gender: Gender,
  dayOfBirth?: string,
  isProcessing: boolean,
  current?: {
    handBag: number,
    holdBag: number,
  },
  selected?: {
    handBag: number,
    holdBag: number,
  },
  newDefinitions?: Definition[],
  onClick?: () => void,
  baggage: BaggageType,
|};
```

See types:
* [Baggage](./records#baggage)

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=CustomerBaggageTile).

**Context needs:**
* [currency](./services#currency)

**Selectors `data-test`:**
* ```"CustomerBaggageTile-BaggageItem"```
* ```"CustomerBaggageTile-ContactUsText"```
* ```"CustomerBaggageTile-Content"```
* ```"CustomerBaggageTile-Title"```
* ```{`CustomerBaggageTile-Badge-${status}`}```
* ```{`CustomerBaggageTile-Badge-${status}`}```
* ```{`CustomerBaggageTile-Badge-${status}`}```

- renders baggage tile for customer
- component should be used in baggage ordering process
- component has features:
  - order statuses
  - differ newly selected baggages from current

**Example:**

```js
<CustomerBaggageTile
  firstName="Vaclav"
  lastName="Havel"
  gender="male"
  isProcessing={false},
  current={{
    handBag: 1,
    holdBag: 1,
  }}
  selected={{
    handBag: 2,
    holdBag: 2,
  }}
  onClick={ () => {}}
  baggage={baggageData}
/>
```

### Desktop

**Import:**
```js
import Desktop from "@kiwicom/nitro/lib/components/Desktop";
```

**Types:**
```js
type Props = {|
  children: React.Node | React.Node[],
  // defaulted
  display?: "block" | "inline" | "inline-block" | "flex", // block
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=Desktop).

Renders only above **tablet** width.

**Example:**
```js
const NavBar = () => (
  <>
    <Desktop>
      <Button>A desktop-only button</Button>
    </Desktop>
    <Menu />
  </>
);
```

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

declare export default React.ComponentType<Props>;
```

See types:
* [Auth](./records#auth)
* [Brand](./records#brand)

Calls APIs for you, handles loading state and supplies context with _Relay_ environment with the auth token. Supplied callbacks are only there for the side effects:
* saving token to cookies on **login**
* removing token from cookies on **logout**
* redirecting the user on **social login**
* popping a note to check email on **register**
* redirecting the user to MMB on **my booking**

It also logs the user in on mount if you supply the `token` prop.

Saves or removes the `AFFILIATE_ID` cookie on sign in.

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
  getCurrencies?: () => Promise<FetchedCurrencies>,
  getGeoCountry?: (ip: string) => Promise<string>,
|};

declare export default React.ComponentType<Props>;
```

See types:
* [Brand](./records#brand)
* [Currency](./records#currency)
* [Country](./records#country)

_TODO_

### InitIntl

**Import:**
```js
import InitIntl from "@kiwicom/nitro/lib/components/InitIntl";
```

**Types:**
```js
type Props = {|
  raw: IntlRaw,
  children: (arg: Context) => React.Node,
  // defaulted
  getLocale?: Promise<$FlowFixMe>, // resolves en-US by default
|};

declare export default React.ComponentType<Props>;
```

See types:
* [Intl](./records#intl)

**Context needs:**
* [intl](./services#intl)

Useful for initiating the **intl** context from raw intl data.

```js
import type { IntlRaw } from "@kiwicom/nitro/lib/records/Intl";

const raw: IntlRaw = window.__INTL__; // intl data from the server

const App = () => (
  <InitIntl raw={raw}>
    {intl => (
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
import type { IntlRaw } from "@kiwicom/nitro/lib/records/Intl";

import { locales } from "./data";

export default function render(locale: string) {
  const raw: IntlRaw = locales[locale];

  const markup = ReactDOM.renderToString(
    <InitIntl raw={raw}>
      {intl => (
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

### InitLog

**Import:**
```js
import InitLog from "@kiwicom/nitro/lib/components/InitLog";
```

**Types:**
```js
type Props = {|
  globals: Globals,
  onLog: (ev: EventPayload, globals: Globals) => void,
  children: (ctx: Context) => React.Node,
|};

declare export default React.ComponentType<Props>;
```

See types:
* [Event](./records#event)
* [Loglady](./records#loglady)

**Context needs:**
* [log](./services#log)

Initializes the [log](./services#log) context.

**Example:**
```js
import type { EventPayload } from "@kiwicom/nitro/lib/records/Event";
import type { Globals } from "@kiwicom/nitro/lib/records/Loglady";
import { Provider as LogProvider } from "@kiwicom/nitro/lib/services/log/context";
import InitLog from "@kiwicom/nitro/lib/components/InitLog";

const globals: Globals = {
  userId: window.__SESSION__.userId,
  langId: window.__INTL__.id,
  // ...etc
};

function log(ev: EventPayload, globals: Globals) {
  // do side effects
}

ReactDOM.render(
  <InitLog globals={globals} onLog={log}>
    {ctx => (
      <LogProvider value={ctx}>
        <App />
      </LogProvider>
    )}
  </InitLog>,
  node,
);
```

### InitSession

**Import:**
```js
import InitSession from "@kiwicom/nitro/lib/components/InitSession";
```

**Types:**
```js
type Props = {|
  children: (session: Session) => React.Node,
|};

declare export default React.ComponentType<Props>;
```

See types:
* [Session](./records#session)

Initializes the [session](./services#session) context.

### Mobile

**Import:**
```js
import Mobile from "@kiwicom/nitro/lib/components/Mobile";
```

**Types:**
```js
type Props = {|
  children: React.Node | React.Node[],
  // defaulted
  display?: "block" | "inline" | "inline-block" | "flex", // block
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=Mobile).

Renders only below **tablet** width.

**Example:**
```js
const NavBar = () => (
  <>
    <Mobile>
      <Button>A mobile-only button</Button>
    </Mobile>
    <Menu />
  </>
);
```

### Price

**Import:**
```js
import Price from "@kiwicom/nitro/lib/components/Price";
```

**Types:**
```js
type Props = {|
  value: number,
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=Price).

**Context needs:**
* [currency](./services#currency)

Renders a formatted price.

**Example:**
```js
const Pay = ({ value }: Props) => (
  <Button>
    <TextNode
      t="Pay __x__"
      values={
        { x: <Price value={value} /> }
      }
    />
  </Button>
);
```

### Text

**Import:**
```js
import Text from "@kiwicom/nitro/lib/components/Text";
```

**Types:**
```js
type Props = {|
  ...$Diff<PropsOrbit, { children: React.Node }>,
  t: string,
  values?: { [key: string]: string | number },
  html?: boolean,
  transform?: (value: string) => string,
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=Text).

**Context needs:**
* [intl](./services#intl)

Our `Translate` wrapped in _Orbit_'s `Text`. Accepts both our and their props.

Useful for both translating and making text nicer!

### TextNode

**Import:**
```js
import TextNode from "@kiwicom/nitro/lib/components/TextNode";
```

**Types:**
```js
type Props = {|
  ...$Diff<PropsOrbit, { children: React.Node }>,
  t: string,
  values: { [key: string]: React.Node },
  transform?: (value: string) => string,
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=TextNode).

**Context needs:**
* [intl](./services#intl)

Our `TranslateNode` wrapped in _Orbit_'s `Text`. Accepts both our and their props.

Useful for both translating and making text nicer!

### Toggle

**Import:**
```js
import Toggle from "@kiwicom/nitro/lib/components/Toggle";
```

**Types:**
```js
type Data = {|
  open: boolean,
  onToggle: () => void,
|};

type Props = {|
  children: (data: Data) => React.Node,
  // defaulted
  initial?: boolean, // false
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=Toggle).

A container that holds state of something being open.

**Example:**
```js
const MyComponent = () => (
  <Toggle>
    {({ open, onToggle }) => (
      <>
        <h3>{open ? "Open" : "Closed"}</h3>
        <Button onClick={onToggle}>Toggle</Button>
      </>
    )}
  </Toggle>
);
```

### Translate

**Import:**
```js
import Translate from "@kiwicom/nitro/lib/components/Translate";
```

**Types:**
```js
type Props = {|
  t: string,
  // defaulted
  values?: { [key: string]: string | number }, // {}
  html?: boolean, // false
  transform?: (value: string) => string, // identity
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=Translate).

**Context needs:**
* [intl](./services#intl)

Translates the supplied key.

> The text output can be transformed using the `transform` function. You can use arrow functions - the component does not implement pure render.

**Example:**
```js
const Submit = () => (
  <Button>
    <Translate t="Submit" />
  </Button>
);
```

### TranslateNode

**Import:**
```js
import TranslateNode from "@kiwicom/nitro/lib/components/TranslateNode";
```

**Types:**
```js
type Props = {|
  t: string,
  values: { [key: string]: React.Node },
  // defaulted
  transform?: (value: string) => string, // identity
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=TranslateNode).

**Context needs:**
* [intl](./services#intl)

The same as `Translate`, except values are `React.Node`. Useful when you need to inject elements with event handlers!

> The text output can be transformed using the `transform` function. You can use arrow functions - the component does not implement pure render.

Example:
```js
const MyComponent = () => (
  <TranslateNode
    t="Click this: __x__"
    values={
      { x: <button onClick={() => alert("Clicked")}>Yo</button> }
    }
  />
);
```

### Value

**Import:**
```js
import Value from "@kiwicom/nitro/lib/components/Value";
```

**Types:**
```js
type Data = {|
  value: string,
  onChange: (value?: string) => void, // 'value' defaults to ""
|};

type Props = {|
  children: (data: Data) => React.Node,
  // defaulted
  initial?: string, // ""
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=Value).

A render props container component that holds a string value. Useful for modals, for example.

> Super useful when combined with the [ValueBind](#valuebind) component!

**Example:**
```js
const AuthModals = ({ query }: Props) => (
  <Value initial={query.modal || ""}>
    {({ value, onChange }) => (
      <>
        <ModalLogin open={value === "login"} onClose={onChange} />
        <ModalRegister open={value === "register"} onClose={onChange} />
        
        <ValueBind value="login" onChange={onChange}>
          {({ onClick }) => <Button onClick={onClick}>Login</Button>}
        </ValueBind>
        <ValueBind value="register" onChange={onChange}>
          {({ onClick }) => <Button onClick={onClick}>Register</Button>}
        </ValueBind>
      </>
    )}
  </Value>
)
```

### ValueBind

**Import:**
```js
import ValueBind from "@kiwicom/nitro/lib/components/ValueBind";
```

**Types:**
```js
type Data = {|
  onClick: () => void,
|};

type Props = {|
  value: string,
  onChange: (value: string) => void,
  children: (data: Data) => React.Node,
|};

declare export default React.ComponentType<Props>;
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=ValueBind).

Binds a value to a callback, that's it. Useful for changing `onChange` callbacks to `onClick` ones.

```js
const OpenLogin = ({ onChange }: Props) => (
  <ValueBind value="login" onChange={onChange}>
    {({ onClick }) => (
      <Button onClick={onClick} />
    )}
  </ValueBind>
)
```
