# Components

Located in `@kiwicom/nitro/lib/components/<component>`.

Features:
* [CookiesConsent](#CookiesConsent)
* [HeaderLinks](#HeaderLinks)
* [NavBar](#NavBar)

Utilities:
* [ClickOutside](#ClickOutside)
* [ClientOnly](#ClientOnly)
* [Price](#Price)
* [Text](#Text)
* [TextNode](#TextNode)

## Features

Actual components that do stuff. See [storybook](https://nitro-storybook-master.fe.staging.kiwi.com) for a live example.

### CookiesConsent

Context needs:
* **intl**
* **brand**

```js
import CookiesConsent from "@kiwicom/nitro/lib/components/CookiesConsent";
```

Props:
```js
type Props = {|
  onAccept: () => void, // fired when the user accepts cookies
|};
```

### HeaderLinks

Context needs:
* **intl**
* **brand**
* **currency**

```js
import HeaderLinks from "@kiwicom/nitro/lib/components/HeaderLinks";
```

Props:
```js
type Props = {|
  provider: Provider, // "none" | "holidays" | "lastminute"
|};
```

### NavBar

Context needs:
* **intl**
* **brand**
* **fetched**
* **currency**
* **auth**

```js
import NavBar from "@kiwicom/nitro/lib/components/NavBar";
```

Props:
```js
type Props = {|
  headerLinks: React.Node, // header links component
  chat: React.Node, // chat component
  subscription: React.Node, // subscription component
  debug?: React.Node, // debug component
  onSaveToken: (token: string) => void, // fired when the user logges in
  onSaveLanguage: (lang: string) => void, // fired when the user changes language
|};
```

## Utilities

Things that help in development.

### ClickOutside

Fires a callback whenever a user clicks outside of this component.

```js
import ClickOutside from "@kiwicom/nitro/lib/components/ClickOutside";
```

Props:
```js
type Props = {|
  onClickOutside: (ev: MouseEvent) => void, // fired whenever the user clicks outside of the component
  children: React.Node | React.Node[],
|};
```

Example:
```js
const MyComponent = ({ onCloseModal }: Props) => (
  <ClickOutside onClickOutside={onCloseModal}>
    <MyModal />
  </ClickOutside>
);
```

### ClientOnly

Renders only on the client, useful for wrapping components that break **server-side rendering**.

```js
import ClientOnly from "@kiwicom/nitro/lib/components/ClientOnly";
```

Example:
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

### Price

Renders a formatted price.

Context needs:
* **currency**

```js
import Price from "@kiwicom/nitro/lib/components/Price";
```

Props:
```js
type Props = {|
  value: number,
|};
```

Example:
```js
const Pay = ({ value }: Props) => (
  <Button>
    <TextNode t={__("Pay __x__")} values={{ x: <Price value={value} /> }} />
  </Button>
);
```

### Text

Translates the supplied key.

> Make sure to wrap translation keys in the global `__` function!

Context needs:
* **intl**

```js
import Text from "@kiwicom/nitro/lib/components/Text";
```

Props:
```js
type Props = {
  t: string, // the translation key
  values?: Values, // a map of placeholders and their values
  html?: boolean, // make it 'true' if your translation string contains HTML elements
};
```

Example:
```js
const Submit = () => (
  <Button>
    <Text t={__("Submit")} />
  </Button>
);
```

### TextNode

The same as `Text`, except values are `React.Node`. Useful when you need to inject elements with event handlers!

> Make sure to wrap translation keys in the global `__` function!

Context needs:
* **intl**

```js
import TextNode from "@kiwicom/nitro/lib/components/TextNode";
```

Props:
```js
type Props = {
  t: string, // the translation key
  values: { [key: string]: React.Node }, // a map of placeholders and their React Node values
};
```

Example:
```js
const MyComponent = () => (
  <TextNode
    t={__("Click this: __x__")}
    values={{ x: <button onClick={() => alert("Clicked")}>Yo</button> }}
  />
);
```
