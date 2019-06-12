// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import NoPersonalItem from "..";

describe("#NoPersonalItem", () => {
  test("renders ", () => {
    const wrapper = mount(<NoPersonalItem />);
    expect(wrapper.find("[data-test='BaggageOverview-NoPersonalItem']").exists()).toBe(true);
  });
});
