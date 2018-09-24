// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Language from "..";

describe("#Language", () => {
  test("render", () => {
    const wrapper = shallow(<Language onChange={jest.fn()} onLog={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render - native", () => {
    const wrapper = shallow(<Language onChange={jest.fn()} onLog={jest.fn()} native />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render - flat", () => {
    const wrapper = shallow(<Language onChange={jest.fn()} onLog={jest.fn()} flat />);

    expect(wrapper).toMatchSnapshot();
  });
});
