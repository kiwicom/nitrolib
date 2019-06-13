// @flow strict
import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import GenderMan from "@kiwicom/orbit-components/lib/icons/GenderMan";

import withData from "./decorators/withData";
import CustomerBaggageTile from "../src/components/CustomerBaggageTile";
import { baggageData } from "../src/records/__mocks__/baggageData";

const props = {
  firstName: "Oliver",
  lastName: "Dlouhy",
  icon: <GenderMan />,
  isProcessing: false,
  current: { handBag: 1, holdBag: 1 },
  selected: { handBag: 3, holdBag: 4 },
  onClick: () => {},
  supportLinkHandler: () => {},
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
      merchant: 0,
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
      merchant: 0,
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
  > div {
    margin-bottom: 24px;
  }
`;

storiesOf("CustomerBaggageTile", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("all statuses", () => (
    <Wrapper>
      <CustomerBaggageTile {...props} />
      <CustomerBaggageTile {...props} isProcessing />
      <CustomerBaggageTile
        {...props}
        current={undefined}
        selected={undefined}
        newDefinitions={exampleDefinitions}
      />
      <CustomerBaggageTile
        {...props}
        current={{ handBag: 3, holdBag: 3 }}
        selected={{ handBag: 3, holdBag: 3 }}
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
      <span> test</span>
      <CustomerBaggageTile
        {...props}
        current={{ handBag: 0, holdBag: 2 }}
        selected={{ handBag: 0, holdBag: 2 }}
      />
    </Wrapper>
  ))
  .add("empty", () => (
    <Wrapper>
      <span> test</span>
      <CustomerBaggageTile
        {...props}
        current={{ handBag: 0, holdBag: 0 }}
        selected={{ handBag: 0, holdBag: 0 }}
      />
    </Wrapper>
  ));
