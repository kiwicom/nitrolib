# BaggagePicker

- renders baggage picker

**Example:**

```js
<BaggagePicker
  airlines={airlines}
  baggage={baggageData}
  context="context"
  changeBagCombination={(type, index) => {}}
  passengerBaggage={{
    handBag: 1,
    holdBag: 1
  }}
  passengerCategory="adult"
  prioBoardingLinkHandler={airlines => console.log("prioAirlines", airlines)}
  pickerType="handBag"
  shouldShowRecheckNote={false}
/>
```
