// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import withData from "./decorators/withData";
import BaggageOverview from "../src/components/BaggageOverview";
import Container from "../src/components/BaggageOverview/components/Container";
import { baggageData } from "../src/records/__mocks__/baggageData";

const passengers = [
  {
    paxId: 1,
    firstName: "Barrack",
    middleName: "Hussein",
    lastName: "Obama",
    baggage: {
      holdBag: 1,
      handBag: 2,
    },
  },
  {
    paxId: 2,
    firstName: "Donald",
    middleName: "John",
    lastName: "Trump",
    baggage: {
      holdBag: 1,
      handBag: 3,
    },
  },
  {
    paxId: 3,
    firstName: "George",
    lastName: "Bush",
    baggage: {
      holdBag: 0,
      handBag: 1,
    },
  },
];

const definitions = [
  {
    id: 1,
    conditions: {
      passengerGroups: ["adult"],
    },
    price: {
      currency: "EUR",
      amount: 0,
      base: 0,
      merchant: null,
      service: 0,
      serviceFlat: 0,
    },
    category: "cabinBag",
    restrictions: {
      weight: 5,
      height: 20,
      width: 20,
      length: 20,
      dimensionsSum: null,
    },
  },
  {
    id: 1,
    conditions: {
      passengerGroups: ["adult"],
    },
    price: {
      currency: "EUR",
      amount: 0,
      base: 0,
      merchant: null,
      service: 0,
      serviceFlat: 0,
    },
    category: "cabinBag",
    restrictions: {
      weight: 5,
      height: 20,
      width: 20,
      length: 20,
      dimensionsSum: null,
    },
  },
  {
    id: 2,
    conditions: {
      passengerGroups: ["adult"],
    },
    price: {
      currency: "EUR",
      amount: 10,
      base: 0,
      merchant: null,
      service: 0,
      serviceFlat: 0,
    },
    category: "holdBag",
    restrictions: {
      weight: 10,
      height: 52,
      width: 26,
      length: 78,
      dimensionsSum: 156,
    },
  },
];

const propsWithCombinations = {
  passengers,
  baggage: baggageData,
  context: "booking",
};

const propsWithDefinitions = {
  definitions,
  FAQLinksHandler: category => console.log("clicked on", category), // eslint-disable-line
  context: "MMB-PassengerCard",
};

storiesOf("BaggageOverview", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("with all passengers and their info", () => (
    <div style={{ padding: "24px" }}>
      <Container {...propsWithCombinations}>{props => <BaggageOverview {...props} />}</Container>
    </div>
  ))
  .add("with all passengers and support links", () => (
    <div style={{ padding: "24px" }}>
      <BaggageOverview {...propsWithDefinitions} />
    </div>
  ))
  .add("with context MMB-PassengersSummary", () => (
    <div style={{ padding: "24px" }}>
      <BaggageOverview {...propsWithDefinitions} context="MMB-PassengersSummary" />
    </div>
  ));
