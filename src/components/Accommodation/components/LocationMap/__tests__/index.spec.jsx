// @flow strict

import * as React from "react";
import { shallow } from "enzyme";

import LocationMap from "..";

import Pin from "../components/Pin";
import type { LocationType } from "../../../records/LocationMap";

const location: LocationType = {
  center: {
    latitude: 38.104542,
    longitude: 23.980237,
  },
  label: "Golden Coast Hotel",
  zoom: 10,
  desktopWidth: 377,
  mapboxToken:
    "pk.eyJ1IjoibWljaGFlbGtpd2kiLCJhIjoiY2l3aHRiN2ZqMDAycjJ6cXduNDU5djkweCJ9.XuamwcGDtyovJEMaSWtFkg",
};

describe("#LocationMap", () => {
  test("render", () => {
    const wrapper = shallow(<LocationMap {...location} />);

    expect(wrapper.contains(<Pin>{location.label}</Pin>)).toBe(true);
  });
});
