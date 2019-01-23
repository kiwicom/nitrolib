# Intl

Contains all necessary information regarding **i18n**:
* **[LangInfo](./records#langinfo)** - a record from the `data/languages.json` file
* **translations** - one of the files from `data/translations/<locale>_<hash>.json`, a key/value object
* **translate** function
* **`date-fns` locale**

Components for translating:
* [Text](./components#text)
* [TextNode](./components#textnode)
* [Translate](./components#translate)
* [TranslateNode](./components#translatenode)

### Translate function

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

### Date-fns locale

A promise that resolves to a `date-fns` locale. Defaults to `en-US`. To lazy load your own locale, use dynamic `import`:

```js
const LOCALES = {
  cs: () => import("date-fns/locale/cs"),
  enUS: () => import("date-fns/locale/en-US"),
  ru: () => import("date-fns/locale/ru"),
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
