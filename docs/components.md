# Components

Located in `@kiwicom/nitro/lib/components/<component>`.

**Features:**

* [HeaderLinks](#headerlinks)
* [NavBar](#navbar)

**Utilities:**

* [ClickOutside](#clickoutside)
* [ClientOnly](#clientonly)
* [CookiesConsent](#cookiesconsent)
* [Desktop](#desktop)
* [Mobile](#mobile)
* [Price](#price)
* [Toggle](#toggle)
* [Translate](#translate)
* [TranslateNode](#translatenode)

## Features

Actual components that do stuff. See [storybook](https://nitro-storybook-master.fe.staging.kiwi.com) for a live example.

### HeaderLinks

**Import:**

```js
import HeaderLinks from "@kiwicom/nitro/lib/components/HeaderLinks";
```

**Props:**
```js
type Props = {|
  linkFlights: string,
  linkCars: string,
  linkRooms: string,
  linkHolidays: string, // empty string to omit
  forceNewWindow: boolean, // force opening links in a new window
|};
```

Context needs:
* **intl**

### NavBar

**Import:**

```js
import NavBar from "@kiwicom/nitro/lib/components/NavBar";
```

**Props:**
```js
type Props = {|
  headerLinks: React.Node,
  starred: React.Node,
  chat: React.Node,
  subscription: React.Node,
  debug: React.Node,
  inverted: boolean,
  portal: string,
  onOpenFaq: ?() => void,
  onSetModal: (modal: Modal) => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
  onLogoClick: (ev: SyntheticMouseEvent<HTMLAnchorElement>) => void,
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

**Props:**
```js
type Props = {|
  onClickOutside: (ev: MouseEvent) => void,
  active: boolean,
  children: React.Node | React.Node[],
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

**Props:**
```js
type Props = {|
  loader: React.Node,
  children: React.Node,
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

### CookiesConsent

**Import:**

```js
import CookiesConsent from "@kiwicom/nitro/lib/components/CookiesConsent";
```

**Props:**
```js
type Props = {|
  onAccept: () => void,
|};
```

Context needs:
* **intl**
* **brand**

### Desktop

**Import:**

```js
import Desktop from "@kiwicom/nitro/lib/components/Desktop";
```

**Props:**
```js
type Props = {|
  display: "block" | "inline" | "inline-block" | "flex",
  children: React.Node | React.Node[],
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

**Props:**
```js
type Props = {|
  display: "block" | "inline" | "inline-block" | "flex",
  children: React.Node | React.Node[],
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

**Props:**
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
    <TextNode t={__("Pay __x__")} values={{ x: <Price value={value} /> }} />
  </Button>
);
```

### Toggle

**Import:**

```js
import Toggle from "@kiwicom/nitro/lib/components/Toggle";
```

**Props:**
```js
type Data = {|
  open: boolean,
  onToggle: () => void,
|}; // ...docs

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

**Props:**
```js
type Props = {
  t: string,
  values: Values,
  html: boolean,
};
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

**Props:**
```js
type Props = {
  t: string,
  values: { [key: string]: React.Node },
};
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
    values={{ x: <button onClick={() => alert("Clicked")}>Yo</button> }}
  />
);
```
