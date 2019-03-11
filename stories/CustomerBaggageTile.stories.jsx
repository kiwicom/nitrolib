// @flow strict
import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import withData from "./decorators/withData";
import CustomerBaggageTile from "../src/components/CustomerBaggageTile";
import baggageData from "../src/components/CustomerBaggageTile/services/data";

const props = {
  firstName: "Oliver",
  middleName: undefined,
  lastName: "Dlouhy",
  gender: "male",
  dayOfBirth: undefined,
  isProcessing: false,
  current: { handBag: 1, holdBag: 1 },
  selected: { handBag: 3, holdBag: 4 },
  definitions: undefined,
  onClick: () => console.log("clicked"), // eslint-disable-line
  baggage: baggageData,
};

const exampleDefinitions = [
  {
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
    category: "personalItem",
    restrictions: {
      weight: 5,
      height: 20,
      width: 20,
      length: 20,
      dimensionsSum: null,
    },
  },
  {
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

const Wrapper = styled.div`
  padding: 5px;
  > * {
    margin-bottom: 24px;
  }
`;

storiesOf("CustomerBaggageTile", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("all statuses", () => (
    <Wrapper>
      <CustomerBaggageTile {...props} />
      <CustomerBaggageTile {...props} onClick={undefined} isProcessing />
      <CustomerBaggageTile
        {...props}
        current={undefined}
        selected={undefined}
        onClick={undefined}
        definitions={exampleDefinitions}
      />
    </Wrapper>
  ))
  .add("with middle name and DOB", () => (
    <Wrapper>
      <CustomerBaggageTile {...props} dayOfBirth="10-05-1983" middleName="Olix" />
    </Wrapper>
  ))
  .add("without personal item", () => (
    <Wrapper>
      <CustomerBaggageTile {...props} currentBaggage={{ handBag: 1, holdBag: 2 }} />
    </Wrapper>
  ));
