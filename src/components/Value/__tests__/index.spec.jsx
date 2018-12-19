// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Value from "..";

describe("#Value", () => {
  test("initial value none", () => {
    const wrapper = shallow(<Value>{jest.fn()}</Value>);

    expect(wrapper.state("value")).toBe("");
  });

  test("initial value", () => {
    const wrapper = shallow(<Value initial="kek">{jest.fn()}</Value>);

    expect(wrapper.state("value")).toBe("kek");
  });

  test("handle change", () => {
    const wrapper = shallow(<Value>{jest.fn()}</Value>);

    expect(wrapper.state("value")).toBe("");
    wrapper.instance().handleChange("kek");
    expect(wrapper.state("value")).toBe("kek");
  });

  test("handle change empty", () => {
    const wrapper = shallow(<Value>{jest.fn()}</Value>);

    wrapper.setState({ value: "kek" });

    wrapper.instance().handleChange();
    expect(wrapper.state("value")).toBe("");
  });
});
