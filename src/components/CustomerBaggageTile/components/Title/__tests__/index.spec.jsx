// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Title from "../index";

const props = {
  firstName: "Oliver",
  lastName: "Dlouhy",
  gender: "male",
  orderStatus: "unpaid",
  price: {
    currency: "EUR",
    amount: 21,
    base: 21,
    service: 0,
    serviceFlat: 0,
  },
};

describe("#Title", () => {
  test("renders", () => {
    const wrapper = shallow(<Title {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  test("renders proper gender icon", () => {
    const wrapper = shallow(<Title {...props} gender="female" />);
    expect(wrapper.find("GenderWoman").exists()).toBe(true);
  });
});
