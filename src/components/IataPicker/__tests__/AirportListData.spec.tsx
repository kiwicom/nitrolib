import * as React from "react";
import { mount } from "enzyme";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";

import AirportListData from "../AirportListData";

describe("#AirportListData", () => {
  test("render error", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(<AirportListData env={environment} value="VIE" onSelect={jest.fn()} />);

    environment.mock.rejectMostRecentOperation(new Error("error"));

    wrapper.update();

    expect(wrapper.find("ReactRelayQueryRenderer").exists()).toBe(true);
  });

  test("render loading", () => {
    const environment = createMockEnvironment();

    const wrapper = mount(<AirportListData env={environment} value="VIE" onSelect={jest.fn()} />);

    expect(wrapper.text()).toBe();
  });

  test("render results", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(<AirportListData env={environment} value="VIE" onSelect={jest.fn()} />);

    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        Location() {
          return {
            locationId: "VIE",
            city: {
              name: "Vienna",
            },
          };
        },
      }),
    );

    wrapper.update();

    expect(
      wrapper
        .find("AirportResult__Name")
        .children()
        .text(),
    ).toBe("Vienna (VIE)");
  });
});
