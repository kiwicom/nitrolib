// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs/react";

import NavBar from "../src/components/NavBar";
// FIXME extract this into a decorator
import { Provider as BrandProvider } from "../src/services/brand/context";
import { Provider as IntlProvider } from "../src/services/intl/context";
import { Provider as FetchedProvider } from "../src/services/fetched/context";
import { Provider as CurrencyProvider } from "../src/services/currency/context";
import brandLanguages from "./fixtures/brandLanguages";
import brands from "./fixtures/brands";
import continents from "./fixtures/continents";
import countries from "./fixtures/countries";
import languages from "./fixtures/languages";
import translations from "./fixtures/translations";

storiesOf("NavBar", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const brandId = select("Brand", Object.keys(brands), "kiwicom");
    const localeId = select("Locale", Object.keys(languages), "en");

    return (
      <BrandProvider value={brands[brandId]}>
        <IntlProvider
          language={languages[localeId]}
          translations={translations[languages[localeId].phraseApp]}
        >
          <FetchedProvider
            value={{
              countries,
              continents,
              brandLanguage: brandLanguages[brandId][localeId],
            }}
          >
            <CurrencyProvider
              whitelist={brands[brandId].payments.whitelisted_currencies}
              countries={countries}
              affiliate=""
              ip="1.3.3.7"
              initialCurrency="EUR"
              langCurrency={languages[localeId].currency}
              onChange={action("Save currency")}
            >
              <>
                <div id="sidenav" />
                <div id="modal" />
                <NavBar
                  onOpenChat={action("Open chat")}
                  onOpenSubscription={action("Open subscription")}
                  onSaveLanguage={action("Save language")}
                  onSaveToken={action("Save token")}
                />
              </>
            </CurrencyProvider>
          </FetchedProvider>
        </IntlProvider>
      </BrandProvider>
    );
  });
