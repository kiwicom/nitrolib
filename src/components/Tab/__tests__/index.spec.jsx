// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Tab from "..";

describe("#Tab", () => {
  test("render default", () => {
    const wrapper = shallow(
      <Tab id="test" onClick={jest.fn()}>
        Kek
      </Tab>,
    );

    expect(wrapper.find("Tab__Container").exists()).toBe(true);
  });

  test("render active", () => {
    const wrapper = shallow(
      <Tab id="test" onClick={jest.fn()} active>
        Kek
      </Tab>,
    );

    expect(wrapper.find("Tab__Container").prop("active")).toBe(true);
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
