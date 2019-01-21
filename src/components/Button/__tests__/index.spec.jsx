// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Button from "..";

describe("#Button", () => {
  test("string", () => {
    const wrapper = shallow(<Button onClick={jest.fn()} t="kek" />);

    expect(wrapper).toMatchSnapshot();
  });

  test("html", () => {
    const wrapper = shallow(<Button onClick={jest.fn()} t="kek" html />);

    expect(wrapper).toMatchSnapshot();
  });
});
