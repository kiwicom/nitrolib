import * as React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme";

import { baggageData } from "../../../records/__mocks__/baggageData";
import Container from "../components/Container";

import BaggageOverview from "..";

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
    index: 0,
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
    index: 0,
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
    index: 2,
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

const propsWithCombinations = {
  passengers,
  baggage: baggageData,
  context: "booking",
};

const propsWithDefinitions = {
  definitions,
  FAQLinksHandler: category => category,
  context: "MMB-PassengerCard",
};

describe("#BaggageOverview", () => {
  test("render component using propsWithDefinitions", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggageOverview {...propsWithDefinitions} />
      </ThemeProvider>,
    );
    expect(wrapper.find("[data-test='BaggageOverview-MMB-PassengerCard']").exists()).toBe(true);
  });
  test("render component using propsWithCombinations", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <>
          <Container {...propsWithCombinations}>
            {props => <BaggageOverview {...props} />}
          </Container>
          ,
        </>
      </ThemeProvider>,
    );
    expect(wrapper.find("[data-test='BaggageOverview-booking']").exists()).toBe(true);
  });
});
