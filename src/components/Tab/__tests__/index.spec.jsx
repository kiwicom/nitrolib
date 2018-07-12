// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { brandDefault } from "../../records/Brand";
import Tab from "..";

describe("#Tab", () => {
  test("render default", () => {
    const wrapper = shallow(
      <Tab id="test" onClick={jest.fn()}>
        Kek
      </Tab>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule("background", brandDefault.theme.colors.white);
    expect(wrapper).toHaveStyleRule("cursor", "pointer");
  });

  test("render active", () => {
    const wrapper = shallow(
      <Tab id="test" onClick={jest.fn()} active>
        Kek
      </Tab>,
    );

    expect(wrapper).toHaveStyleRule("background", brandDefault.theme.colors["neutral-100"]);
    expect(wrapper).toHaveStyleRule(
      "box-shadow",
      `0 0 3px 0 ${brandDefault.theme.colors["neutral-400"]} inset`,
    );
  });

  test("handle click", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Tab id="test" onClick={onClick} active>
        Kek
      </Tab>,
    );

    wrapper.find("Tab__Container").simulate("click");

    expect(onClick).toBeCalledWith("test");
  });
});
