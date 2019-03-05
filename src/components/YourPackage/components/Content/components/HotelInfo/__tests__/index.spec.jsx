// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import HotelInfo from "..";

import { themeDefault } from "../../../../../../../records/Theme";

const props = {
  hotel: {
    name: "Golden Coast Hotel",
    rating: 5,
    rooms: [
      {
        id: "1",
        description: "1x Deluxe Room with Free Daily Activities; 2x Adult, 1x Child; Half board",
      },
      {
        id: "2",
        description: "1x Room with Free Daily Activities; 3x Adult",
      },
    ],
  },
};

describe("#HotelInfo", () => {
  test("render", () => {
    const wrapper = mount(<HotelInfo search={false} {...props} />);

    expect(wrapper.find("HotelInfo__Header")).toHaveStyleRule(
      "margin-bottom",
      themeDefault.orbit.spaceMedium,
    );
    expect(wrapper.find("Stack").prop("spaceAfter")).toBe("medium");
    wrapper.setProps({ search: true });
    expect(wrapper.find("Stack").prop("spaceAfter")).toBe("large");
  });
});
