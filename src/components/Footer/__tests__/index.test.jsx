// @noflow

import * as React from "react";
import { shallow } from "enzyme/build";

import Footer from "../index";

describe("#Footer", () => {
  test("render", () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper.find("Footer__Wrapper").shallow()).toMatchSnapshot();
  });
});
