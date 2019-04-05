// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import BaggageItem from "../index";

const passengers = [
  {
    paxId: 1,
    firstName: "Barrack",
    middleName: "Hussein",
    lastName: "Obama",
  },
  {
    paxId: 2,
    firstName: "Donald",
    middleName: "John",
    lastName: "Trump",
  },
  {
    paxId: 3,
    firstName: "George",
    lastName: "Bush",
  },
];

const props = {
  restrictions: {
    weight: 15,
    height: 30,
    width: 60,
    length: 30,
    dimensionsSum: null,
  },
  category: "holdBag",
  context: "booking",
  amount: 2,
};

describe("#BaggageItem", () => {
  test("renders ", () => {
    const wrapper = mount(<BaggageItem {...props} />);
    expect(wrapper.find("BaggageItem__Wrapper").exists()).toBe(true);
  });
  test("renders with passengers names", () => {
    const wrapper = mount(<BaggageItem {...props} passengers={passengers} />);
    const OptionalColumnWrapper = wrapper.find("BaggageItem__OptionalColumnWrapper");
    expect(OptionalColumnWrapper.exists()).toBe(true);
    expect(OptionalColumnWrapper.find("Text").text()).toBe("B. H. Obama, D. J. Trump, G. Bush");
  });
});
