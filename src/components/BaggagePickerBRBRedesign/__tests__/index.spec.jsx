// @flow strict
import * as React from "react";
import R from "ramda";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme";

import { baggageData } from "../../../records/__mocks__/baggageData";
// $FlowExpected: JSON file without types
import airlines from "../../../../stories/fixtures/airlines.json";

import BaggagePickerBRBRedesign from "..";

const props = {
  passengerCategory: "adult",
  changeBagCombination: () => {},
  baggage: baggageData,
  airlines,
  context: "booking",
  pickerType: "handBag",
  shouldShowRecheckNote: false,
  passengerBaggage: {
    handBag: 0,
    holdBag: 0,
  },
  prioBoardingLinkHandler: () => {},
  shouldShowAddBlueRibbonBag: true,
  blueRibbonBagPrice: {
    amount: 4.99,
    base: 4.99,
    service: 0,
    serviceFlat: 0,
    merchant: 0,
    currency: "EUR",
  },
  isBlueRibbonBagAdded: false,
  addBlueRibbonBag: () => {},
  removeBlueRibbonBag: () => {},
  openBlueribbonBagsSmartFAQ: () => {},
};

const baggageDataCopy = R.mergeDeepRight({}, baggageData);
baggageDataCopy.combinations = {
  handBag: [baggageData.combinations.handBag[2]],
  holdBag: [baggageData.combinations.holdBag[2]],
};

describe("#BaggagePickerBRBRedesign", () => {
  test("renders", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggagePickerBRBRedesign {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("BaggagePickerBRBRedesign").exists()).toBe(true);
    expect(wrapper.find("[data-test='BaggagePickerBRBRedesign-handBag']").exists()).toBe(true);
    expect(wrapper.find("[data-test='BaggagePickerBRBRedesign-holdBag']").exists()).toBe(false);
  });

  test("renders show more button", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggagePickerBRBRedesign {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("BaggagePickerBRBRedesign").exists()).toBe(true);
    expect(wrapper.find("[data-test='BaggagePickerBRBRedesign-Option-0']").exists()).toBe(true);
    expect(wrapper.find("Button").exists()).toBe(true);
  });

  test("renders all options and don't render show more button", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggagePickerBRBRedesign {...props} baggage={baggageDataCopy} />
      </ThemeProvider>,
    );
    expect(wrapper.find("[data-test='BaggagePickerBRBRedesign-Option-2']").exists()).toBe(true);
    const Button = wrapper.find("[data-test='BaggagePickerBRBRedesign-ShowButton']");
    expect(Button.exists()).toBe(false);
  });

  test("shows all options after clicking on show more button", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggagePickerBRBRedesign {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("[data-test='BaggagePickerBRBRedesign-Option-0']").exists()).toBe(true);
    expect(wrapper.find("[data-test='BaggagePickerBRBRedesign-Option-5']").exists()).toBe(false);
    const Button = wrapper.find("[data-test='BaggagePickerBRBRedesign-ShowButton']");
    Button.simulate("click");
    expect(wrapper.find("[data-test='BaggagePickerBRBRedesign-Option-5']").exists()).toBe(true);
  });
});
