// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import { themeDefault } from "../../../../../../../records/Theme";

import Sector from "..";

describe("#Sector", () => {
  test("render - landing", () => {
    const data = {
      from: "Prague, Czech Republic",
      to: "Denpasar, Bali",
      stops: "0",
      note: "Transfer to hotel NOT included",
    };

    const wrapper = mount(<Sector data={data} direction="landing" />);

    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "margin-bottom",
      themeDefault.orbit.spaceSmall,
    );
    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "padding-top",
      themeDefault.orbit.spaceSmall,
    );
    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "padding-right",
      themeDefault.orbit.spaceLarge,
    );
    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "padding-bottom",
      themeDefault.orbit.spaceMedium,
    );
    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "padding-left",
      themeDefault.orbit.spaceLarge,
    );
    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "background",
      themeDefault.orbit.backgroundBody,
    );
    expect(wrapper.find("Sector__RouteIcon")).toHaveStyleRule(
      "margin-right",
      themeDefault.orbit.spaceLarge,
    );
  });

  test("render - takeOff", () => {
    const data = {
      from: "Prague, Czech Republic",
      to: "Denpasar, Bali",
      stops: "0",
      note: "Transfer to hotel NOT included",
    };

    const wrapper = mount(<Sector data={data} direction="takeOff" />);

    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "margin-bottom",
      themeDefault.orbit.spaceSmall,
    );
    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "padding-top",
      themeDefault.orbit.spaceSmall,
    );
    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "padding-right",
      themeDefault.orbit.spaceLarge,
    );
    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "padding-bottom",
      themeDefault.orbit.spaceMedium,
    );
    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "padding-left",
      themeDefault.orbit.spaceLarge,
    );
    expect(wrapper.find("Sector__Wrapper")).toHaveStyleRule(
      "background",
      themeDefault.orbit.backgroundBody,
    );
    expect(wrapper.find("Sector__RouteIcon")).toHaveStyleRule(
      "margin-right",
      themeDefault.orbit.spaceLarge,
    );
  });
});
