# Components

Located in `@kiwicom/nitro/lib/components/<component>`.

**Features:**

* [CookiesConsent](#cookiesconsent)
* [Footer](#footer)
* [HeaderLinks](#headerlinks)
* [NavBar](#navbar)

**Utilities:**

* [BookingSavingsBanner](#bookingsavingsbanner)
* [ClickOutside](#clickoutside)
* [ClientOnly](#clientonly)
* [Desktop](#desktop)
* [Mobile](#mobile)
* [Price](#price)
* [Text](#text)
* [TextNode](#textnode)
* [Toggle](#toggle)
* [Translate](#translate)
* [TranslateNode](#translatenode)

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

**Context needs:**
* intl

### Footer

**Import:**
```js
import Footer from "@kiwicom/nitro/lib/components/Footer";
```

**Types:**
```js
type Props = {||};
```

**Context needs:**
* intl

### HeaderLinks

**Import:**
```js
import HeaderLinks from "@kiwicom/nitro/lib/components/HeaderLinks";
```

**Types:**
```js
export type Services = ?(Item[]);

export type ReadyUrl = {|
  rooms: ?{
    query: string,
    base: string,
  },
|};

export type HiddenUrls = {|
  holidays: boolean,
  logitravel: boolean,
|};

type Props = {|
  searchParams: {
    language: string,
  },
  urlParam: string,
  readyUrls: ReadyUrl,
  hiddenUrls: HiddenUrls,
|};
```

**Context needs:**
* intl

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

**Context needs:**
* auth
* brand
* currency
* fetched
* intl
* log

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
  dataTest?: string,
  hrefLearnMore: string, // Link to learn more page
  onMoreTripsClick: (e: SyntheticEvent<HTMLButtonElement>) => void, // Triggers modal with alternative trips
|};
```

**Context needs:**
* intl

Throw-away ticket banner indicating savings in €.

Example:
```js
const MyComponent = ({ onShowAlternativeFlights }: Props) => (
  <div>
    <BookingSavingsBanner dataTest="BookingSavingsAB" hrefLearnMore="https://kiwi.com/learnmore-tat" onMoreTripsClick={onShowAlternativeFlights} />
  </div>
);
```

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

**Context needs:**
* currency

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

**Context needs:**
* intl

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

**Context needs:**
* intl

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
|};
```

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

**Context needs:**
* intl

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

**Context needs:**
* intl

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
