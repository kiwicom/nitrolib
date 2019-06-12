// @flow strict
import * as React from "react";
import { ThemeProvider } from "styled-components";
import { mount } from "enzyme";
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme";

import BaggageItem from "..";

const passengers = [
  {
    paxId: 1,
    firstName: "Barrack",
    middleName: "Hussein",
    lastName: "Obama",
  },
  {
    paxId: 2,
    firstName: "Donald",
    middleName: "John",
    lastName: "Trump",
  },
  {
    paxId: 3,
    firstName: "George",
    lastName: "Bush",
  },
];

const props = {
  restrictions: {
    weight: 15,
    height: 30,
    width: 60,
    length: 30,
    dimensionsSum: null,
  },
  category: "holdBag",
  context: "booking",
  amount: 2,
};

describe("#BaggageItem", () => {
  test("renders ", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggageItem {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("[data-test='BaggageOverview-BaggageItem-holdBag']").exists()).toBe(true);
  });
  test("renders with passengers names", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggageItem {...props} passengers={passengers} />
      </ThemeProvider>,
    );
    const PassengersText = wrapper.find("[data-test='BaggageOverview-BaggageItem-Passengers']");
    expect(PassengersText.exists()).toBe(true);
    expect(PassengersText.text()).toBe("B. H. Obama, D. J. Trump, G. Bush");
  });
});
