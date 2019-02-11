// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";

import TravelArrangement from "../src/components/TravelArrangement";

const props = {
  data: {
    takeOff: {
      from: "Prague, Czech Republic",
      to: "Denpasar, Bali",
      stops: "0",
      note: "Transfer to hotel NOT included",
    },
    landing: {
      from: "Denpasar, Bali",
      to: "Prague, Czech Republic",
      stops: "2",
      note: "Transfer to hotel NOT included",
    },
  },
  columnLayout: false,
};

storiesOf("TravelArrangement", module).add("default", () => <TravelArrangement {...props} />);
