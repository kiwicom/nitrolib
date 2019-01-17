// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import OptionItem from "../index";

const props = {
  isHoldBag: true,
  amount: 1,
  restrictions: {
    dimensions_sum: 156,
    height: 52,
    length: 78,
    weight: 25,
    width: 26,
  },
  firstItem: true,
  price: {
    amount: 10,
    currency: "EUR",
  },
  categoryIcon: <span>Icon</span>,
  categoryName: <span>Category</span>,
};

describe("#OptionItem", () => {
  test("render ", () => {
    const wrapper = shallow(<OptionItem {...props} />);
    expect(wrapper.find("Stack").exists()).toBe(true);
  });
});
