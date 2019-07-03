// @flow strict

import * as React from "react";
import { mount } from "enzyme";

import SingleTripHeader from "..";

describe("#SingleTripHeader", () => {
  it("should contain ButtonLinks", () => {
    const wrapper = mount(<SingleTripHeader />);
    expect(wrapper.find("ButtonLink").exists()).toBe(true);
  });
});
