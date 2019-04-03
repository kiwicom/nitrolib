// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import CustomerBaggageTile from "../index";
import data from "../services/data";

const props = {
  firstName: "Oliver",
  lastName: "Dlouhy",
  gender: "male",
  isProcessing: false,
  current: { handBag: 1, holdBag: 1 },
  selected: { handBag: 3, holdBag: 4 },
  onClick: () => {},
  baggage: data,
};

describe("#CustomerBaggageTile", () => {
  test("renders", () => {
    const wrapper = mount(<CustomerBaggageTile {...props} />);
    expect(wrapper.find("[data-test='CustomerBaggageTile']").exists()).toBe(true);
  });
});
