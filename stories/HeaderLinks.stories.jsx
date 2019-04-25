// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs/react";

import HeaderLinks from "../src/components/HeaderLinks";
import withData from "./decorators/withData";

const GROUP_ID = "UI";

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

storiesOf("HeaderLinks", module)
  .addDecorator(withData, withKnobs)
  .add("default", () => (
    <HeaderLinks
      {...props}
      active={text("Active", "travel", GROUP_ID)} // TODO make this a select
      inverted={boolean("Inverted", false, GROUP_ID)}
    />
  ));
