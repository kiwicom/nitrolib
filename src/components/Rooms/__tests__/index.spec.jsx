// @flow strict

import * as React from "react";
import { mount } from "enzyme";

import Rooms from "..";

import { themeDefault } from "../../../records/Theme";

import type { Props } from "..";

const props: Props = {
  rooms: [
    {
      id: "1",
      roomType: "1x Deluxe Room with Free Daily Activities",
      occupancy: "2x Adult, 1x Child",
      boardType: "Half board",
    },
    {
      id: "2",
      roomType: "1x Deluxe Pool View Room with Free Daily Activities",
      occupancy: "1x Adult",
    },
    {
      id: "3",
      roomType: "1x Deluxe Pool View Room with Free Daily Activities",
      occupancy: "1x Adult",
    },
  ],
};

describe("#Rooms", () => {
  test("render", () => {
    const wrapper = mount(<Rooms {...props} />);

    expect(wrapper.find("Rooms__RoomsList")).toHaveStyleRule(
      "margin-bottom",
      `-${themeDefault.orbit.spaceMedium}`,
      {
        media: `(min-width:${600}px)`,
      },
    );
  });
});
