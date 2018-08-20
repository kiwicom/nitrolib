// @flow
import * as React from "react";
import { shallow } from "enzyme";

import { brandLanguageDefault } from "../../../../../records/BrandLanguage";
import { tKeys } from "../../../../../records/Continents";
import Menu from "../Menu";

const languages = [brandLanguageDefault.languages.en];
const continents = Object.keys(tKeys);

describe("#Language/CustomPicker/Menu", () => {
  test("render full", () => {
    const wrapper = shallow(
      <Menu languages={languages} continents={continents} onChange={jest.fn()} flat={false} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render flat", () => {
    const wrapper = shallow(
      <Menu languages={languages} continents={continents} onChange={jest.fn()} flat />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("changes continent filter", () => {
    const wrapper = shallow(
      <Menu languages={languages} continents={continents} onChange={jest.fn()} flat={false} />,
    );
    wrapper.instance().handleContinent("eu");

    expect(wrapper.state().continent).toEqual("eu");
  });

  test("redirects to new language", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Menu languages={languages} continents={continents} onChange={onChange} flat={false} />,
    );

    wrapper.instance().handleChange("cz");

    expect(onChange).toBeCalledWith("cz");
  });
});
