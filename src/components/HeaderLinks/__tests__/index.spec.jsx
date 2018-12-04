// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import HeaderLinks from "..";

const props = {
  searchString: "search",
  language: {
    id: "us",
  },
  currency: "gbp",
  searchForm: {
    mode: "oneWay",
    destination: {
      type: "string",
      name: "string",
    },
    checkIn: "wd",
    checkOut: "we",
    adults: 1,
    children: 0,
  },
  roomsProvider: "string",
  holidaysProvider: "string",
  lastminuteSupported: false,
};

describe("#Currency", () => {
  test("render", () => {
    const wrapper = shallow(<HeaderLinks {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
