// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import withData from "./decorators/withData";
import BaggageSummary from "../src/components/BaggageSummary";
import { baggageData } from "../src/components/BaggagePicker/services/data";

const passengers = [
  {
    id: 1,
    firstName: "Barrack",
    lastName: "Obama",
    baggage: {
      holdBag: 1,
      handBag: 2,
    },
  },
  {
    id: 2,
    firstName: "Donald",
    lastName: "Trump",
    baggage: {
      holdBag: 1,
      handBag: 3,
    },
  },
];

const props = {
  passengers,
  baggage: baggageData,
};

storiesOf("BaggageSummary", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("default", () => (
    <div style={{ padding: "24px" }}>
      <BaggageSummary {...props} />
    </div>
  ));
