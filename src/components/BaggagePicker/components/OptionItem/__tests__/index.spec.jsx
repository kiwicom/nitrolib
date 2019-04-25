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
    merchant: 0,
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

  test("renders current info", () => {
    const wrapper = mount(<OptionItem {...props} isCurrentCombination />);
    expect(wrapper.find('[data-test="BaggagePicker-OptionItem-cabinBag"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="BaggagePicker-OptionItem-current"]').text()).toEqual(
      "baggage_modal.select.current",
    );
  });

  test("renders price", () => {
    const wrapper = mount(<OptionItem {...props} />);
    expect(wrapper.find('[data-test="BaggagePicker-OptionItem-price"]').text()).toEqual("10 €");
  });
});
