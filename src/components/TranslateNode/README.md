# TranslateNode

The same as `Translate`, except values are `React.Node`. Useful when you need to inject elements with event handlers!

> The text output can be transformed using the `transform` function. You can use arrow functions - the component does not implement pure render.

Context needs:
* **intl**

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
