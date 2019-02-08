// @flow strict
import * as React from "react";
import { mount } from "enzyme";

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
    const wrapper = mount(<ReturnTrips item={item} onSelect={jest.fn()} />);

    expect(wrapper.prop("item")).toBe(item);

    expect(wrapper.find("TripItem").prop("bid")).toBe("Qm9va2luZ1JldHVybjo1NTk2Mjk0");
    expect(wrapper.find("TripItem").prop("img")).toBe("url");
    expect(wrapper.find("TripItem").prop("passengerCount")).toBe(1);
    expect(wrapper.find("TripItem").prop("departureCity")).toBe("Johor Bahru");
    expect(wrapper.find("TripItem").prop("arrivalCity")).toBe("Kuala Lumpur");
  });
});
