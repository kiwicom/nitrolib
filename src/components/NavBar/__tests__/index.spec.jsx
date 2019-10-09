// @flow strict
import { shallow } from "enzyme";
import * as React from "react";

import Navbar from "..";

describe("#Navbar hide prop", () => {
  const props = {
    starred: "Starred",
    portal: "",
    subscription: "subscription",
    debug: "debug",
    onOpenFaq: jest.fn(),
    onSetModal: jest.fn(),
    onLogoClick: jest.fn(),
    onSaveLanguage: jest.fn(),
    onSelectTrip: jest.fn(),
  };

  it("all elements should be visible by default", () => {
    const wrapper = shallow(<Navbar {...props} />);

    expect(
      wrapper
        .dive()
        .find("Currency")
        .exists(),
    ).toBe(true);
    expect(
      wrapper
        .dive()
        .find("Help")
        .exists(),
    ).toBe(true);
    expect(wrapper.dive().contains("Starred")).toBe(true);
    expect(
      wrapper
        .dive()
        .find("Language")
        .exists(),
    ).toBe(true);
    expect(
      wrapper
        .dive()
        .find("Currency")
        .exists(),
    ).toBe(true);
  });

  it("should hide languages", () => {
    const wrapper = shallow(<Navbar {...props} hide="languages" />);

    expect(
      wrapper
        .dive()
        .find("Language")
        .exists(),
    ).toBe(false);
  });

  it("should hide Help", () => {
    const wrapper = shallow(<Navbar {...props} hide="help" />);

    expect(
      wrapper
        .dive()
        .find("Help")
        .exists(),
    ).toBe(false);
  });

  it("should hide mmb", () => {
    const wrapper = shallow(<Navbar {...props} hide="mmb" />);

    expect(
      wrapper
        .dive()
        .find("Menu")
        .prop("shown"),
    ).toBe(false);
  });

  it("should hide both Hide and Languages", () => {
    const wrapper = shallow(<Navbar {...props} hide={["help", "languages"]} />);

    expect(
      wrapper
        .dive()
        .find("Help")
        .exists(),
    ).toBe(false);
    expect(
      wrapper
        .dive()
        .find("Language")
        .exists(),
    ).toBe(false);
  });
});
