// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { baggageData } from "../../../../../records/__mocks__/baggageData";
import BaggageOverview from "../../..";

import Container from "..";

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

const propsWithCombinations = {
  passengers,
  baggage: baggageData,
  context: "booking",
};

describe("#Container", () => {
  test("renders", () => {
    const wrapper = shallow(
      <Container {...propsWithCombinations}>{props => <BaggageOverview {...props} />}</Container>,
    );

    expect(wrapper.find("BaggageOverview").exists()).toBe(true);
  });
});
