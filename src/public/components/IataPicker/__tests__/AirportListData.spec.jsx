// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import makeEnvironment from "public/services/utils/makeEnvironment";
import AirportListData from "../AirportListData";

const res = {
  data: {
    allLocations: {
      edges: [
        {
          node: {
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

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("render loading", () => {
    const promise = Promise.resolve(res);
    const environment = makeEnvironment(() => promise);

    const wrapper = mount(
      <AirportListData value="VIE" onSelect={jest.fn()} environment={environment} />,
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("render results", async () => {
    const promise = Promise.resolve(res);
    const environment = makeEnvironment(() => promise);

    const wrapper = mount(
      <AirportListData value="VIE" onSelect={jest.fn()} environment={environment} />,
    );

    await promise;

    expect(wrapper.html()).toMatchSnapshot();
  });
});
