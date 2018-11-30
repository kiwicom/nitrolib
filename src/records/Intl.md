Holds all necessary **i18n** data & functions.

#### Date-fns

To have a custom `locale` loaded, supply your own `getLocale` function to the context:

```js
<InitIntl
  intl={intlRaw}
  getLocale={() => import(`date-fns/locale/${intl.language.locations}`)}
>
  {intl => (
    <IntlProvider value={intl}>
      <Root />
    </IntlProvider>
  )}
</InitIntl>
```

The `en-US` locale will be loaded if your function throws an error.
