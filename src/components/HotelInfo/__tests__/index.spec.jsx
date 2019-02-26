// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import HotelInfo from "..";

import { themeDefault } from "../../../records/Theme";

import type { Props } from "..";

const props: Props = {
  hotel: {
    name: "Golden Rock Coast Hotel",
    rating: 5,
    photoUrl: "https://satyr.io/320x213-240",
    address: {
      fullAddress: "Golden Rock Coast Hotel, City centre of Ubud 23",
    },
  },
  onShownOnMapClick: jest.fn(),
};

describe("#HotelInfo", () => {
  test("render", () => {
    const wrapper = mount(<HotelInfo {...props} />);

    expect(wrapper.find("HotelInfo__Address")).toHaveStyleRule(
      "margin-right",
      themeDefault.orbit.spaceLarge,
      {
        media: `(min-width:${600}px)`,
      },
    );
  });
});
