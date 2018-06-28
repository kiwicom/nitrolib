// @flow strict
/* eslint-disable no-underscore-dangle */
import * as React from "react";
import * as R from "ramda";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Root from "./scenes/Root";
import translate from "./public/services/intl/translate";
import getIP from "./services/session/getIP";
import * as io from "./services/session/io";
import * as intlContext from "./public/services/intl/context";
import * as brandContext from "./public/services/brand/context";
import * as fetchedContext from "./public/services/fetched/context";
import * as sessionContext from "./services/session/context";
import * as currencyContext from "./public/services/currency/context";
import type { Intl } from "./public/records/Intl";
import type { Session } from "./public/components/records/Session";

const app = document.getElementById("react");

const intl: Intl = {
  language: window.__INTL__.language,
  translations: window.__INTL__.translations,
  translate: R.partial(translate, [window.__INTL__.translations]),
};

const session: Session = {
  affiliate: io.getAffiliate(window.location.search),
  userId: "", // TODO out of the scope of this MR, add in another one
  sessionId: "", // TODO out of the scope of this MR, add in another one
};

if (app) {
  hydrate(
    // $FlowIssue: outdated Flow definitions
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={window.__BRAND__.theme}>
          <brandContext.Provider value={window.__BRAND__}>
            <intlContext.Provider value={intl}>
              <fetchedContext.Provider value={window.__FETCHED__}>
                <sessionContext.Provider value={session}>
                  <currencyContext.Provider
                    whitelist={window.__BRAND__.payments.whitelisted_currencies}
                    countries={window.__FETCHED__.countries}
                    affiliate={session.affiliate}
                    ip={getIP(window.location.search)}
                    initialCurrency={io.getCurrency(window.location.search)}
                    langCurrency={intl.language.currency}
                  >
                    <Root />
                  </currencyContext.Provider>
                </sessionContext.Provider>
              </fetchedContext.Provider>
            </intlContext.Provider>
          </brandContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>,
    app,
  );
}
