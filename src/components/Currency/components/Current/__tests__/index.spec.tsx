import * as React from "react";
import { mount } from "enzyme";

import currencies from "../../../../../records/__mocks__/Currencies";
import { themeDefault } from "../../../../../records/Theme";

import Current from "..";

describe("#Currency/Current", () => {
  test("render", () => {
    const wrapper = mount(<Current current={currencies.eur} />);

    expect(wrapper.find("Current__Wrapper")).toHaveStyleRule(
      "color",
      themeDefault.orbit.paletteInkNormal,
    );
    expect(wrapper.find("Current__Wrapper")).toHaveStyleRule(
      "color",
      themeDefault.orbit.paletteProductNormalHover,
      { modifier: ":hover" },
    );
  });

  test("render inverted", () => {
    const wrapper = mount(<Current current={currencies.eur} inverted />);

    expect(wrapper.find("Current__Wrapper")).toHaveStyleRule(
      "color",
      themeDefault.orbit.paletteWhite,
    );
    expect(wrapper.find("Current__Wrapper")).toHaveStyleRule(
      "color",
      themeDefault.orbit.paletteWhiteHover,
      {
        modifier: ":hover",
      },
    );
  });
});
