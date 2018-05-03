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
        normalize={val => val.replace(/[^0-9]+/g, "")}
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

    wrapper.find("InputText__Input").simulate("change", { target: { value: "kek" } });

    expect(onChange).toBeCalledWith("kek");
  });

  test("on change normalized", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={onChange}
        placeholder="Placeholder"
        normalize={val => val.replace(/[^0-9]+/g, "")}
        error="An error"
      />,
    );

    wrapper.find("InputText__Input").simulate("change", { target: { value: "12kek34" } });

    expect(onChange).toBeCalledWith("1234");
  });

  test("on focus no callback", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        placeholder="Placeholder"
        normalize={val => val.replace(/[^0-9]+/g, "")}
        error="An error"
      />,
    );

    wrapper.find("InputText__Input").simulate("focus");
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
        normalize={val => val.replace(/[^0-9]+/g, "")}
        error="An error"
      />,
    );

    wrapper.find("InputText__Input").simulate("focus");

    expect(wrapper.state()).toEqual({ active: true, visited: false });
    expect(onFocus).toBeCalled();
  });

  test("on blur no callback", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        placeholder="Placeholder"
        normalize={val => val.replace(/[^0-9]+/g, "")}
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
        normalize={val => val.replace(/[^0-9]+/g, "")}
        error="An error"
      />,
    );

    wrapper.find("InputText__Input").simulate("blur");

    expect(wrapper.state()).toEqual({ active: false, visited: true });
    expect(onBlur).toBeCalled();
  });
});
