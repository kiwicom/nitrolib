// @flow strict
import * as React from "react";
import * as R from "ramda";
import { mount } from "enzyme";

import BaggagePicker from "../index";
import { baggageData } from "../../../records/__mocks__/baggageData";
// $FlowExpected: JSON file without types
import airlines from "../../../../stories/fixtures/airlines.json";

const props = {
  passengerCategory: "adult",
  changeBagCombination: () => {},
  baggage: baggageData,
  airlines,
  context: "booking",
  pickerType: "handBag",
  shouldShowRecheckNote: false,
  passengerBaggage: {
    handBag: 1,
    holdBag: 6,
  },
  prioBoardingLinkHandler: () => {},
};

describe("#BaggagePicker", () => {
  test("render", () => {
    const wrapper = mount(<BaggagePicker {...props} />);
    expect(wrapper.find("BaggagePicker").exists()).toBe(true);
  });
});
