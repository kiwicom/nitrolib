// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";

import TripDataList from "..";

describe("#TripDataList", () => {
  test("test #loading", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(<TripDataList env={environment} onSelect={jest.fn()} />);

    expect(wrapper.find("Translate").prop("t")).toBe("common.loading");
  });

  test("test #render", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(<TripDataList env={environment} onSelect={jest.fn()} />);

    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation),
    );

    wrapper.update();

    expect(wrapper.find("TripList").exists()).toBe(true);
  });

  test("test #error", async () => {
    const environment = createMockEnvironment();

    const wrapper = mount(<TripDataList env={environment} onSelect={jest.fn()} />);

    environment.mock.rejectMostRecentOperation(new Error("error"));

    wrapper.update();

    expect(wrapper.find("Alert").text()).toBe("Error: error");
  });
});
