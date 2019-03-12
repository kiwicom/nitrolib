// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import BaggageItem from "../index";

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
    const wrapper = shallow(<BaggageItem {...props} />);
    expect(wrapper.find("BaggageCabin").exists()).toBe(true);
  });
  test("renders baggage restrictions", () => {
    const wrapper = shallow(<BaggageItem {...props} />);
    expect(wrapper.find("BaggageItem__BaggageRestrictions").exists()).toBe(true);
  });
});
