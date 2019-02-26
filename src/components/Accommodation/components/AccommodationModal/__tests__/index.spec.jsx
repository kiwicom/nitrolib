// @flow strict

import * as React from "react";
import { mount } from "enzyme";

import AccommodationModal from "..";

import { themeDefault } from "../../../../../records/Theme";

import type { Props } from "..";

const props: Props = {
  address: {
    fullAddress: "Golden Rock Coast Hotel, City centre of Ubud 23",
  },
  location: {
    center: {
      latitude: 38.104542,
      longitude: 23.980237,
    },
    label: "Golden Coast Hotel",
    zoom: 10,
    desktopWidth: 377,
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
