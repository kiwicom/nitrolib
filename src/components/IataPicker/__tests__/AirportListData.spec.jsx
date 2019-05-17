// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import { makeEnvironment } from "../../../services/utils/relay";
import AirportListData from "../AirportListData";

const res = {
  data: {
    allLocations: {
      edges: [
        {
          node: {
            id: "VIE",
            locationId: "VIE",
            name: "Vienna airport",
            type: "airport",
            city: {
              name: "Vienna",
            },
            country: {
              locationId: "at",
            },
          },
        },
      ],
    },
  },
};

describe("#AirportListData", () => {
  test("render error", async () => {
    const promise = Promise.reject(new Error("error"));
    const environment = makeEnvironment(() => promise);

    const wrapper = mount(
      <AirportListData value="VIE" onSelect={jest.fn()} environment={environment} />,
    );

    await promise.catch(() => null);

    expect(wrapper.find("ReactRelayQueryRenderer").exists()).toBe(true);
  });

  test("render loading", () => {
    const promise = Promise.resolve(res);
    const environment = makeEnvironment(() => promise);

    const wrapper = mount(
      <AirportListData value="VIE" onSelect={jest.fn()} environment={environment} />,
    );

    expect(wrapper.text()).toBe(null);
  });

  test("render results", async () => {
    const promise = Promise.resolve(res);
    const environment = makeEnvironment(() => promise);

    const wrapper = mount(
      <AirportListData value="VIE" onSelect={jest.fn()} environment={environment} />,
    );

    await promise;

    expect(wrapper.text()).toBe("Vienna (VIE)");
  });
});
