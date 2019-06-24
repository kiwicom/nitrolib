// @flow strict
import * as React from "react";
import { ThemeProvider } from "styled-components";
import { addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs/react";
import cookie from "js-cookie";

import { UA_SESSION_TOKEN } from "../../src/consts/cookies";
import { makeCall, makeEnvironment } from "../../src/services/utils/relay";
import { Provider as BrandProvider } from "../../src/services/brand/context";
import { Provider as IntlProvider } from "../../src/services/intl/context";
import { Provider as FetchedProvider } from "../../src/services/fetched/context";
import { Provider as CurrencyProvider } from "../../src/services/currency/context";
import { Provider as ModalProvider } from "../../src/services/modal/context";
import { Provider as StarredProvider } from "../../src/services/starred/context";
import { Provider as AuthProvider } from "../../src/services/auth/context";
import InitIntl from "../../src/components/InitIntl";
import InitCurrency from "../../src/components/InitCurrency";
import brandLanguages from "../fixtures/brandLanguages";
import brands from "../fixtures/brands";
import airlines from "../fixtures/airlines";
import continents from "../fixtures/continents";
import countries from "../fixtures/countries";
import languages from "../fixtures/languages";
import translations from "../fixtures/translations";
import { getBrandTheme } from "../../src/records/Theme";
import InitStarred from "../../src/components/InitStarred";
import starredList from "../fixtures/starred";

const GROUP_ID = "Context";

addDecorator(withKnobs);

const LOCALES = {
  cs: () => import("date-fns/locale/cs"),
  enUS: () => import("date-fns/locale/en-US"),
  ru: () => import("date-fns/locale/ru"),
  ja: () => import("date-fns/locale/ja"),
};

const CURRENCIES = [
  "aed",
  "amd",
  "ars",
  "aud",
  "bhd",
  "byn",
  "cad",
  "chf",
  "clp",
  "cny",
  "czk",
  "dkk",
  "eur",
  "gbp",
  "hkd",
  "huf",
  "idr",
  "ils",
  "inr",
  "isk",
  "jod",
  "jpy",
  "kgs",
  "krw",
  "kwd",
  "kzt",
  "mxn",
  "myr",
  "nok",
  "nzd",
  "omr",
  "pen",
  "php",
  "pln",
  "qar",
  "ron",
  "rsd",
  "rub",
  "sar",
  "sek",
  "sgd",
  "thb",
  "try",
  "twd",
  "usd",
  "uzs",
  "yer",
  "zar",
];

const MODALS = [
  "",
  "myBooking",
  "register",
  "signIn",
  "forgotPassword",
  "sideNav",
  "chat",
  "subscription",
  "debug",
  "currencyMenu",
  "languageMenu",
];

const localeFn = (ID: string) => LOCALES[ID] || LOCALES.enUS; // Fallback to 'en-US'

const withData = (storyFn: () => React.Node) => {
  const brandId = select("Brand", Object.keys(brands), "kiwicom", GROUP_ID);
  const localeId = select("Locale", Object.keys(languages), "en", GROUP_ID);
  const currencyId = select("Currency", CURRENCIES, "eur", GROUP_ID);
  const modal = select("Modal", MODALS, "", GROUP_ID);

  const brand = brands[brandId];
  const language = languages[localeId];

  const html = document.querySelector("html");
  if (html) {
    html.setAttribute("dir", language.direction);
  }

  const intlRaw = {
    language,
    translations: translations[language.phraseApp],
  };

  const fetched = {
    airlines,
    countries,
    continents,
    brandLanguage: brandLanguages[brandId][localeId],
  };

  return (
    <BrandProvider value={brand}>
      {/* $FlowExpected: ThemeProvider has bad typedefs */}
      <ThemeProvider theme={getBrandTheme(brand, language.direction === "rtl")}>
        <AuthProvider
          value={{
            auth: {
              type: "user",
              token: cookie.get(UA_SESSION_TOKEN) || "",
              user: {
                id: "ujy9jXLZufUW7g7sbFbdhq",
                email: "ellie@kiwi.com",
                verified: true,
                firstname: "Ellie",
                lastname: "Palo",
                affiliateId: "",
                cardDiscount: 4,
                balanceDiscount: 4,
                balances: [{ amount: "4", currency: "EUR" }],
              },
            },
            loading: false,
            environment: makeEnvironment(
              makeCall({
                Authorization: cookie.get(UA_SESSION_TOKEN) || "",
              }),
            ),
            onMyBooking: () => Promise.resolve(),
            onRegister: () => Promise.resolve(),
            onSocialAuth: () => Promise.resolve(),
            onSignIn: () => Promise.resolve(),
            onSignOut: () => {},
          }}
        >
          <InitIntl raw={intlRaw} getLocale={localeFn(localeId)()}>
            {intl => (
              <IntlProvider value={intl}>
                <FetchedProvider value={fetched}>
                  <InitCurrency
                    brand={brand}
                    countries={countries}
                    affiliate=""
                    ip="1.3.3.7"
                    initialCurrency="eur"
                    langCurrency={language.currency}
                    onChange={action("Save currency")}
                  >
                    {currency => (
                      <CurrencyProvider
                        value={{
                          ...currency,
                          currency: currency.available[currencyId] || currency.currency,
                        }}
                      >
                        <InitStarred>
                          {starredInit => (
                            <StarredProvider
                              value={{
                                ...starredInit,
                                list: starredList,
                                // Passes from FE
                                renderShareDialog: () => console.log("shareDialog") || null,
                                onGoToStarred: () => console.log("nitro"),
                                isMobile: false,
                                lang: intl.language.id,
                                // Passes from FE
                                onSetNotice: () => console.log("notice"),
                                // Passes from FE
                                makeShareUrl: () => console.log("shareUrl") || "",
                              }}
                            >
                              <ModalProvider value={{ value: modal, onChange: action("Modal") }}>
                                {storyFn()}
                              </ModalProvider>
                            </StarredProvider>
                          )}
                        </InitStarred>
                      </CurrencyProvider>
                    )}
                  </InitCurrency>
                </FetchedProvider>
              </IntlProvider>
            )}
          </InitIntl>
        </AuthProvider>
      </ThemeProvider>
    </BrandProvider>
  );
};

export default withData;
