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
        newDesign={false}
        inverted={false}
        onSaveLanguage={jest.fn()}
        onSelectTrip={jest.fn()}
        onSetModal={jest.fn()}
      />,
    );

    expect(wrapper.find("Menu").exists()).toBe(true);
  });
});
