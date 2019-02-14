// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import { makeEnvironment } from "../../../../../../../services/utils/relay";

import SingleTripData from "..";

const res = {
  // TODO @viktr fix console errors
  data: {
    singleBooking: {
      id: "Qm9va2luZ1JldHVybjoyODU5NTI1OQ==",
      __typename: "BookingReturn",
      passengers: [
        {
          firstname: "TEST",
          lastname: "TEST",
        },
      ],
      isPastBooking: false,
      authToken: "5ed346f9-9bbb-43c4-a7d3-9c8bc7389845",
      price: {
        amount: 107.23,
        currency: "EUR",
      },
    },
  },
};

describe("#TripDataList", () => {
  test("testing render loading", async () => {
    const promise = Promise.resolve(res);
    const environment = makeEnvironment(() => promise);
    const wrapper = mount(<SingleTripData singleBid={0} env={environment} onSelect={jest.fn()} />);

    await promise;

    expect(wrapper.find("Translate").prop("t")).toBe("common.loading");
  });

  test("testing render error", async () => {
    const promise = Promise.reject(new Error("error"));
    const environment = makeEnvironment(() => promise);
    const wrapper = mount(<SingleTripData singleBid={0} env={environment} onSelect={jest.fn()} />);

    await promise.catch(() => null);

    wrapper.update();

    expect(wrapper.find("Alert").text()).toBe("Error: error");
  });

  test("testing render respond", async () => {
    const promise = Promise.resolve(res);
    const environment = makeEnvironment(() => promise);
    const wrapper = mount(<SingleTripData singleBid={0} env={environment} onSelect={jest.fn()} />);

    await promise;

    wrapper.update();

    expect(wrapper.find("TripInfoLine").exists()).toBe(true);
  });
});
