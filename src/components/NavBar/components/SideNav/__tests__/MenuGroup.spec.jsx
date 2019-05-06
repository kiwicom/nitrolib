// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import MenuGroup from "../MenuGroup";

describe("#SideNav MenuGroup", () => {
  test("render", () => {
    const wrapper = shallow(<MenuGroup headerText="LOL">KEK</MenuGroup>);

    expect(wrapper.find("MenuGroup__Menu").exists()).toBe(true);
  });
});
