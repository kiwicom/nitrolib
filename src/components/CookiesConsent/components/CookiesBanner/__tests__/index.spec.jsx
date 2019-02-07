// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";

import CookiesBanner from "..";

import { themeDefault } from "../../../../../records/Theme";

describe("#CookiesBanner", () => {
  test("render", () => {
    const wrapper = mount(<CookiesBanner onAccept={jest.fn()} />);

    expect(wrapper.find("CookiesBanner__Container")).toHaveStyleRule(
      "background",
      themeDefault.orbit.paletteInkDark,
    );
    expect(wrapper.find("CookiesBanner__Container")).toHaveStyleRule(
      "background",
      themeDefault.orbit.paletteWhite,
      {
        media: `(min-width:${600}px)`,
      },
    );
  });

  test("click accept", () => {
    const onAccept = jest.fn();

    const wrapper = shallow(<CookiesBanner onAccept={onAccept} />);

    wrapper.find("CookiesBanner__AcceptButton").simulate("click");

    expect(onAccept).toBeCalled();
  });
});
