// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Language from "../index";

describe("#Language", () => {
  test("render", () => {
    const wrapper = shallow(<Language onChange={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("opens when clicked", () => {
    const wrapper = shallow(<Language onChange={jest.fn()} />);
    wrapper.instance().handleToggle();

    expect(wrapper.state().shown).toEqual(true);
  });
});
