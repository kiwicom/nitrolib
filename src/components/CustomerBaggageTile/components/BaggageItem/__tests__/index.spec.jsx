// @flow strict
import * as React from "react";
import { mount } from "enzyme";

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
    const wrapper = mount(<BaggageItem {...props} />);
    expect(wrapper.find("BaggageCabin").exists()).toBe(true);
  });
  test("renders baggage restrictions", () => {
    const wrapper = mount(<BaggageItem {...props} />);
    expect(
      wrapper
        .find("BaggageItem__BaggageRestrictions")
        .first()
        .text(),
    ).toBe("20 × 20 × 20 cm, 5 kg");
  });
});
