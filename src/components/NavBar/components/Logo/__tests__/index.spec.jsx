// @flow
import * as React from "react";
import { mount } from "enzyme";

import Logo from "..";

describe("#Logo", () => {
  test("render", () => {
    const wrapper = mount(<Logo onClick={jest.fn()} />);

    expect(wrapper.find("Logo").exists()).toBe(true);
  });
});
