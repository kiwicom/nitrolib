// @flow strict
import SingleTripHeader from "..";

import * as React from "react";
import { mount } from "enzyme";

describe("#SingleTripHeader", () => {
  it("should contain ButtonLinks", () => {
    const wrapper = mount(<SingleTripHeader />);
    expect(wrapper.find("ButtonLink").exists()).toBe(true);
  });
});
