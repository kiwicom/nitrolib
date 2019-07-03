// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";

import SingleTripData from "..";

describe("#TripDataList", () => {
  test("testing render loading", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(<SingleTripData singleBid={0} env={environment} onSelect={jest.fn()} />);

    expect(wrapper.find("Translate").prop("t")).toBe("common.loading");
  });

  test("testing render error", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(<SingleTripData singleBid={0} env={environment} onSelect={jest.fn()} />);

    environment.mock.rejectMostRecentOperation(new Error("error"));

    wrapper.update();

    expect(wrapper.find("Alert").text()).toBe("Error: error");
  });

  test("testing render respond", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(<SingleTripData singleBid={0} env={environment} onSelect={jest.fn()} />);

    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation),
    );

    wrapper.update();

    expect(wrapper.find("Stack").exists()).toBe(true);
  });
});
