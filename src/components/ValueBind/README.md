# ValueBind

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
