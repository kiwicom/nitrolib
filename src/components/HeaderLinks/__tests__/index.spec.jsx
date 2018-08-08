// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import HeaderLinks from "../index";

describe("#Currency", () => {
  test("render", async () => {
    const wrapper = shallow(<HeaderLinks />);

    expect(wrapper).toMatchSnapshot();
  });
});
