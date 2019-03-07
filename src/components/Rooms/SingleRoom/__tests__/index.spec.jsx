// @flow strict

import * as React from "react";
import { mount } from "enzyme";

import SingleRoom from "..";

import { themeDefault } from "../../../../records/Theme";
import type { RoomType } from "../../../../records/Room";

const props: RoomType = {
  id: "1",
  roomType: "1x Deluxe Room with Free Daily Activities",
  occupancy: "2x Adult, 1x Child",
  boardType: "Half board",
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
