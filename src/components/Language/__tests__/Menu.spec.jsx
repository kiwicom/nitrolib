// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Menu from "../Menu";

describe("#Menu", () => {
  test("changes continent filter", () => {
    const wrapper = shallow(<Menu onChange={jest.fn()} />);
    wrapper.instance().handleContinent("eu");

    expect(wrapper.state().continent).toEqual("eu");
  });

  test("redirects to new language", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Menu onChange={onChange} />);
    const setHrefMockFn = jest.fn();

    window.location.assign = setHrefMockFn;
    wrapper.instance().changeLanguage("cz");

    expect(setHrefMockFn).toBeCalledWith("null/cz/");
    expect(onChange).toBeCalledWith("cz");
  });

  test("filters languages properly", () => {
    const languages = {
      cz: { id: "cz", continent: "eu" },
      en: { id: "en", continent: "us" },
      dk: { id: "dk", continent: "uae" },
      se: { id: "se", continent: "ds" },
    };
    const continent = "eu";
    const wrapper = shallow(<Menu onChange={jest.fn()} />).setState({ continent });

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
