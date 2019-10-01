// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import MenuItem from "../MenuItem";

describe("#SideNav MenuItem", () => {
  test("render", () => {
    const wrapper = shallow(<MenuItem onClick={jest.fn()} text="LOL" link="kek" />);

    expect(wrapper.find("MenuItem__Container").exists()).toBe(true);
  });
});
