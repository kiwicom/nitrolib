# BaggagePaymentSummary

- renders baggage payment summary
- renders baggages per passenger with price per passenger
- renders summary price for all baggages in itinerary

**Example:**

```js
<BaggagePaymentSummary
  passengers={[
    {
      paxId: 1,
      firstName: "Vaclav",
      lastName: "Havel",
      baggage: {
        holdBag: 1,
        handBag: 1
      }
    }
  ]}
  baggage={baggageData}
/>
```
