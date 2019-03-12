// // @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Starred from "..";

// TODO: write proper test

describe("#Starred", () => {
  test("render open", () => {
    const wrapper = shallow(<Starred positionMenuDesktop={0} positionMenuTablet={0} inverted />);
    expect(wrapper.exists()).toBe(true);
  });
});
