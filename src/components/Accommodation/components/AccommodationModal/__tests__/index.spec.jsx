// @flow strict

import * as React from "react";
import { mount } from "enzyme";

import AccommodationModal from "..";

import { themeDefault } from "../../../../../records/Theme";

import type { Props } from "..";

const props: Props = {
  location: {
    latitude: 38.104542,
    longitude: 23.980237,
    hotelName: "Golden Rock Coast Hotel",
    address: "Bali - Ubud, City centre of Ubud",
    mapboxToken:
      "pk.eyJ1IjoibWljaGFlbGtpd2kiLCJhIjoiY2l3aHRiN2ZqMDAycjJ6cXduNDU5djkweCJ9.XuamwcGDtyovJEMaSWtFkg",
  },
  onClose: jest.fn(),
};

describe("#AccommodationModal", () => {
  test("render", () => {
    const wrapper = mount(<AccommodationModal {...props} />);

    expect(wrapper.find("AccommodationModal__Address")).toHaveStyleRule(
      "margin-bottom",
      themeDefault.orbit.spaceSmall,
    );
  });
});
