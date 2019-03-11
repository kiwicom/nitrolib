// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import { baggageData } from "../../BaggagePicker/services/data";
import BaggageOverview from "../index";
import Container from "../components/Container";

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
    middleName: undefined,
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
  currentPaxId: undefined,
  FAQLinksHandler: category => console.log("clicked on", category), // eslint-disable-line
  context: "MMB-PassengerCard",
};

describe("#BaggageOverview", () => {
  test("render component using propsWithDefinitions", () => {
    const wrapper = mount(<BaggageOverview {...propsWithDefinitions} />);
    expect(wrapper.find("BaggageOverview__Wrapper").exists()).toBe(true);
  });
  test("render component using propsWithCombinations", () => {
    const wrapper = mount(
      <Container {...propsWithCombinations}>{props => <BaggageOverview {...props} />}</Container>,
    );
    expect(wrapper.find("BaggageOverview__Wrapper").exists()).toBe(true);
  });
});
