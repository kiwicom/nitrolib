// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Flag from "../index";

describe("#Flag", () => {
  test("render", () => {
    const wrapper = shallow(<Flag country="sk" />);

    expect(wrapper).toMatchSnapshot();
  });
});
