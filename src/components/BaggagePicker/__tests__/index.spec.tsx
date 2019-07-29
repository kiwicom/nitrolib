import * as React from "react";
import R from "ramda";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme";

import { baggageData } from "../../../records/__mocks__/baggageData";
// $FlowExpected: JSON file without types
import airlines from "../../../../stories/fixtures/airlines.json";

import BaggagePicker from "..";

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
};

const baggageDataCopy = R.mergeDeepRight({}, baggageData);
baggageDataCopy.combinations = {
  handBag: [baggageData.combinations.handBag[2]],
  holdBag: [baggageData.combinations.holdBag[2]],
};

describe("#BaggagePicker", () => {
  test("renders", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggagePicker {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("BaggagePicker").exists()).toBe(true);
    expect(wrapper.find("[data-test='BaggagePicker-handBag']").exists()).toBe(true);
    expect(wrapper.find("[data-test='BaggagePicker-holdBag']").exists()).toBe(false);
  });

  test("renders show more button", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggagePicker {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("BaggagePicker").exists()).toBe(true);
    expect(wrapper.find("[data-test='BaggagePicker-Option-0']").exists()).toBe(true);
    expect(wrapper.find("Button").exists()).toBe(true);
  });

  test("renders all options and don't render show more button", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggagePicker {...props} baggage={baggageDataCopy} />
      </ThemeProvider>,
    );
    expect(wrapper.find("[data-test='BaggagePicker-Option-2']").exists()).toBe(true);
    const Button = wrapper.find("[data-test='BaggagePicker-ShowButton']");
    expect(Button.exists()).toBe(false);
  });

  test("shows all options after clicking on show more button", () => {
    const wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <BaggagePicker {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find("[data-test='BaggagePicker-Option-0']").exists()).toBe(true);
    expect(wrapper.find("[data-test='BaggagePicker-Option-5']").exists()).toBe(false);
    const Button = wrapper.find("[data-test='BaggagePicker-ShowButton']");
    Button.simulate("click");
    expect(wrapper.find("[data-test='BaggagePicker-Option-5']").exists()).toBe(true);
  });
});
