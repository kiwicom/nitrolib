// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";

import CookiesBanner from "..";

import { themeDefault } from "../../../../../records/Theme";

describe("#CookiesPopup", () => {
  test("render", () => {
    const wrapper = mount(<CookiesBanner onAccept={jest.fn()} />);

    expect(wrapper.find("CookiesBanner__Container")).toHaveStyleRule(
      "background",
      themeDefault.orbit.paletteInkDark
    );

    expect(wrapper.find("CookiesBanner__Container").exists()).toBe(true);
  });

  test("click accept", () => {
    const onAccept = jest.fn();

    const wrapper = shallow(<CookiesBanner onAccept={onAccept} />);

    wrapper.find("CookiesBanner__AcceptButton").simulate("click");

    expect(onAccept).toBeCalled();
  });
});
