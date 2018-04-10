// @flow
/* eslint-disable no-underscore-dangle */
import React from "react";
import * as R from "ramda";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Root from "./scenes/Root";
import translate from "./services/intl/translate";
import * as intlContext from "./services/intl/context";
import * as brandContext from "./services/brand/context";
import type { Intl } from "./records/Intl";

const app = document.getElementById("react");

const intl: Intl = {
  language: window.__INTL__.language,
  translate: R.partial(translate, [window.__INTL__.translations]),
};

if (app) {
  hydrate(
    <BrowserRouter>
      <ThemeProvider theme={window.__BRAND__.theme}>
        <brandContext.Provider value={window.__BRAND__}>
          <intlContext.Provider value={intl}>
            <Root />
          </intlContext.Provider>
        </brandContext.Provider>
      </ThemeProvider>
    </BrowserRouter>,
    app,
  );
}
