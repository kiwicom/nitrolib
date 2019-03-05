// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Badge from "../index";

const props = {
  orderStatus: "unpaid",
  price: 21,
};

describe("#Badge", () => {
  test("renders status unpaid", () => {
    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  test("renders status processing", () => {
    const wrapper = shallow(<Badge price={null} orderStatus="processing" />);
    expect(wrapper).toMatchSnapshot();
  });
  test("renders status not available", () => {
    const wrapper = shallow(<Badge price={null} orderStatus="notAvailable" />);
    expect(wrapper).toMatchSnapshot();
  });
});
