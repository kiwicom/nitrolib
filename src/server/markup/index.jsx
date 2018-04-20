// @flow strict
import * as React from "react";
import * as R from "ramda";
// $FlowIssue
import { renderToString, renderToStaticNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components";

import Root from "client/scenes/Root";
import * as intlContext from "client/services/intl/context";
import * as brandContext from "client/services/brand/context";
import * as fetchedContext from "client/services/fetched/context";
import { tKeys } from "client/records/Continents";
import Html from "./Html";
import { assets } from "../config";
import * as data from "../dataFiles";

const continentToTranslatedName = (continent: string): {| id: string, translatedName: string |} => {
  const translatedName = tKeys[continent];
  return { id: continent, translatedName };
};

const translateAndSortContinents = brandLanguage =>
  R.assoc(
    "continents",
    R.sortBy(R.prop("translatedName"), brandLanguage.continents.map(continentToTranslatedName)),
    brandLanguage,
  );

function markup(url: string, brandId: string, localeId: string) {
  const brand = data.brands[brandId];
  const intl = data.intls[localeId];
  const fetched = {
    countries: data.countries,
    continents: data.continents,
    languagesData: translateAndSortContinents(data.brandLanguages[brandId]),
  };

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
                <Root />
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
    />,
  );
}

export default markup;
