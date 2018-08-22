# Components

Located in `@kiwicom/lib/components/<component>`.

## Features

Actual components that do stuff.

### CookiesConsent

Context needs:
* **intl**
* **branding**

```js
import CookiesConsent from "@kiwicom/nitro/lib/components/CookiesConsent";
```

Props:
```js
type Props = {|
  onAccept: () => void, // fired when the user accepts cookies
|};
```

### NavBar

Context needs:
* **intl**
* **branding**
* **fetched**
* **currency**
* **auth**

```js
import NavBar from "@kiwicom/nitro/lib/components/NavBar";
```

Props:
```js
type Props = {|
  onOpenSubscription: () => void, // fired when the user opens subscription
  onOpenChat: () => void, // fired when the user opens chat 
  debug: boolean, // whether to render the debug button
  onOpenDebug?: () => void, // fired when the debug button is pressed
  onSaveToken: (token: string) => void, // fired when the user logges in
  onSaveLanguage: (lang: string) => void, // fired when the user changes language
  splitster: Splitster, // see 'records'
|};
```

## Utilities

Things that help in development.

### ClickOutside

Fires a callback whenever a user clicks outside of this component.

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
  <Text
    t={__("Click this: __x__")}
    values={{ x: <button onClick={() => alert("Clicked")}>Yo</button> }}
  />
);
```
