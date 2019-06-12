// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Mobile from "..";

describe("#Mobile", () => {
  test("render", () => {
    const wrapper = shallow(<Mobile>asd</Mobile>);

    expect(wrapper.find("Mobile__Wrapper").exists()).toBe(true);
  });
});
