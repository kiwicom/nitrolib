// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Help from "../index";

describe("#Help", () => {
  test("render", () => {
    const wrapper = shallow(<Help onOpen={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });
});
