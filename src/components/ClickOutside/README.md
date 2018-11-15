# ClickOutside

Fires a callback whenever a user clicks outside of this component.

**Example:**
```js
const MyComponent = ({ open, onCloseModal }: Props) => (
  <ClickOutside active={open} onClickOutside={onCloseModal}>
    <MyModal open={open} />
  </ClickOutside>
);
```
