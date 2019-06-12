// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import BaggagePaymentSummary from "..";

import { baggageData } from "../../../records/__mocks__/baggageData";

const passengers = [
  {
    paxId: 1,
    firstName: "Barrack",
    lastName: "Obama",
    baggage: {
      holdBag: 1, // index of baggage combination
      handBag: 1, // index of baggage combination
    },
  },
  {
    paxId: 2,
    firstName: "Donald",
    lastName: "Trump",
    baggage: {
      holdBag: 2, // index of baggage combination
      handBag: 2, // index of baggage combination
    },
  },
];

const props = {
  passengers,
  baggage: baggageData,
};

describe("#BaggagePaymentSummary", () => {
  test("renders", () => {
    const wrapper = mount(<BaggagePaymentSummary {...props} />);
    expect(wrapper.find("[data-test='BaggagePaymentSummary']").exists()).toBe(true);
  });
});
