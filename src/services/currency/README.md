# Currency

Has all the necessary information and operations regarding currency.

Setup might look something like:

```js
// Rewrites currencies from fetched to new date structure
import rewriteCurrencies from "@kiwicom/nitro/lib/services/currency/serivces/rewriteCurrencies";

<CurrencyProvider
  value={{
    currency: available[currencyId],
    available,
    recommended: recommended.map(code => available[code]),
    onChange
  }}
>
  {children}
</CurrencyProvider>;

const connector: Connector<OwnProps, Props> = connect(state => ({
  // currency
  currencyId: getCurrency(state),
  available: rewriteCurrencies(getCurrencies(state)),
  recommended: getRecommendedCurrenciesSelectorJS(state)
}));

export default connector(NitroBridge);
```
