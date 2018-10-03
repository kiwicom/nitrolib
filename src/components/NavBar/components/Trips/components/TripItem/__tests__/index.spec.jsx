// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import TripItem from "..";

describe("#TripItem", () => {
  test("render", () => {
    const wrapper = shallow(
      <TripItem
        arrivalCity="Prague"
        bid="1"
        passengerCount={2}
        departureTime={new Date("2017-08-03T21:10:00.000Z")}
        departureCity="New York"
        countOtherCities={0}
        arrivalTime={new Date("2017-08-03T23:45:00.000Z")}
        onSelect={jest.fn()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
