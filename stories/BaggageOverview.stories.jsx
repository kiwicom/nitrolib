// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import withData from "./decorators/withData";
import BaggageOverview from "../src/components/BaggageOverview";
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
  {
    id: 3,
    firstName: "George",
    lastName: "Bush",
    baggage: {
      holdBag: 0,
      handBag: 1,
    },
  },
];

const props = {
  passengers,
  baggage: baggageData,
  currentPassengerId: undefined,
};

storiesOf("BaggageOverview", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("with all passengers and their info", () => (
    <div style={{ padding: "24px" }}>
      <BaggageOverview {...props} />
    </div>
  ))
  .add("with all passengers and support links", () => (
    <div style={{ padding: "24px" }}>
      <BaggageOverview
        {...props}
        supportLinks={{
          holdBag: "/support/hold-bag",
          personalItem: "support/personal-item",
          cabinBag: "/support/cabin-bag",
        }}
      />
    </div>
  ))
  .add("with one passenger data", () => (
    <div style={{ padding: "24px" }}>
      <BaggageOverview {...props} currentPassengerId={1} />
    </div>
  ))
  .add("without personal item", () => (
    <div style={{ padding: "24px" }}>
      <BaggageOverview
        {...props}
        passengers={[
          {
            id: 1,
            firstName: "Bill",
            lastName: "Clinton",
            baggage: {
              holdBag: 3,
              handBag: 1,
            },
          },
        ]}
      />
    </div>
  ));
