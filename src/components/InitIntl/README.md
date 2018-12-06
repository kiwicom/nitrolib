# InitIntl

Useful for initiating the **intl** context from raw intl data.

```js
import type { IntlRaw, Intl } from "@kiwicom/nitro/lib/records/Intl";

const raw: IntlRaw = window.__INTL__; // intl data from the server

const App = () => (
  <InitIntl raw={raw}>
    {(intl: Intl) => (
      <IntlProvider value={intl}>
        <Root />
      </IntlProvider>
    )}
  </InitIntl>
)

const node = document.getElementById("root");
if (node) {
  ReactDOM.hydrate(<App />, node);
}
```

On the server:

```js
import type { IntlRaw, Intl } from "@kiwicom/nitro/lib/records/Intl";

import { locales } from "./data";

export default function render(locale: string) {
  const raw: IntlRaw = locales[locale];

  const markup = ReactDOM.renderToString(
    <InitIntl raw={raw}>
      {(intl: Intl) => (
        <IntlProvider value={intl}>
          <Root />
        </IntlProvider>
      )}
    </InitIntl>
  );

  // <Html /> puts the raw intl data into window.__INTL__
  return ReactDOM.renderToStaticNodeStream(<Html intl={raw} />);
}
```
