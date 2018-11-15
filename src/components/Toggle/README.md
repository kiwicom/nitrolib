# Toggle

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
