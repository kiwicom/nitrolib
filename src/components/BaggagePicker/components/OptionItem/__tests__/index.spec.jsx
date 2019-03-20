// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";

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
    merchant: null,
    service: 0,
    serviceFlat: 0,
  },
  category: "cabinBag",
  isCurrentCombination: false,
};

describe("#OptionItem", () => {
  test("render ", () => {
    const wrapper = shallow(<OptionItem {...props} />);
    expect(wrapper.find("Stack").exists()).toBe(true);
  });
  test("render current info", () => {
    const wrapper = mount(<OptionItem {...props} isCurrentCombination />);
    expect(wrapper.find("OptionItem__BaggageInfoWrapper").exists()).toBe(true);
    expect(wrapper.find("OptionItem__BaggageInfoWrapper span").text()).toEqual(
      "baggage_modal.select.current",
    );
  });
});
