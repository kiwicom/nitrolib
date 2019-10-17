// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Menu from "..";

describe("#Menu", () => {
  test("render", () => {
    const wrapper = mount(
      <Menu
        subscription={<div>subscription</div>}
        debug={<div>debug</div>}
        portal=""
        shown
        isOpenNav
        onToggle={jest.fn()}
        newDesign={false}
        onSaveLanguage={jest.fn()}
        sideNav
        onSelectTrip={jest.fn()}
        onSetModal={jest.fn()}
      />,
    );

    expect(wrapper.find("Menu").exists()).toBe(true);
  });
});
