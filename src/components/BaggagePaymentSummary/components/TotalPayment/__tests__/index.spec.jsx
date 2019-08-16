// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import TotalPayment from "..";

const props = {
  totalPrice: 50,
};

describe("#TotalPayment", () => {
  test("renders", () => {
    const wrapper = shallow(<TotalPayment {...props} />);
    expect(
      wrapper
        .find("Text")
        .first()
        .dive()
        .find("Translate")
        .prop("t"),
    ).toEqual("baggage_modal.payment.total");

    expect(
      wrapper
        .find("Text")
        .last()
        .dive()
        .find("Price")
        .prop("value"),
    ).toEqual(50);
  });
});
