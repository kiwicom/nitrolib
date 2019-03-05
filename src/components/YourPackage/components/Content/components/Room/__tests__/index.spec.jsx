// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Room from "..";

import { themeDefault } from "../../../../../../../records/Theme";

const props = {
  id: "1",
  description: "1x Deluxe Room with Free Daily Activities; 2x Adult, 1x Child; Half board",
};

describe("#Room", () => {
  test("render", () => {
    const wrapper = mount(<Room {...props} />);

    expect(wrapper.find("Room__RoomName")).toHaveStyleRule(
      "margin-bottom",
      themeDefault.orbit.spaceXSmall,
    );
  });
});
