// @flow
import * as React from "react";
// $FlowIssue
import { renderToString, renderToStaticNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components";

import Root from "client/scenes/Root";
import * as intlContext from "client/services/intl/context";
import * as brandContext from "client/services/brand/context";
import Html from "./Html";
import { assets } from "../config";
import { brands, intls } from "../dataFiles";

function markup(url: string, brandId: string, localeId: string) {
  const brand = brands[brandId];
  const intl = intls[localeId];

  const sheet = new ServerStyleSheet();
  const context = {};
  const root = renderToString(
    <StaticRouter location={url} context={context}>
      <StyleSheetManager sheet={sheet.instance}>
        <ThemeProvider theme={brand.theme}>
          <brandContext.Provider value={brand}>
            <intlContext.Provider value={intl}>
              <Root />
            </intlContext.Provider>
          </brandContext.Provider>
        </ThemeProvider>
      </StyleSheetManager>
    </StaticRouter>,
  );

  return renderToStaticNodeStream(
    <Html root={root} css={sheet.getStyleElement()} assets={assets} brand={brand} intl={intl} />,
  );
}

export default markup;
