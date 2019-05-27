// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme";

import OptionItem from "../index";

const props = {
  amount: 1,
  restrictions: {
    dimensionsSum: 156,
    height: 52,
    length: 78,
    weight: 25,
    width: 26,
  },
  isFirstItem: true,
  price: {
    amount: 10,
    currency: "EUR",
    base: 0,
    merchant: 0,
    service: 0,
    serviceFlat: 0,
  },
  category: "cabinBag",
  isCurrentCombination: false,
};

describe("#OptionItem", () => {
  test("render ", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <OptionItem {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("Stack").exists()).toBe(true);
  });

  test("renders current info", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <OptionItem {...props} isCurrentCombination />
      </ThemeProvider>,
    );
    expect(wrapper.find('[data-test="BaggagePicker-OptionItem-cabinBag"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="BaggagePicker-OptionItem-Current"]').text()).toEqual(
      "baggage_modal.select.current",
    );
  });

  test("renders price", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <OptionItem {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find('[data-test="BaggagePicker-OptionItem-Price"]').text()).toEqual("10 €");
  });
});
