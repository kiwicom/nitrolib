// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Starred from "..";

// TODO: will be rewritten by upcoming Stack MR

describe("#Starred", () => {
  test("render open", () => {
    const wrapper = shallow(<Starred positionMenuDesktop={0} positionMenuTablet={0} />);

    expect(wrapper.prop("children")({ open: true, onToggle: jest.fn() })).toMatchSnapshot();
  });

  test("render closed", () => {
    const wrapper = shallow(<Starred positionMenuDesktop={0} positionMenuTablet={0} />);

    expect(wrapper).toMatchSnapshot();
  });
});
