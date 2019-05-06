// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Language from "..";

describe("#Language", () => {
  test("render", () => {
    const wrapper = mount(<Language onChange={jest.fn()} />);

    expect(wrapper.find("Language").exists()).toBe(true);
  });

  test("render - native", () => {
    const wrapper = mount(<Language onChange={jest.fn()} native />);

    expect(wrapper.find("Language").prop("native")).toBe(true);
  });

  test("render - native (hidden text)", () => {
    const wrapper = mount(<Language onChange={jest.fn()} native hideNativeText />);

    expect(wrapper.find("Language").prop("native")).toBe(true);
    expect(wrapper.find("Language").prop("hideNativeText")).toBe(true);
  });

  test("render - flat", () => {
    const wrapper = mount(<Language onChange={jest.fn()} flat />);

    expect(wrapper.find("Language").prop("flat")).toBe(true);
  });
});
