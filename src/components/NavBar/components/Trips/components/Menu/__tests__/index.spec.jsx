// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Menu from "..";

describe("#Menu", () => {
  test("render", () => {
    const wrapper = shallow(<Menu>x</Menu>);

    expect(wrapper).toMatchSnapshot();
  });
});
