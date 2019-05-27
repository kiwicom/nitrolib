# TranslateRef

The same as `Translate`, except it expects the translation to contain a `<ref></ref>` tag to be replaced with the result of the `render` function call. Useful for injecting event handlers!

> The text output can be transformed using the `transform` function. You can use arrow functions - the component does not implement pure render.

Example:
```js
const MyComponent = () => (
  <TranslateRef
    t="Some stuff, <ref>read more</ref>."
    render={text => <Link to="/about">{text}</Link>}
  />
);
```
