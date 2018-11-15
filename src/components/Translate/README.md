# Translate

Translates the supplied key.

> Make sure to wrap translation keys in the global `__` function!

Context needs:
* **intl**

**Example:**
```js
const Submit = () => (
  <Button>
    <Translate t={__("Submit")} />
  </Button>
);
```
