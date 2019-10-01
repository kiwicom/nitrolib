// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select } from "@storybook/addon-knobs/react";

import HeaderLinks from "../src/components/HeaderLinks";
import withData from "./decorators/withData";

const GROUP_ID = "UI";

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

const LOCALES = {
  en: "English",
  de: "German",
  it: "Italian",
};

const CURRENCIES = {
  usd: "US dollar",
  eur: "Euro",
  czk: "Czech koruna",
};

const LINKS = {
  travel: "travel",
  rooms: "rooms",
  cars: "cars",
};

storiesOf("HeaderLinks", module)
  .addDecorator(withData, withKnobs)
  .add("default", () => (
    <HeaderLinks
      {...props}
      languageId={select("Locale", LOCALES, "en", GROUP_ID)}
      currencyId={select("Currency", CURRENCIES, "eur", GROUP_ID)}
      active={select("Active", LINKS, "travel", GROUP_ID)}
    />
  ));
