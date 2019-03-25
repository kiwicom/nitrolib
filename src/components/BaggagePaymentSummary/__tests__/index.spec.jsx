// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import BaggagePaymentSummary from "../index";
import { baggageData } from "../../BaggagePicker/services/data";

const passengers = [
  {
    id: 1,
    firstName: "Barrack",
    lastName: "Obama",
    baggage: {
      holdBag: 1, // index of baggage combination
      handBag: 1, // index of baggage combination
    },
  },
  {
    id: 2,
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
    const wrapper = shallow(<BaggagePaymentSummary {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
