// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import TotalPayment from "../index";

const props = {
  totalPrice: 50,
};

describe("#TotalPayment", () => {
  test("renders", () => {
    const wrapper = mount(<TotalPayment {...props} />);
    expect(
      wrapper
        .find("Text")
        .first()
        .text(),
    ).toEqual("baggage_modal.payment.total");
    expect(
      wrapper
        .find("Text")
        .last()
        .text(),
    ).toEqual("50 €");
  });
});
