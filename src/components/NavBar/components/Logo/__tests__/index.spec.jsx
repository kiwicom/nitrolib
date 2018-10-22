// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Logo from "..";

describe("#Logo", () => {
  test("render", () => {
    const wrapper = shallow(<Logo onClick={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
