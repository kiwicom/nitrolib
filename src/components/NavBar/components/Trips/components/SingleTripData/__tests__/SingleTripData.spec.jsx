// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import { RelayEnvironmentProvider } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";

import SingleTripData from "..";

const renderSingleTripData = (environment: Environment) => (
  <RelayEnvironmentProvider environment={environment}>
    <SingleTripData singleBid={0} onSelect={jest.fn()} />
  </RelayEnvironmentProvider>
);

describe("#TripDataList", () => {
  test("testing render loading", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(renderSingleTripData(environment));

    expect(wrapper.find("Translate").prop("t")).toBe("common.loading");
  });

  test("testing render error", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(renderSingleTripData(environment));

    environment.mock.rejectMostRecentOperation(new Error("error"));

    wrapper.update();

    expect(wrapper.find("Alert").text()).toBe("Error: error");
  });

  test("testing render respond", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(renderSingleTripData(environment));

    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation),
    );

    wrapper.update();

    expect(wrapper.find("Stack").exists()).toBe(true);
  });
});
