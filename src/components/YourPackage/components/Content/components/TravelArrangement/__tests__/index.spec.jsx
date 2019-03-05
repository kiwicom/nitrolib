// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import TravelArrangement from "..";

const props = {
  data: {
    itineraryOutbound: [
      {
        departure: "Prague, Czech Republic",
        destination: "Denpasar, Bali",
        numberOfStops: 0,
        note: "Transfer to hotel NOT included",
      },
    ],
    itineraryInbound: [
      {
        departure: "Denpasar, Bali",
        destination: "Prague, Czech Republic",
        numberOfStops: 2,
        note: "Transfer to airport NOT included",
      },
    ],
  },
  columnLayout: false,
};

describe("#TravelArrangement", () => {
  test("render", () => {
    const wrapper = mount(<TravelArrangement {...props} />);

    expect(
      wrapper
        .find("Stack")
        .filterWhere(stack => stack.prop("spacing") === "comfy")
        .exists(),
    ).toBe(true);

    wrapper.setProps({ columnLayout: true });

    expect(
      wrapper
        .find("Stack")
        .filterWhere(stack => stack.prop("spacing") === "comfy")
        .exists(),
    ).toBe(false);
  });
});
