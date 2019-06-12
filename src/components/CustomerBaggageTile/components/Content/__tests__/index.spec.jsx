// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Content from "..";

const props = {
  definitions: [
    {
      index: 0,
      conditions: {
        passengerGroups: ["adult"],
      },
      price: {
        currency: "EUR",
        amount: 0,
        base: 0,
        merchant: 0,
        service: 0,
        serviceFlat: 0,
      },
      category: "cabinBag",
      restrictions: {
        weight: 5,
        height: 20,
        width: 20,
        length: 20,
        dimensionsSum: null,
      },
    },
    {
      index: 1,
      conditions: {
        passengerGroups: ["adult"],
      },
      price: {
        currency: "EUR",
        amount: 10,
        base: 0,
        merchant: 0,
        service: 0,
        serviceFlat: 0,
      },
      category: "holdBag",
      restrictions: {
        weight: 10,
        height: 52,
        width: 26,
        length: 78,
        dimensionsSum: 156,
      },
    },
  ],
  orderStatus: "unpaid",
  supportLinkHandler: () => {},
};

describe("#Content", () => {
  test("renders no personal item", () => {
    const wrapper = shallow(<Content {...props} />);
    expect(wrapper.find("BaggagePersonalItemNone").exists()).toBe(true);
  });
  test("renders contact us text", () => {
    const wrapper = shallow(<Content {...props} orderStatus="notAvailable" />);
    expect(wrapper.find("Content__ContactUsText").exists()).toBe(true);
  });
});
