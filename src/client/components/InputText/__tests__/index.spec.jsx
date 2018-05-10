// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";

import InputText from "../index";
import { brandDefault } from "../../../records/Brand";

describe("#InputText", () => {
  test("removing unwanted props", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        placeholder="Placeholder"
        label={<div>Kekistan</div>}
        error=""
        autocomplete
      />,
    );

    expect(wrapper.find("InputText__Input").props()).toMatchSnapshot();
  });

  test("render no label", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        placeholder="Placeholder"
        error=""
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render label", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        placeholder="Placeholder"
        error=""
        label={<div>Kekistan</div>}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render show state", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        placeholder="Placeholder"
        showState
      />,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("InputText__Label")).toHaveStyleRule(
      "border",
      `1px solid ${brandDefault.theme.colors["primary-600"]}`,
    );
  });

  test("render regular error", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        placeholder="Placeholder"
        error="An error"
      />,
    );

    wrapper.setState({ visited: true });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("InputText__Error")).toHaveStyleRule(
      "color",
      brandDefault.theme.colors["danger-700"],
    );
  });

  test("render active error", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        placeholder="Placeholder"
        error="An error"
      />,
    );

    wrapper.setState({ visited: true, active: true });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("InputText__Error")).toHaveStyleRule(
      "color",
      brandDefault.theme.colors["primary-600"],
    );
  });

  test("render show state error", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        placeholder="Placeholder"
        error="An error"
        showState
      />,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("InputText__Error")).toHaveStyleRule(
      "color",
      brandDefault.theme.colors["danger-700"],
    );
  });

  test("on change basic", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={onChange}
        placeholder="Placeholder"
        error="An error"
      />,
    );

    wrapper.find("InputText__Input").simulate("change", { target: { id: "kek", value: "lol" } });

    expect(onChange).toBeCalledWith("lol", "kek");
  });

  test("on focus no callback", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        placeholder="Placeholder"
        error="An error"
      />,
    );

    wrapper.find("InputText__Input").simulate("focus", { target: { id: "kek", value: "lol" } });
    expect(wrapper.state()).toEqual({ active: true, visited: false });
  });

  test("on focus callback", () => {
    const onFocus = jest.fn();
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        onFocus={onFocus}
        placeholder="Placeholder"
        error="An error"
      />,
    );

    wrapper.find("InputText__Input").simulate("focus", { target: { id: "kek", value: "lol" } });

    expect(wrapper.state()).toEqual({ active: true, visited: false });
    expect(onFocus).toBeCalledWith("lol", "kek");
  });

  test("on blur no callback", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        placeholder="Placeholder"
        error="An error"
      />,
    );

    wrapper.find("InputText__Input").simulate("blur");
    expect(wrapper.state()).toEqual({ active: false, visited: true });
  });

  test("on blur callback", () => {
    const onBlur = jest.fn();
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        onBlur={onBlur}
        placeholder="Placeholder"
        error="An error"
      />,
    );

    wrapper.find("InputText__Input").simulate("blur", { target: { id: "kek", value: "lol" } });

    expect(wrapper.state()).toEqual({ active: false, visited: true });
    expect(onBlur).toBeCalledWith("lol", "kek");
  });
});
