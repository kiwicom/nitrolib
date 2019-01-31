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
  lastName: "Dlouhy",
  gender: "male",
  currentBaggage: { handBag: 3, holdBag: 4 },
  baggage: baggageData,
  onClick: () => console.log("clicked"), // eslint-disable-line
  orderStatus: "unpaid",
};

const Wrapper = styled.div`
  padding: 25px;
  > * {
    margin-bottom: 74px;
  }
`;

storiesOf("CustomerBaggageTile", module)
  .addDecorator(withData)
  .addDecorator(withKnobs)
  .add("all statuses", () => (
    <Wrapper>
      <CustomerBaggageTile {...props} />
      <CustomerBaggageTile {...props} orderStatus="processing" />
      <CustomerBaggageTile {...props} orderStatus="notAvailable" />
    </Wrapper>
  ))
  .add("without personal item", () => (
    <Wrapper>
      <CustomerBaggageTile {...props} currentBaggage={{ handBag: 1, holdBag: 2 }} />
    </Wrapper>
  ));
