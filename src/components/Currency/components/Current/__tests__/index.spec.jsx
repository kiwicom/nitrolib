// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Current from "..";

import { themeDefault } from "../../../../../records/Theme";

const currency = {
  id: "eur",
  name: "Euro",
  format: "__price__ €",
  uncertainFormat: false,
  round: "2",
  enabledOnAffilId: "",
  fallback: "",
  rate: 1,
};

describe("#Currency/Current", () => {
  test("render", () => {
    const wrapper = mount(<Current current={currency} />);

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
    const wrapper = mount(<Current current={currency} inverted />);

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
