// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Title from "../index";

describe("#Title", () => {
  test("render", () => {
    const wrapper = shallow(<Title />);

    expect(wrapper).toMatchSnapshot();
  });
});
