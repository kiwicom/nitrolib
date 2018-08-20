// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import TripItem from "..";

describe("#TripItem", () => {
  test("render", () => {
    const wrapper = shallow(
      <TripItem
        arrivalCity="Prague"
        id="1"
        lang="en"
        passengerCount={2}
        departureTime={new Date("2017-08-03T21:10:00.000Z")}
        departureCity="New York"
        countOtherCities={0}
        arrivalTime={new Date("2017-08-03T23:45:00.000Z")}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
