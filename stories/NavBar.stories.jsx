// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs/react";
import cookie from "js-cookie";

import { Provider as AuthProvider } from "../src/services/auth/context";
import { UA_SESSION_TOKEN } from "../src/consts/cookies";
import NavBar from "../src/components/NavBar";
import HeaderLinks from "../src/components/HeaderLinks";
import ModalsAuth from "../src/components/ModalsAuth";
import withData from "./decorators/withData";

const props = {
  languageId: "en",
  currencyId: "GBP",
  searchForm: {
    mode: "oneWay",
    destination: {
      type: "2",
      name: "London",
      slug: "london_gb",
    },
    checkIn: new Date(),
    checkOut: null,
    adults: 1,
    children: 0,
  },
  splitster: {
    HEADER_LINKS_ROOMS_PROVIDER_0: "roomsKiwiLocal",
  },
  context: "kiwicom",
};

storiesOf("NavBar", module)
  .addDecorator(withData, withKnobs)
  .add("default", () => (
    <>
      <ModalsAuth portal="" />
      <NavBar
        starred={<p>Starred</p>}
        headerLinks={<HeaderLinks {...props} />}
        subscription={<h1>Subscription</h1>}
        debug={<h1>Debug</h1>}
        portal=""
        onOpenFaq={action("Open FAQ")}
        onLogoClick={action("Click logo")}
        onSetModal={action("Set modal")}
        onSaveLanguage={action("Save language")}
        onSelectTrip={action("Select trip")}
      />
    </>
  ))
  .add("signed-in", () => (
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
            photo: "https://placeimg.com/128/128/people",
            affiliateId: "",
            cardDiscount: 4,
            balanceDiscount: 4,
            balances: [{ amount: 4, currency: "EUR" }],
          },
        },
        loading: false,
        onMyBooking: () => Promise.resolve(),
        onRegister: () => Promise.resolve(),
        onSocialAuth: () => Promise.resolve(),
        onSignIn: () => Promise.resolve(),
        onSignOut: () => {},
      }}
    >
      <ModalsAuth portal="" />
      <NavBar
        starred={<p>Starred</p>}
        headerLinks={<HeaderLinks {...props} inverted={false} />}
        subscription={<h1>Subscription</h1>}
        debug={<h1>Debug</h1>}
        portal=""
        onOpenFaq={action("Open FAQ")}
        onSetModal={action("Set modal")}
        onLogoClick={action("Click logo")}
        onSaveLanguage={action("Save language")}
        onSelectTrip={action("Select trip")}
      />
    </AuthProvider>
  ))
  .add("inverted", () => (
    <>
      <ModalsAuth portal="" />
      <NavBar
        starred={<p>Starred</p>}
        headerLinks={<HeaderLinks {...props} inverted />}
        subscription={<h1>Subscription</h1>}
        debug={<h1>Debug</h1>}
        inverted
        portal=""
        onOpenFaq={action("Open FAQ")}
        onLogoClick={action("Click logo")}
        onSetModal={action("Set modal")}
        onSaveLanguage={action("Save language")}
        onSelectTrip={action("Select trip")}
      />
    </>
  ))
  .add("new design", () => (
    <>
      <ModalsAuth portal="" />
      <NavBar
        starred={<p>Starred</p>}
        headerLinks={<HeaderLinks {...props} newDesign />}
        subscription={<h1>Subscription</h1>}
        debug={<h1>Debug</h1>}
        portal=""
        newDesign
        onOpenFaq={action("Open FAQ")}
        onLogoClick={action("Click logo")}
        onSetModal={action("Set modal")}
        onSaveLanguage={action("Save language")}
        onSelectTrip={action("Select trip")}
      />
    </>
  ));
