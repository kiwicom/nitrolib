# rewriteCurrencies

Function rewrites original currencies structure that looks like:

```js
  hkd: {
    enabledOnAffilId: "",
    fallback: "gbp",
    format: "HK$__price__",
    id: "hkd",
    name: "Hong Kong dollar",
    rate: 0.109077,
    round: "2",
    uncertainFormat: false,
  }
```

to

```js
hkd: {
    id: "hkd",
    code: "HKD",
    name: "Hong Kong dollar",
    format: {
      format: "HK$__price__",
      isUncertain: false,
      precision: 2,
    },
    fallback: {
      id: "gbp",
      name: "British Pound Sterling",
      code: "GBP",
      format: {
        format: "£__price__",
        precision: 2,
        isUncertain: false,
      },
      fallback: null,
      enabledOnAffilId: ["uk"],
      rate: "1.14355",
    },
    enabledOnAffilId: "",
    rate: "0.109077",
  }
```
