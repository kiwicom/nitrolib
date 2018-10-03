// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { makeEnvironment } from "../../../../../../../services/utils/relay";

import TripDataList from "..";

const res = {
  data: {
    customerBookings: {
      edges: [
        {
          node: {
            destinationImageUrl:
              "https://images.kiwi.com/photos/600x600/barcelona_es.grayscale.jpg",
            id: "Qm9va2luZ09uZVdheTozNzA1ODU5",
            databaseId: "Qm9va2luZ09uZVdheTozNzA1ODU5",
            isPastBooking: true,
            passengerCount: 2,
            __typename: "BookingOneWay",
            trip: {
              arrival: {
                airport: {
                  city: {
                    name: "Barcelona",
                  },
                  id: "bG9jYXRpb246QkNO",
                },
                localTime: "2017-08-03T23:45:00.000Z",
              },
              departure: {
                airport: {
                  city: {
                    name: "Prague",
                  },
                  id: "bG9jYXRpb246UFJH",
                },
                localTime: "2017-08-03T21:10:00.000Z",
              },
            },
          },
        },
      ],
    },
  },
};

describe("#TripDataList", () => {
  test("render", async () => {
    const promise = Promise.resolve(res);
    const environment = makeEnvironment(() => promise);

    const wrapper = shallow(<TripDataList env={environment} onSelect={jest.fn()} />);

    await promise;

    expect(wrapper.dive()).toMatchSnapshot();
  });
});
