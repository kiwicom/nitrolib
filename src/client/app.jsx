/* @flow */
/* eslint-disable no-underscore-dangle */
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Root from "./scenes/Root";
import * as intlContext from "./services/intl/context";
import * as brandContext from "./services/brand/context";

const app = document.getElementById("react");

if (app) {
  hydrate(
    <BrowserRouter>
      <ThemeProvider theme={window.__BRAND__.theme}>
        <brandContext.Provider value={window.__BRAND__}>
          <intlContext.Provider value={window.__INTL__}>
            <Root />
          </intlContext.Provider>
        </brandContext.Provider>
      </ThemeProvider>
    </BrowserRouter>,
    app,
  );
}

// Hot reload
// ---

/* eslint-disable no-undef */
if (module.hot) {
  module.hot.accept();
}
