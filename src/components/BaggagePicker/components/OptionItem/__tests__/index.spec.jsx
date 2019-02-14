// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

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
  firstItem: true,
  price: {
    amount: 10,
    currency: "EUR",
    base: 0,
    merchant: null,
    service: 0,
    serviceFlat: 0,
  },
  category: "cabinBag",
};

describe("#OptionItem", () => {
  test("render ", () => {
    const wrapper = shallow(<OptionItem {...props} />);
    expect(wrapper.find("Stack").exists()).toBe(true);
  });
});
