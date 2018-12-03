# Price

Renders a formatted price.

Context needs:
* **currency**

**Example:**
```js
const Pay = ({ value }: Props) => (
  <Button>
    <TextNode
      t="Pay __x__"
      values={
        { x: <Price value={value} /> }
      }
    />
  </Button>
);
```
