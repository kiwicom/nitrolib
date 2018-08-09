// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Currency from "../index";

describe("#Currency", () => {
  test("render", () => {
    const wrapper = shallow(<Currency />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render - native", () => {
    const wrapper = shallow(<Currency native />);

    expect(wrapper).toMatchSnapshot();
  });
});
