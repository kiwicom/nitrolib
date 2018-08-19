// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { TripHeaderUnwrapped as TripHeader } from "..";

const trips: any = {
  edges: [
    {
      node: {
        isPastBooking: false,
      },
    },
  ],
};

describe("#TripHeader", () => {
  test("render", () => {
    const wrapper = shallow(<TripHeader trips={trips} />);

    expect(wrapper).toMatchSnapshot();
  });
});
