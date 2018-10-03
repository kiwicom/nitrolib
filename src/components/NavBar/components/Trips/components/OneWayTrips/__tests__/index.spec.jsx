// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { OneWayTripsUnwrapped as OneWayTrips } from "..";

const item: any = {
  __typename: "BookingOneWay",
  destinationImageUrl: "url",
  databaseId: "Qm9va2luZ09uZVdheTozNzA1ODU5",
  passengerCount: 2,
  trip: {
    arrival: {
      airport: {
        city: {
          name: "Moscow",
        },
      },
      localTime: "2017-08-03T23:45:00.000Z",
    },
    departure: {
      airport: {
        city: {
          name: "Prague",
        },
      },
      localTime: "2017-08-03T21:10:00.000Z",
    },
  },
};

describe("#OneWayTrips", () => {
  test("render", () => {
    const wrapper = shallow(<OneWayTrips item={item} onSelect={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });
});
