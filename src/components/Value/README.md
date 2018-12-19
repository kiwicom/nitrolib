# Value

A render props container component that holds a string value. Useful for modals, for example.

**Example:**
```js
const AuthModals = ({ query }: Props) => (
  <Value initial={query.modal || ""}>
    {({ value, onChange }) => (
      <>
        <ModalLogin open={value === "login"} onClose={onChange} />
        <ModalRegister open={value === "register"} onClose={onChange} />
        
        <ButtonLogin onClick={() => onChange("login")} />
        <ButtonRegister onClick={() => onChange("register")} />
      </>
    )}
  </Value>
)
```
