// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import BaggagePicker from "../index";
import { baggageData } from "../services/data";
// $FlowFixMe
import airlines from "../../../../stories/fixtures/airlines.json";

const props = {
  passengerCategory: "adult",
  changeBagCombination: (type, index) => {
    console.log(type, index); // eslint-disable-line
  },
  baggage: baggageData,
  airlines,
  context: "booking",
  pickerType: "handBag",
  shouldShowRecheckNote: false,
  passengerBaggage: {
    handBag: 1,
    holdBag: 6,
  },
  currentCombination: undefined,
  prioBoardingLinkHandler: () => {},
};

describe("#BaggagePicker", () => {
  test("render", () => {
    const wrapper = shallow(<BaggagePicker {...props} />);
    expect(wrapper.find("BaggagePicker").exists()).toBe(true);
  });
});
