# CustomerBaggageTile

- renders baggage tile for customer
- component should be used in baggage ordering process
- component has features:
  - order statuses
  - differ newly selected baggages from current

**Example:**

```js
<CustomerBaggageTile
  firstName="Vaclav"
  lastName="Havel"
  gender="male"
  isProcessing={false},
  current={{
    handBag: 1,
    holdBag: 1,
  }}
  selected={{
    handBag: 2,
    holdBag: 2,
  }}
  onClick={ () => {}}
  baggage={baggageData}
/>
```
