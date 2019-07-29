import * as React from "react";
import { mount } from "enzyme";

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
    const wrapper = mount(<OneWayTrips item={item} onSelect={jest.fn()} />);

    expect(wrapper.prop("item")).toBe(item);

    expect(wrapper.find("TripItem").prop("bid")).toBe("Qm9va2luZ09uZVdheTozNzA1ODU5");
    expect(wrapper.find("TripItem").prop("img")).toBe("url");
    expect(wrapper.find("TripItem").prop("passengerCount")).toBe(2);
    expect(wrapper.find("TripItem").prop("departureCity")).toBe("Prague");
    expect(wrapper.find("TripItem").prop("arrivalCity")).toBe("Moscow");
  });
});
