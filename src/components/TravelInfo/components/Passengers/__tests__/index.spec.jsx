// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Passengers from "..";

import { themeDefault } from "../../../../../records/Theme";

describe("#Passengers", () => {
  test("render", () => {
    // eslint-disable-next-line
    const wrapper = mount(<Passengers adults={2} children={1} />);

    expect(wrapper.find("Passengers__StyledPassengersIcon")).toHaveStyleRule(
      "margin-right",
      themeDefault.orbit.spaceSmall,
    );
  });
});
