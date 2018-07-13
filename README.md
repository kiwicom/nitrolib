# Nitrolib

Stuff common for our webs! :fire:

## CLI

Run `yarn nitro <command>`. Available commands:
* `fetch` - fetches production data

## Components

Located in `@kiwicom/nitro/lib/components/<component>`.

* [AirportResult](./src/components/AirportResult/index.js.flow)
* [BrandName](./src/components/BrandName/index.js.flow)
* [ClickOutside](./src/components/ClickOutside/index.js.flow) - calls a callback when a user clicks outside of this component
* [ClientOnly](./src/components/ClientOnly/index.js.flow) - only rendered client-side, useful for code performing side effects on mount
* [CookiesBanner](./src/components/CookiesBanner/index.js.flow)
* [CookiesModal](./src/components/CookiesModal/index.js.flow)
* [Day](./src/components/Day/index.js.flow)
* [Flag](./src/components/Flag/index.js.flow)
* [IataPicker](./src/components/IataPicker/index.js.flow)
* [IconText](./src/components/IconText/index.js.flow)
* [InputDate](./src/components/InputDate/index.js.flow)
* [InputText](./src/components/InputText/index.js.flow)
* [Modal](./src/components/Modal/index.js.flow)
* [ModalOverlay](./src/components/ModalOverlay/index.js.flow)
* [Price](./src/components/Price/index.js.flow)
* [Select](./src/components/Select/index.js.flow)
* [Tab](./src/components/Tab/index.js.flow)
* [Text](./src/components/Text/index.js.flow)
* [Time](./src/components/Time/index.js.flow)
* [Tooltip](./src/components/Tooltip/index.js.flow)

## Consts

Located in `@kiwicom/nitro/lib/consts/<const>`.

* [config](./src/consts/config.js.flow)
* [device](./src/consts/device.js.flow)

## Primitives

Located in `@kiwicom/nitro/lib/primitives/<primitive>`.

* [Flex](./src/primitives/Flex.js.flow)

## Records

Located in `@kiwicom/nitro/lib/records/<record>`.

* [Brand](./src/records/Brand.js.flow)
* [BrandLanguage](./src/records/BrandLanguage.js.flow)
* [Continents](./src/records/Continents.js.flow)
* [Country](./src/records/Country.js.flow)
* [Currency](./src/records/Currency.js.flow)
* [Fetched](./src/records/Fetched.js.flow)
* [Intl](./src/records/Intl.js.flow)
* [LangInfo](./src/records/LangInfo.js.flow)
* [Languages](./src/records/Languages.js.flow)

## Services

Located in `@kiwicom/nitro/lib/services/<service>`.

* [intl/translate](./src/services/intl/translate.js.flow) - a translation function

### Contexts

Located in `@kiwicom/nitro/lib/services/<service>/context.js`.

* [brand](./src/services/brand/context.js.flow)
* [currency](./src/services/currency/context.js.flow)
* [fetched](./src/services/fetched/context.js.flow)
* [intl](./src/services/intl/context.js.flow)

## Styles

Located in `@kiwicom/nitro/lib/styles/<style>`

* [index](./src/styles/index.js.flow) - has a bunch of constants regarding styles
* [mediaQuery](./src/styles/mediaQuery.js.flow) - functions for generating media queries
* [mixins/border](./src/styles/mixins/border.js.flow) - determines border state based on supplied component state

## License

MIT
