// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";

import CookiesBanner from "..";

import { themeDefault } from "../../../../../records/Theme";

describe("#CookiesBanner", () => {
  test("render", () => {
    const wrapper = mount(
      <CookiesBanner onAccept={jest.fn()} onCustomize={jest.fn()} />
    );

    expect(wrapper.find("CookiesBanner__Container")).toHaveStyleRule(
      "background",
      themeDefault.orbit.paletteInkDark
    );

    expect(wrapper.find("CookiesBanner__Container").exists()).toBe(true);
  });

  test("click accept", () => {
    const onAccept = jest.fn();

    const wrapper = shallow(
      <CookiesBanner onAccept={onAccept} onCustomize={jest.fn()} />
    );

    wrapper
      .find("Button")
      .last()
      .simulate("click");

    expect(onAccept).toBeCalled();
  });

  test("click customize", () => {
    const onCustomize = jest.fn();

    const wrapper = shallow(
      <CookiesBanner onAccept={jest.fn()} onCustomize={onCustomize} />
    );

    wrapper
      .find("Button")
      .first()
      .simulate("click");

    expect(onCustomize).toBeCalled();
  });
});
