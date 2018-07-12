// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import BrandName from "..";

describe("#BrandName", () => {
  test("render", () => {
    const wrapper = shallow(<BrandName />);

    expect(wrapper).toMatchSnapshot();
  });
});
