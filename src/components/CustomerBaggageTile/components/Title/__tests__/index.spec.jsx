// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Title from "../index";

const props = {
  firstName: "Oliver",
  middleName: "Olix",
  lastName: "Dlouhy",
  gender: "male",
  orderStatus: "unpaid",
  price: 21,
};

describe("#Title", () => {
  test("renders", () => {
    const wrapper = shallow(<Title {...props} />);
    expect(wrapper.find("Title__Wrapper").exists()).toBe(true);
  });
  test("renders proper gender icon", () => {
    const wrapper = shallow(<Title {...props} gender="female" />);
    expect(wrapper.find("GenderWoman").exists()).toBe(true);
  });
});
