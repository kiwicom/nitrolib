// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Accommodation from "..";

import mockedData from "../mockedData";
import { themeDefault } from "../../../records/Theme";

describe("#Accommodation", () => {
  test("render", () => {
    const wrapper = mount(<Accommodation {...mockedData} />);

    expect(wrapper.find("Accommodation__Wrapper")).toHaveStyleRule(
      "background",
      themeDefault.orbit.paletteWhite,
    );
  });
});
