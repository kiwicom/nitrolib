// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import BaggagePaymentSummary from "../index";

const props = {
  id: 1,
  firstName: "Barrack",
  lastName: "Obama",
  baggage: {
    holdBag: [
      {
        category: "personalItem",
        restrictions: {
          weight: 3,
          height: 20,
          width: 20,
          length: 40,
          dimensionsSum: null,
        },
        amount: 1,
        conditions: {
          passengerGroups: ["adult"],
        },
      },
    ],

    handBag: [
      {
        category: "holdBag",
        restrictions: {
          weight: 10,
          height: 40,
          width: 30,
          length: 50,
          dimensionsSum: null,
        },
        amount: 1,
        conditions: {
          passengerGroups: ["adult"],
        },
      },
      {
        category: "holdBag",
        restrictions: {
          weight: 15,
          height: 50,
          width: 30,
          length: 50,
          dimensionsSum: null,
        },
        amount: 2,
        conditions: {
          passengerGroups: ["adult"],
        },
      },
    ],
  },
  price: 40,
};

describe("#BaggagePaymentSummary", () => {
  test("renders", () => {
    const wrapper = shallow(<BaggagePaymentSummary {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
