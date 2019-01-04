// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import SideBar from "..";

describe("#SideBar", () => {
  test("render", () => {
    const wrapper = mount(
      <SideBar onClick={jest.fn()} shown>
        <h1>Kek</h1>
      </SideBar>,
    );

    expect(wrapper.find("Core").exists()).toBe(true);
  });
});
