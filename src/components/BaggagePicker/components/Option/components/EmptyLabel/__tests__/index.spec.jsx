// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import EmptyLabel from "../index";

const props = {
  isCurrentCombination: false,
  pickerType: "handBag",
};

describe("#EmptyLabel", () => {
  test("renders", () => {
    const wrapper = mount(<EmptyLabel {...props} />);
    expect(wrapper.find("EmptyLabel").exists()).toBe(true);
  });
  test("renders with current", () => {
    const wrapper = mount(<EmptyLabel {...props} isCurrentCombination />);
    const TextArr = wrapper.find("Text");
    expect(TextArr.last().text()).toBe("baggage_modal.select.current");
  });
});
