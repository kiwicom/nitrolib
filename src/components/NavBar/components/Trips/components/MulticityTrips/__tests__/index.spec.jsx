// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import { MulticityTripsUnwrapped as MulticityTrips } from "..";

const item: any = {
  __typename: "BookingMulticity",
  destinationImageUrl: "url",
  databaseId: "Qm9va2luZ011bHRpY2l0eTo1MzI1MjQ4",
  passengerCount: 1,
  start: {
    airport: {
      city: {
        name: "Wroclaw",
      },
    },
    localTime: "2018-01-26T19:30:00.000Z",
  },
  end: {
    airport: {
      city: {
        name: "Phoenix",
      },
    },
    localTime: "2018-02-27T13:55:00.000Z",
  },
  trip: [
    {
      arrival: {
        airport: {
          city: {
            name: "Oslo",
          },
        },
      },
      departure: {
        airport: {
          city: {
            name: "Wroclaw",
          },
        },
      },
    },
    {
      arrival: {
        airport: {
          city: {
            name: "Santiago de Compostela",
          },
        },
      },
      departure: {
        airport: {
          city: {
            name: "Oslo",
          },
        },
      },
    },
    {
      arrival: {
        airport: {
          city: {
            name: "New York City",
          },
        },
      },
      departure: {
        airport: {
          city: {
            name: "Santiago de Compostela",
          },
        },
      },
    },
    {
      arrival: {
        airport: {
          city: {
            name: "Phoenix",
          },
        },
      },
      departure: {
        airport: {
          city: {
            name: "New York City",
          },
        },
      },
    },
  ],
};

describe("#MulticityTrips", () => {
  test("render", () => {
    const wrapper = mount(<MulticityTrips item={item} onSelect={jest.fn()} />);

    expect(wrapper.prop("item")).toBe(item);

    expect(wrapper.find("TripItem").prop("bid")).toBe("Qm9va2luZ011bHRpY2l0eTo1MzI1MjQ4");
    expect(wrapper.find("TripItem").prop("img")).toBe("url");
    expect(wrapper.find("TripItem").prop("passengerCount")).toBe(1);
    expect(wrapper.find("TripItem").prop("departureCity")).toBe("Wroclaw");
    expect(wrapper.find("TripItem").prop("arrivalCity")).toBe("Phoenix");
  });
});
