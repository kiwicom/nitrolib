// @flow strict
import * as React from "react";
import { ThemeProvider } from "styled-components";
import { addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs/react";

import { Provider as BrandProvider } from "../../src/services/brand/context";
import { Provider as IntlProvider } from "../../src/services/intl/context";
import { Provider as FetchedProvider } from "../../src/services/fetched/context";
import { Provider as CurrencyProvider } from "../../src/services/currency/context";
import brandLanguages from "../fixtures/brandLanguages";
import brands from "../fixtures/brands";
import continents from "../fixtures/continents";
import countries from "../fixtures/countries";
import languages from "../fixtures/languages";
import translations from "../fixtures/translations";
import { getBrandTheme } from "../../src/records/Theme";

const GROUP_ID = "Context";

addDecorator(withKnobs);

const withData = (storyFn: () => React.Node) => {
  const brandId = select("Brand", Object.keys(brands), "kiwicom", GROUP_ID);
  const localeId = select("Locale", Object.keys(languages), "en", GROUP_ID);

  return (
    <BrandProvider value={brands[brandId]}>
      {/* $FlowExpected - ThemeProvider has bad typedefs */}
      <ThemeProvider theme={getBrandTheme(brands[brandId])}>
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
              {storyFn()}
            </CurrencyProvider>
          </FetchedProvider>
        </IntlProvider>
      </ThemeProvider>
    </BrandProvider>
  );
};

export default withData;
