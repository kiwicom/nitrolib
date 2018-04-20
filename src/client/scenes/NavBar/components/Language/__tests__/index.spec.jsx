// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Language from "../index";

describe("#Language", () => {
  test("render", () => {
    const wrapper = shallow(<Language />);

    expect(wrapper).toMatchSnapshot();
  });

  test("opens when clicked", () => {
    const wrapper = shallow(<Language />);
    wrapper.instance().handleToggle();

    expect(wrapper.state().shown).toEqual(true);
  });
});
