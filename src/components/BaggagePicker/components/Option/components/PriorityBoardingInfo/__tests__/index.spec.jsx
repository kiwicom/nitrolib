// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import PriorityBoardingInfo from "../index";

const props = {
  airlines: [
    {
      id: "W6",
      lcc: 1,
      name: "Wizzair",
    },
    {
      id: "FR",
      lcc: 1,
      name: "Ryanair",
    },
  ],
};

describe("#PriorityBoardingInfo", () => {
  test("renders", () => {
    const wrapper = mount(<PriorityBoardingInfo {...props} />);
    expect(wrapper.find("PriorityBoardingInfo").exists()).toBe(true);
  });
  test("renders proper text", () => {
    const wrapper = mount(<PriorityBoardingInfo {...props} />);
    const TextArr = wrapper.find("Text");
    expect(TextArr.first().text()).toBe("baggage_modal.priority_boarding baggage_modal.learn_more");
  });
});
