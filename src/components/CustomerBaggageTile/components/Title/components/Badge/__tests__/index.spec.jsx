// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Badge from "../index";

const props = {
  orderStatus: "unpaid",
  price: {
    currency: "EUR",
    amount: 21,
    base: 21,
    service: 0,
    serviceFlat: 0,
  },
};

describe("#Badge", () => {
  test("renders status unpaid", () => {
    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  test("renders status processing", () => {
    const wrapper = shallow(<Badge orderStatus="processing" />);
    expect(wrapper).toMatchSnapshot();
  });
  test("renders status not available", () => {
    const wrapper = shallow(<Badge orderStatus="notAvailable" />);
    expect(wrapper).toMatchSnapshot();
  });
});
