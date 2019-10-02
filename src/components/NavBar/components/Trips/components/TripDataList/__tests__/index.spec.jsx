// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import { RelayEnvironmentProvider } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";

import TripDataList from "..";

const renderTripDataList = (environment: Environment) => (
  <RelayEnvironmentProvider environment={environment}>
    <TripDataList onSelect={jest.fn()} />
  </RelayEnvironmentProvider>
);

describe("#TripDataList", () => {
  test("test #loading", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(renderTripDataList(environment));

    expect(wrapper.find("Translate").prop("t")).toBe("common.loading");
  });

  test("test #render", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(renderTripDataList(environment));

    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation),
    );

    wrapper.update();

    expect(wrapper.find("TripList").exists()).toBe(true);
  });

  test("test #error", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(renderTripDataList(environment));

    environment.mock.rejectMostRecentOperation(new Error("error"));

    wrapper.update();

    expect(wrapper.find("Alert").text()).toBe("Error: error");
  });
});
