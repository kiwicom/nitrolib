// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme";

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
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <Container {...propsWithCombinations}>{props => <BaggageOverview {...props} />}</Container>
      </ThemeProvider>,
    );
    expect(wrapper.find("BaggageOverview").exists()).toBe(true);
    const PassengersText = wrapper.find("[data-test='BaggageOverview-BaggageItem-Passengers']");
    expect(PassengersText.exists()).toBe(true);
    expect(PassengersText.first().text()).toBe("D. J. Trump, G. Bush");
  });
});
