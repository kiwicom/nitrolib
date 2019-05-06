// @flow
import * as React from "react";
import { shallow } from "enzyme";

import { brandLanguageDefault } from "../../../../records/BrandLanguage";
import { tKeys } from "../../../../records/Continents";
import Menu from "../Menu";

const languages = [brandLanguageDefault.languages.en];
const continents = Object.keys(tKeys);

describe("#Language/CustomPicker/Menu", () => {
  test("render full", () => {
    const wrapper = shallow(
      <Menu
        currentId="en"
        languages={languages}
        positionMenuDesktop={0}
        positionMenuTablet={0}
        continents={continents}
        onChange={jest.fn()}
        flat={false}
      />,
    );

    expect(wrapper.find("Menu__MenuWrapper").exists()).toBe(true);
  });

  test("render flat", () => {
    const wrapper = shallow(
      <Menu
        currentId="en"
        languages={languages}
        positionMenuDesktop={0}
        positionMenuTablet={0}
        continents={continents}
        onChange={jest.fn()}
        flat
      />,
    );

    expect(wrapper.find("Menu__MenuWrapper").prop("flat")).toBe(true);
  });

  test("changes continent filter", () => {
    const wrapper = shallow(
      <Menu
        currentId="en"
        languages={languages}
        positionMenuDesktop={0}
        positionMenuTablet={0}
        continents={continents}
        onChange={jest.fn()}
        flat={false}
      />,
    );
    wrapper.instance().handleContinent("eu");

    expect(wrapper.state().continent).toEqual("eu");
  });

  test("redirects to new language", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Menu
        currentId="en"
        languages={languages}
        positionMenuDesktop={0}
        positionMenuTablet={0}
        continents={continents}
        onChange={onChange}
        flat={false}
      />,
    );

    wrapper.instance().handleChange("cz");

    expect(onChange).toBeCalledWith("cz");
  });

  test("notifies about visibility change", () => {
    const onSetModal = jest.fn();

    const wrapper = shallow(
      <Menu
        currentId="en"
        languages={languages}
        positionMenuDesktop={0}
        positionMenuTablet={0}
        continents={continents}
        onChange={jest.fn()}
        onSetModal={onSetModal}
        flat={false}
      />,
    );

    expect(onSetModal).toBeCalledTimes(1);
    expect(onSetModal).toBeCalledWith("languageMenu");

    onSetModal.mockReset();
    wrapper.unmount();

    expect(onSetModal).toBeCalledTimes(1);
    expect(onSetModal).toBeCalledWith("");
  });
});
