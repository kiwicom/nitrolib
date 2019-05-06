// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import TripListBottom from "..";

describe("#TripListBottom", () => {
  test("render", () => {
    const wrapper = mount(<TripListBottom>x</TripListBottom>);

    expect(wrapper.find("TripListBottom").exists()).toBe(true);
  });
});
