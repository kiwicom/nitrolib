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

  const brand = brands[brandId];
  const language = languages[localeId];

  const html = document.querySelector("html");
  if (html) {
    html.setAttribute("dir", language.direction);
  }

  return (
    <BrandProvider value={brand}>
      {/* $FlowExpected - ThemeProvider has bad typedefs */}
      <ThemeProvider theme={getBrandTheme(brand, language.direction === "rtl")}>
        <IntlProvider language={language} translations={translations[language.phraseApp]}>
          <FetchedProvider
            value={{
              countries,
              continents,
              brandLanguage: brandLanguages[brandId][localeId],
            }}
          >
            <CurrencyProvider
              whitelist={brand.payments.whitelisted_currencies}
              countries={countries}
              affiliate=""
              ip="1.3.3.7"
              initialCurrency="EUR"
              langCurrency={language.currency}
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
