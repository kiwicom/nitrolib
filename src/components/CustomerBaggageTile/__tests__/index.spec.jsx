// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import CustomerBaggageTile from "../index";
import data from "../services/data";

const props = {
  firstName: "Oliver",
  lastName: "Dlouhy",
  gender: "male",
  currentBaggage: { handBag: 3, holdBag: 4 },
  baggage: data,
  onClick: () => console.log("clicked"), // eslint-disable-line
  orderStatus: "unpaid",
  price: {
    currency: "EUR",
    amount: 21,
    base: 21,
    service: 0,
    serviceFlat: 0,
  },
};

describe("#CustomerBaggageTile", () => {
  test("renders", () => {
    const wrapper = shallow(<CustomerBaggageTile {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
