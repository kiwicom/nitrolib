# BaggageOverview

- renders baggage overview
- depending on props can be used as standalone component or wrapped in [Container ](`./components/Container`)

**Example:**

standalone

```js
<BaggageOverview
  definitions={definitions}
  FAQLinksHandler={category => {}}
  context="MMB-PassengerCard"
/>
```

wrapped in Container

```js
<Container
  passengers={[
    {
      paxId: 3,
      firstName: "George",
      lastName: "Bush",
      baggage: {
        holdBag: 0,
        handBag: 1
      }
    }
  ]}
  baggage={baggageData}
  context="booking"
>
  {({ props }) => <BaggageOverview {...props} />}
</Container>
```
