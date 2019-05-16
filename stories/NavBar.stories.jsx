// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs/react";

import NavBar from "../src/components/NavBar";
import HeaderLinks from "../src/components/HeaderLinks";
import ModalsAuth from "../src/components/ModalsAuth";
import withData from "./decorators/withData";

const props = {
  languageId: "de",
  currencyId: "GBP",
  searchForm: {
    mode: "oneWay",
    destination: {
      type: "2",
      name: "Warsaw",
    },
    checkIn: new Date(),
    checkOut: null,
    adults: 1,
    children: 0,
  },
  splitster: {
    HEADER_LINKS_ROOMS_PROVIDER_0: "roomsKiwiCode",
  },
};

storiesOf("NavBar", module)
  .addDecorator(withData, withKnobs)
  .add("default", () => (
    <>
      <ModalsAuth portal="" />
      <NavBar
        starred={<h1>Starred</h1>}
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
    </>
  ))
  .add("inverted", () => (
    <>
      <ModalsAuth portal="" />
      <NavBar
        starred={<h1>Starred</h1>}
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
  ));
