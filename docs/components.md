# Components

Located in `@kiwicom/nitro/lib/components/<component>`.

**Features:**

* [CookiesConsent](#cookiesconsent)
* [Currency](#currency)
* [DatePicker](#datepicker)
* [Footer](#footer)
* [HeaderLinks](#headerlinks)
* [LocationPicker](#locationpicker)
* [NavBar](#navbar)
* [SideBar](#sidebar)

**Utilities:**

* [BookingSavingsBanner](#bookingsavingsbanner)
* [Button](#button)
* [ClickOutside](#clickoutside)
* [ClientOnly](#clientonly)
* [CloseByKey](#closebykey)
* [Desktop](#desktop)
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
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=CookiesConsent).

**Context needs:**
* [intl](./services#intl)

Closeable cookies thingie.

**Selectors:**
* Container - `[data-test="CookiesConsent"]`

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
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=Currency).

**Context needs:**
* [currency](./services#currency)
* [log](./services#log)

A currency picker.

**Selectors:**
* Open button - `[data-test="Currency"] button[data-test="Open"]`
* Item - `[data-test="Currency"] [data-test="eur"]:first`

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
```

See types:
* [Location](./records#location)

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=LocationPicker).

**Context needs:**
* [intl](./services#intl)

### NavBar

**Import:**
```js
import NavBar from "@kiwicom/nitro/lib/components/NavBar";
```

**Types:**
```js
type Props = {|
  starred: React.Node,
  chat: React.Node,
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
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=NavBar).

**Context needs:**
* [auth](./services#auth)
* [brand](./services#brand)
* [currency](./services#currency)
* [fetched](./services#fetched)
* [intl](./services#intl)
* [log](./services#log)
* [modal](./services#modal)

**Selectors:**
* Container - `[data-test="NavBar"]`
* Side nav - `[data-test="SideNav"]`
* Logo - `[data-test="NavBar"] [data-test="Logo"]`
* Help - `[data-test="NavBar"] [data-test="Help"]`
* Open button - `[data-test="NavBar"] [data-test="OpenSideNav"]`
* Close button - `[data-test="SideNav"] [data-test="Close"]`

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
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=SideBar).

A container for a sidebar sliding from the _right_ (_left_ in RTL). It is appended to `document.body`.

## Utilities

Things that help in development.

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
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=BookingSavingsBanner).

**Context needs:**
* [intl](./services#intl)

Throw-away ticket banner indicating savings in €.

**Selectors:**
* Container: `[data-test="BookingSavingsBanner"]`
* More trips button: `[data-test="MoreTrips"]`
* Learn more button: `[data-test="LearnMore"]`

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
```

[Storybook](https://nitro-storybook-master.fe.staging.kiwi.com/?selectedKind=CloseByKey).

Fires a callback whenever a user presses the close button (_Escape_ by default).

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
