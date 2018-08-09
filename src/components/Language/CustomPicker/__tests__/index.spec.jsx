// @flow
import * as React from "react";
import { shallow } from "enzyme";

import { langInfoDefault } from "../../../../records/LangInfo";
import { brandLanguageDefault } from "../../../../records/BrandLanguage";
import { tKeys } from "../../../../records/Continents";
import CustomPicker from "../index";

const current = langInfoDefault;
const languages = [brandLanguageDefault.languages.en];
const continents = Object.keys(tKeys);

describe("#Language/CustomPicker", () => {
  test("render", () => {
    const wrapper = shallow(
      <CustomPicker
        current={current}
        languages={languages}
        continents={continents}
        onChange={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("opens when clicked", () => {
    const wrapper = shallow(
      <CustomPicker
        current={current}
        languages={languages}
        continents={continents}
        onChange={jest.fn()}
      />,
    );
    wrapper.instance().handleToggle();

    expect(wrapper.state().shown).toEqual(true);
    expect(wrapper.find("Menu")).toHaveLength(1);
  });

  test("handles change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <CustomPicker
        current={current}
        languages={languages}
        continents={continents}
        onChange={onChange}
      />,
    );

    wrapper.instance().handleChange("kek");

    expect(onChange).toBeCalledWith("kek");
  });

  test("closes on change", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <CustomPicker
        current={current}
        languages={languages}
        continents={continents}
        onChange={onChange}
      />,
    );

    wrapper.setState({ shown: true });
    wrapper.instance().handleChange("kek");

    expect(wrapper.state().shown).toEqual(false);
    expect(wrapper.find("Menu")).toHaveLength(0);
  });
});
