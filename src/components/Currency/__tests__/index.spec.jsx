// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Currency from "..";

describe("#Currency", () => {
  test("render", () => {
    const wrapper = shallow(<Currency onLog={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render - native", () => {
    const wrapper = shallow(<Currency onLog={jest.fn()} native />);

    expect(wrapper).toMatchSnapshot();
  });
});
