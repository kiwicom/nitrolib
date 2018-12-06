# Intl

Contains all necessary information regarding **i18n**:
* **language info** - a record from the `data/languages.json` file, see `records/LangInfo.js` for the type and default value
* **translations** - one of the files from `data/translations/<locale>_<hash>.json`, a key/value object
* **translate function**
* **`date-fns` locale**

See the [Intl](./records#intl) record.

#### Translate

If you need to output a string, not a component, use the `translate` function located in the context:

```js
<IntlConsumer>
  {({ translate }) => (
    <input
      id={id}
      value={value} 
      onChange={onChange}
      placeholder={translate(__("First name"))}
    />
  )}
</IntlConsumer>
```

#### Date-fns locale

A promise that resolves to a `date-fns` locale. Defaults to `en-US`. To lazy load your own locale, use dynamic `import`:

```js
const LOCALES = {
  cz: () => import("date-fns/locales/cz"),
  enUS: () => import("date-fns/locales/en-US"),
  ru: () => import("date-fns/locales/ru"),
};

const ID = window.__INTL__.language.id;

const localeFn = LOCALES[ID] || LOCALES.enUS; // Fallback to 'en-US'

<InitIntl raw={intlRaw} getLocale={localeFn()}>
  {intl => (
    <IntlProvider value={intl}>
      <Root />
    </IntlProvider>
  )}
</InitIntl>
```
