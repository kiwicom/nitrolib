// @flow
import * as React from "react";
import { mount } from "enzyme";

import Pin from "..";

import { themeDefault } from "../../../../../../../records/Theme";

describe("#AccommodationModal", () => {
  const label = "Golden Coast Hotel";
  test("render", () => {
    const wrapper = mount(<Pin>{label}</Pin>);

    expect(wrapper.find("Pin__Label")).toHaveStyleRule(
      "padding",
      `${themeDefault.orbit.spaceXXSmall} ${themeDefault.orbit.spaceXSmall}`,
    );
  });
});
