// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import HeaderLinks from "../src/components/HeaderLinks";
import withData from "./decorators/withData";

const props = {
  inverted: false,
  searchString: "Suche",
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
    HEADER_LINKS_PACKAGE_PROVIDER_0: "__disabled_user_group",
    HEADER_LINKS_PACKAGE_PROVIDER_LASTMINUTE_0: "show",
    HEADER_LINKS_ROOMS_PROVIDER_0: "roomsKiwiCode",
  },
};

storiesOf("HeaderLinks", module)
  .addDecorator(withData)
  .add("default", () => <HeaderLinks {...props} />);
