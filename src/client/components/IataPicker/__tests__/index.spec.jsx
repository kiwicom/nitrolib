// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import IataPicker from "../index";

describe("#IataPicker", () => {
  test("render", () => {
    const wrapper = shallow(<IataPicker id="test" value="" onSelect={jest.fn()} error="" />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render open", () => {
    const wrapper = shallow(<IataPicker id="test" value="VIE" onSelect={jest.fn()} error="" />);

    wrapper.setState({ open: true });

    expect(wrapper).toMatchSnapshot();
  });

  test("handle change", () => {
    const onSelect = jest.fn();
    const wrapper = shallow(<IataPicker id="test" value="VIE" onSelect={onSelect} error="" />);

    wrapper.instance().handleChange({ target: { value: "kek" } });

    expect(onSelect).toBeCalledWith("kek");
  });

  test("handle select", () => {
    const onSelect = jest.fn();
    const wrapper = shallow(<IataPicker id="test" value="VIE" onSelect={onSelect} error="" />);

    wrapper.setState({ open: true });
    wrapper.instance().handleSelect("kek");

    expect(onSelect).toBeCalledWith("kek");
    expect(wrapper.state("open")).toBe(false);
  });

  test("handle focus", () => {
    const onSelect = jest.fn();
    const wrapper = shallow(<IataPicker id="test" value="VIE" onSelect={onSelect} error="" />);

    wrapper.instance().handleFocus();

    expect(wrapper.state("open")).toBe(true);
  });

  test("handle key down - tab", () => {
    const onSelect = jest.fn();
    const wrapper = shallow(<IataPicker id="test" value="VIE" onSelect={onSelect} error="" />);

    wrapper.setState({ open: true });
    wrapper.instance().handleKeyDown({ key: "Tab" });

    expect(wrapper.state("open")).toBe(false);
  });

  test("handle key down - other", () => {
    const onSelect = jest.fn();
    const wrapper = shallow(<IataPicker id="test" value="VIE" onSelect={onSelect} error="" />);

    wrapper.setState({ open: true });
    wrapper.instance().handleKeyDown({ key: "Enter" });

    expect(wrapper.state("open")).toBe(true);
  });

  test("handle click outside", () => {
    const onSelect = jest.fn();
    const wrapper = shallow(<IataPicker id="test" value="VIE" onSelect={onSelect} error="" />);

    wrapper.setState({ open: true });
    wrapper.instance().handleClickOutside();

    expect(wrapper.state("open")).toBe(false);
  });
});
