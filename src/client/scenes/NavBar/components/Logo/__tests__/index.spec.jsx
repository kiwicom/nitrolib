// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Logo from "../index";

describe("#Logo", () => {
  test("render", () => {
    const wrapper = shallow(<Logo height={50} width={75} />);

    expect(wrapper).toMatchSnapshot();
  });
});
