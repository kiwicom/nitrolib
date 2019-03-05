// @flow scrict
import * as React from "react";
import { mount } from "enzyme";

import YourPackage from "..";

import { data } from "../mockedData";
import { themeDefault } from "../../../records/Theme";

describe("#YourPackage", () => {
  test("render", () => {
    const wrapper = mount(<YourPackage package={data} />);
    expect(wrapper.find("YourPackage__ContentWrapper")).toHaveStyleRule(
      "background",
      themeDefault.orbit.paletteWhite,
    );

    wrapper.setProps({ search: true });
    expect(wrapper.find("YourPackage__ButtonWrapper")).toHaveStyleRule(
      "margin-right",
      themeDefault.orbit.spaceMedium,
    );
  });
});
