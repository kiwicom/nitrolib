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

  test("handles change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Language onChange={onChange} />);

    wrapper.instance().handleChange("kek");

    expect(wrapper.state().shown).toEqual(false);
    expect(onChange).toBeCalledWith("kek");
  });

  test("closes on change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Language onChange={onChange} />);

    wrapper.setState({ shown: true });
    wrapper.instance().handleChange("kek");

    expect(wrapper.state().shown).toEqual(false);
    expect(onChange).toBeCalledWith("kek");
  });
});
