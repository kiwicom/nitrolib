// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { ReturnTripsUnwrapped as ReturnTrips } from "..";

const item: any = {
  __typename: "BookingReturn",
  destinationImageUrl: "url",
  databaseId: "Qm9va2luZ1JldHVybjo1NTk2Mjk0",
  passengerCount: 1,
  inbound: {
    arrival: {
      airport: {
        city: {
          name: "Johor Bahru",
        },
      },
      localTime: "2018-03-06T10:45:00.000Z",
    },
    departure: {
      airport: {
        city: {
          name: "Kuala Lumpur",
        },
      },
      localTime: "2018-03-06T09:50:00.000Z",
    },
  },
  outbound: {
    arrival: {
      airport: {
        city: {
          name: "Kuala Lumpur",
        },
      },
      localTime: "2018-02-26T06:45:00.000Z",
    },
    departure: {
      airport: {
        city: {
          name: "Johor Bahru",
        },
      },
      localTime: "2018-02-26T06:00:00.000Z",
    },
  },
};

describe("#ReturnTrips", () => {
  test("render", () => {
    const wrapper = shallow(<ReturnTrips item={item} onSelect={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });
});
