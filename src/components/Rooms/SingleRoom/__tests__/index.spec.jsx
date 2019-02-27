// @flow strict

import * as React from "react";
import { mount } from "enzyme";

import SingleRoom from "..";

import { themeDefault } from "../../../../records/Theme";

import type { RoomType } from "..";

const props: RoomType = {
  id: "1",
  description: "1x Deluxe Room with Free Daily Activities; 2x Adult, 1x Child; Half board",
};

describe("#Rooms", () => {
  test("render", () => {
    const wrapper = mount(<SingleRoom {...props} />);

    expect(wrapper.find("SingleRoom__Description")).toHaveStyleRule(
      "margin-top",
      themeDefault.orbit.spaceXXSmall,
    );
  });
});
