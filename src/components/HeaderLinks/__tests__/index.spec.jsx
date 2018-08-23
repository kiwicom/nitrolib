// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import HeaderLinks from "..";

describe("#Currency", () => {
  test("render", () => {
    const wrapper = shallow(<HeaderLinks provider="none" />);

    expect(wrapper).toMatchSnapshot();
  });
});
