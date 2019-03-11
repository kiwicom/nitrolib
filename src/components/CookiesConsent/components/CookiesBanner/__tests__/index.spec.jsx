// @flow strict
import * as React from "react";
import { shallow, mount } from "enzyme";
import { breakpoints } from "@kiwicom/orbit-components/lib/utils/mediaQuery";

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
        media: breakpoints.largeMobile,
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
