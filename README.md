# Nitrolib

Stuff common for our webs! :fire:

## CLI

Run `yarn nitro <command>`. Available commands:
* `fetch` - fetches production data

## Components

Located in `@kiwicom/nitro/lib/components/<component>`.

* [AirportResult](./src/components/AirportResult/index.jsx)
* [BrandName](./src/components/BrandName/index.jsx)
* [ClickOutside](./src/components/ClickOutside/index.jsx) - calls a callback when a user clicks outside of this component
* [ClientOnly](./src/components/ClientOnly/index.jsx) - only rendered client-side, useful for code performing side effects on mount
* [CookiesBanner](./src/components/CookiesBanner/index.jsx)
* [CookiesModal](./src/components/CookiesModal/index.jsx)
* [Day](./src/components/Day/index.jsx)
* [Flag](./src/components/Flag/index.jsx)
* [IataPicker](./src/components/IataPicker/index.jsx)
* [IconText](./src/components/IconText/index.jsx)
* [InputDate](./src/components/InputDate/index.jsx)
* [InputText](./src/components/InputText/index.jsx)
* [Modal](./src/components/Modal/index.jsx)
* [ModalOverlay](./src/components/ModalOverlay/index.jsx)
* [Price](./src/components/Price/index.jsx)
* [Select](./src/components/Select/index.jsx)
* [Tab](./src/components/Tab/index.jsx)
* [Text](./src/components/Text/index.jsx)
* [Time](./src/components/Time/index.jsx)
* [Tooltip](./src/components/Tooltip/index.jsx)

## Consts

Located in `@kiwicom/nitro/lib/consts/<const>`.

* [config](./src/consts/config.js)
* [device](./src/consts/device.js)

## Primitives

Located in `@kiwicom/nitro/lib/primitives/<primitive>`.

* [Flex](./src/primitives/Flex.js)

## Records

Located in `@kiwicom/nitro/lib/records/<record>`.

* [Brand](./src/records/Brand.js)
* [BrandLanguage](./src/records/BrandLanguage.js)
* [Continents](./src/records/Continents.js)
* [Country](./src/records/Country.js)
* [Currency](./src/records/Currency.js)
* [Fetched](./src/records/Fetched.js)
* [Intl](./src/records/Intl.js)
* [LangInfo](./src/records/LangInfo.js)
* [Languages](./src/records/Languages.js)

## Services

Located in `@kiwicom/nitro/lib/services/<service>`.

* [intl/translate](./src/services/intl/translate.js) - a translation function

### Contexts

Located in `@kiwicom/nitro/lib/services/<service>/context.js`.

* [brand](./src/services/brand/context.js)
* [currency](./src/services/currency/context.jsx)
* [fetched](./src/services/fetched/context.js)
* [intl](./src/services/intl/context.js)

## Styles

Located in `@kiwicom/nitro/lib/styles/<style>`

* [index](./src/styles/index.js) - has a bunch of constants regarding styles
* [mediaQuery](./src/styles/mediaQuery.js) - functions for generating media queries
* [mixins/border](./src/styles/mixins/border.js) - determines border state based on supplied component state

## License

MIT
