// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import { RelayEnvironmentProvider } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";

import AirportListData from "../AirportListData";

const renderAirportListData = (environment: Environment) => (
  <RelayEnvironmentProvider environment={environment}>
    <AirportListData value="VIE" onSelect={jest.fn()} />
  </RelayEnvironmentProvider>
);

describe("#AirportListData", () => {
  test("render error", async () => {
    const environment = createMockEnvironment();
    const wrapper = mount(renderAirportListData(environment));

    environment.mock.rejectMostRecentOperation(new Error("error"));

    wrapper.update();

    expect(wrapper.find("ReactRelayQueryRenderer").exists()).toBe(true);
  });

  test("render loading", () => {
    const wrapper = mount(renderAirportListData(createMockEnvironment()));

    expect(wrapper.text()).toBe("");
  });

  test("render results", async () => {
    const environment = createMockEnvironment();
    const wrapper = mount(renderAirportListData(environment));

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
