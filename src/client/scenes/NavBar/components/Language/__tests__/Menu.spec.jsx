// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Menu from "../Menu";

describe("#Menu", () => {
  test("changes continent filter", () => {
    const wrapper = shallow(<Menu />);
    wrapper.instance().handleContinent("eu");

    expect(wrapper.state().continent).toEqual("eu");
  });

  test("redirects to new language", () => {
    const wrapper = shallow(<Menu />);
    const setHrefMockFn = jest.fn();

    window.location.assign = setHrefMockFn;
    wrapper.instance().changeLanguage("cz");

    expect(setHrefMockFn).toBeCalledWith("null/cz/");
  });

  test("Calculates width for language picker correctly", () => {
    const wrapper = shallow(<Menu />);
    const emptyFilteredLanguages = [];
    const filteredLanguages = ["cz", "en", "dk", "se", "fi", "de"];

    expect(wrapper.instance().getLanguageWrapperWidth(emptyFilteredLanguages)).toBe(360);
    expect(wrapper.instance().getLanguageWrapperWidth(filteredLanguages)).toBe(540);
  });

  test("Calculates height for language picker correctly", () => {
    const wrapper = shallow(<Menu />);
    const emptyFilteredLanguages = [];
    const filteredLanguages = ["cz", "en", "dk", "se", "fi", "de"];
    const longFilteredLanguages = Array.from("x".repeat(62));

    expect(wrapper.instance().getLanguageWrapperHeight(emptyFilteredLanguages)).toBe(0);
    expect(wrapper.instance().getLanguageWrapperHeight(filteredLanguages)).toBe(62);
    expect(wrapper.instance().getLanguageWrapperHeight(longFilteredLanguages)).toBe(651);
  });

  test("Calculates number of collumns for language picker correctly", () => {
    const wrapper = shallow(<Menu />);
    const filteredLanguages = ["cz", "en", "dk", "se"];
    const longFilteredLanguages = Array.from("x".repeat(62));

    expect(wrapper.instance().getWidthConstant(filteredLanguages)).toBe(2);
    expect(wrapper.instance().getWidthConstant(longFilteredLanguages)).toBe(3);
  });

  test("filters languages properly", () => {
    const languages = {
      cz: { id: "cz", continent: "eu" },
      en: { id: "en", continent: "us" },
      dk: { id: "dk", continent: "uae" },
      se: { id: "se", continent: "ds" },
    };
    const continent = "eu";
    const wrapper = shallow(<Menu />).setState({ continent });

    const filteredLanguages = wrapper.instance().filterLanguages(languages);
    expect(filteredLanguages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "cz",
        }),
      ]),
    );
    expect(filteredLanguages.length).toEqual(1);
  });
});
