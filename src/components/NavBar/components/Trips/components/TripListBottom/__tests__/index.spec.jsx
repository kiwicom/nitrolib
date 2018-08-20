// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import TripListBottom from "..";

describe("#TripListBottom", () => {
  test("render", () => {
    const wrapper = shallow(<TripListBottom>x</TripListBottom>);

    expect(wrapper).toMatchSnapshot();
  });
});
