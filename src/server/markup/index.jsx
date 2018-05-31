// @flow strict
import * as React from "react";
// $FlowIssue
import { renderToString, renderToStaticNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components";
import * as R from "ramda";

import Root from "client/scenes/Root";
import * as intlContext from "client/services/intl/context";
import * as brandContext from "client/services/brand/context";
import * as fetchedContext from "client/services/fetched/context";
import * as currencyContext from "client/services/currency/context";
import Html from "./Html";
import { assets } from "../config";
import * as data from "../dataFiles";

function markup(url: string, brandId: string, localeId: string) {
  const brand = data.brands[brandId];
  const intl = data.intls[localeId];
  const fetched = {
    countries: data.countries,
    continents: data.continents,
    brandLanguage: data.brandLanguages[brandId][localeId],
  };
  const currencies = R.pick(brand.payments.whitelisted_currencies, data.currencies);

  // $FlowIssue: We have a better type than 'mixed'
  const providedTheme: { [key: string]: mixed } = brand.theme;

  const sheet = new ServerStyleSheet();
  const context = {};
  const root = renderToString(
    <StaticRouter location={url} context={context}>
      <StyleSheetManager sheet={sheet.instance}>
        <ThemeProvider theme={providedTheme}>
          <brandContext.Provider value={brand}>
            <intlContext.Provider value={intl}>
              <fetchedContext.Provider value={fetched}>
                <currencyContext.Provider
                  all={currencies}
                  fromLanguage={intl.language.currency}
                  countries={fetched.countries}
                >
                  <Root />
                </currencyContext.Provider>
              </fetchedContext.Provider>
            </intlContext.Provider>
          </brandContext.Provider>
        </ThemeProvider>
      </StyleSheetManager>
    </StaticRouter>,
  );

  return renderToStaticNodeStream(
    <Html
      root={root}
      css={sheet.getStyleElement()}
      assets={assets}
      brand={brand}
      intl={intl}
      fetched={fetched}
      currencies={currencies}
    />,
  );
}

export default markup;
