// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Menu from "../Menu";

describe("#Menu", () => {
  test("render full", () => {
    const wrapper = shallow(<Menu onChange={jest.fn()} flat={false} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render flat", () => {
    const wrapper = shallow(<Menu onChange={jest.fn()} flat />);

    expect(wrapper).toMatchSnapshot();
  });

  test("changes continent filter", () => {
    const wrapper = shallow(<Menu onChange={jest.fn()} flat={false} />);
    wrapper.instance().handleContinent("eu");

    expect(wrapper.state().continent).toEqual("eu");
  });

  test("redirects to new language", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Menu onChange={onChange} flat={false} />);

    wrapper.instance().handleChange("cz");

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
    const wrapper = shallow(<Menu onChange={jest.fn()} flat={false} />).setState({ continent });

    const filteredLanguages = wrapper.instance().getFilteredLanguages(languages);
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
