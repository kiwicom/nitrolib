# Components

Located in `@kiwicom/nitro/lib/components/<component>`.

**Features:**

* [CookiesConsent](#cookiesconsent)
* [Footer](#footer)
* [HeaderLinks](#headerlinks)
* [NavBar](#navbar)

**Utilities:**

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

Context needs:
* **intl**
* **brand**

### Footer

**Import:**
```js
import Footer from "@kiwicom/nitro/lib/components/Footer";
```

**Types:**
```js
type Props = {||};
```

Context needs:
- **intl**

### HeaderLinks

**Import:**
```js
import HeaderLinks from "@kiwicom/nitro/lib/components/HeaderLinks";
```

**Types:**
```js
type Props = {|
  linkFlights: string,
  linkCars: string,
  linkRooms: string,
  linkHolidays: string, // empty string to omit
  forceNewWindow?: boolean, // force opening links in a new window
|};
```

Context needs:
* **intl**

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

Context needs:
* **intl**
* **brand**
* **fetched**
* **currency**
* **auth**

## Utilities

Things that help in development.

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

Renders a formatted price.

Context needs:
* **currency**

**Example:**
```js
const Pay = ({ value }: Props) => (
  <Button>
    <TextNode
      t={__("Pay __x__")}
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
  values?: Values,
  html?: boolean,
|};
```

Our `Translate` wrapped in _Orbit_'s `Text`. Accepts both our and their props.

Useful for both translating and making text nicer!

> Make sure to wrap translation keys in the global `__` function!

Context needs:
* **intl**

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
|};
```

Our `TranslateNode` wrapped in _Orbit_'s `Text`. Accepts both our and their props.

Useful for both translating and making text nicer!

> Make sure to wrap translation keys in the global `__` function!

Context needs:
* **intl**

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
  values?: Values, // {}, see 'services/intl/translate'
  html?: boolean, // false
|};
```

Translates the supplied key.

> Make sure to wrap translation keys in the global `__` function!

Context needs:
* **intl**

**Example:**
```js
const Submit = () => (
  <Button>
    <Translate t={__("Submit")} />
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
|};
```

The same as `Translate`, except values are `React.Node`. Useful when you need to inject elements with event handlers!

> Make sure to wrap translation keys in the global `__` function!

Context needs:
* **intl**

Example:
```js
const MyComponent = () => (
  <TranslateNode
    t={__("Click this: __x__")}
    values={
      { x: <button onClick={() => alert("Clicked")}>Yo</button> }
    }
  />
);
```
