# TranslateNode

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
