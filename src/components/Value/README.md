# Value

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
