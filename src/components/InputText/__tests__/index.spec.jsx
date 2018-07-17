// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";

import InputText from "..";

import { brandDefault } from "../../../records/Brand";

describe("#InputText", () => {
  test("removing unwanted props", () => {
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={jest.fn()}
        onError={jest.fn()}
        normalize={jest.fn()}
        validate={jest.fn()}
        corrector={jest.fn()}
        placeholder="Placeholder"
        label={<div>Kekistan</div>}
        autocomplete
        inputRef={() => {}}
      />,
    );

    expect(wrapper.find("InputText__Input").props()).toMatchSnapshot();
  });

  test("render no label", () => {
    const wrapper = shallow(
      <InputText id="kek" value="A value" onChange={jest.fn()} placeholder="Placeholder" />,
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

  test("render hint", () => {
    const wrapper = shallow(
      <InputText id="kek" value="A value" onChange={jest.fn()} placeholder="Placeholder" />,
    );

    wrapper.setState({ hint: "hint" });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("InputText__Hint")).toHaveStyleRule(
      "color",
      brandDefault.theme.colors["primary-600"],
    );
  });

  test("on change basic", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<InputText id="kek" value="A value" onChange={onChange} />);

    wrapper.find("InputText__Input").simulate("change", { target: { id: "kek", value: "lol" } });

    expect(onChange).toBeCalledWith("lol", "kek");
  });

  test("on change with on error", () => {
    const onChange = jest.fn();
    const onError = jest.fn();
    const wrapper = shallow(
      <InputText id="kek" value="A value" onChange={onChange} onError={onError} />,
    );

    wrapper.find("InputText__Input").simulate("change", { target: { id: "kek", value: "lol" } });

    expect(onChange).toBeCalledWith("lol", "kek");
    expect(onError).toBeCalledWith("", "kek");
  });

  test("on change normalized", () => {
    const onChange = jest.fn();
    const onError = jest.fn();
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={onChange}
        onError={onError}
        normalize={() => "normal"}
      />,
    );

    wrapper.find("InputText__Input").simulate("change", { target: { id: "kek", value: "lol" } });

    expect(onChange).toBeCalledWith("normal", "kek");
    expect(onError).toBeCalledWith("", "kek");
  });

  test("on change validated", () => {
    const onChange = jest.fn();
    const onError = jest.fn();
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={onChange}
        onError={onError}
        validate={() => "error"}
      />,
    );

    wrapper.find("InputText__Input").simulate("change", { target: { id: "kek", value: "lol" } });

    expect(onChange).toBeCalledWith("lol", "kek");
    expect(onError).toBeCalledWith("error", "kek");
  });

  test("on change corrected", () => {
    const onChange = jest.fn();
    const onError = jest.fn();
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={onChange}
        onError={onError}
        placeholder="Placeholder"
        corrector={() => "correct"}
      />,
    );

    wrapper.find("InputText__Input").simulate("change", { target: { id: "kek", value: "lol" } });

    expect(onChange).toBeCalledWith("lol", "kek");
    expect(onError).toBeCalledWith("", "kek");
    expect(wrapper.state("hint")).toBe("correct");
  });

  test("on focus no callback", () => {
    const wrapper = shallow(
      <InputText id="kek" value="A value" onChange={jest.fn()} placeholder="Placeholder" />,
    );

    wrapper.find("InputText__Input").simulate("focus", { target: { id: "kek", value: "lol" } });
    expect(wrapper.state()).toEqual({ active: true, visited: false, hint: "" });
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
      />,
    );

    wrapper.find("InputText__Input").simulate("focus", { target: { id: "kek", value: "lol" } });

    expect(wrapper.state()).toEqual({ active: true, visited: false, hint: "" });
    expect(onFocus).toBeCalledWith({ target: { id: "kek", value: "lol" } });
  });

  test("on blur no callback", () => {
    const wrapper = shallow(
      <InputText id="kek" value="A value" onChange={jest.fn()} placeholder="Placeholder" />,
    );

    wrapper.find("InputText__Input").simulate("blur");
    expect(wrapper.state()).toEqual({ active: false, visited: true, hint: "" });
  });

  test("on blur callback", () => {
    const onBlur = jest.fn();
    const wrapper = shallow(
      <InputText id="kek" value="A value" onChange={jest.fn()} onBlur={onBlur} />,
    );

    wrapper.find("InputText__Input").simulate("blur", { target: { id: "kek", value: "lol" } });

    expect(wrapper.state()).toEqual({ active: false, visited: true, hint: "" });
    expect(onBlur).toBeCalledWith({ target: { id: "kek", value: "lol" } });
  });

  test("on hint", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<InputText id="kek" value="A value" onChange={onChange} />);

    wrapper.setState({ hint: "lol" });
    wrapper.find("InputText__Hint").simulate("click");

    expect(onChange).toBeCalledWith("lol", "kek");
  });

  test("on hint with error", () => {
    const onChange = jest.fn();
    const onError = jest.fn();
    const wrapper = shallow(
      <InputText
        id="kek"
        value="A value"
        onChange={onChange}
        onError={onError}
        validate={() => "error"}
      />,
    );

    wrapper.setState({ hint: "lol" });
    wrapper.find("InputText__Hint").simulate("click");

    expect(onChange).toBeCalledWith("lol", "kek");
    expect(onError).toBeCalledWith("error", "kek");
  });
});
