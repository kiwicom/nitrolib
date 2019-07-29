import * as React from "react";
import { shallow } from "enzyme";
import GenderWoman from "@kiwicom/orbit-components/lib/icons/GenderWoman";

import Title from "..";

const props = {
  firstName: "Maria",
  lastName: "Antoinetta",
  icon: <GenderWoman />,
  orderStatus: "unpaid",
  price: 21,
};

describe("#Title", () => {
  test("renders", () => {
    const wrapper = shallow(<Title {...props} />);
    expect(wrapper.find("Title__Wrapper").exists()).toBe(true);
  });
  test("renders proper gender icon", () => {
    const wrapper = shallow(<Title {...props} />);
    expect(wrapper.find("GenderWoman").exists()).toBe(true);
  });
});
