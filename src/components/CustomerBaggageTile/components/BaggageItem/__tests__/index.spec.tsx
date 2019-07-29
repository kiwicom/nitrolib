import * as React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme";

import BaggageItem from "..";

const props = {
  category: "cabinBag",
  amount: 2,
  restrictions: {
    weight: 5,
    height: 20,
    width: 20,
    length: 20,
    dimensionsSum: null,
  },
  orderStatus: "unpaid",
};

describe("#BaggageItem", () => {
  test("renders category icon", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggageItem {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("BaggageCabin").exists()).toBe(true);
  });
  test("renders baggage restrictions", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggageItem {...props} />
      </ThemeProvider>,
    );
    expect(
      wrapper
        .find("BaggageItem__BaggageRestrictions")
        .first()
        .text(),
    ).toBe("20 × 20 × 20 cm, 5 kg");
  });
});
