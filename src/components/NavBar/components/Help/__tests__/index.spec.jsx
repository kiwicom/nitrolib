// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Help from "../index";

describe("#Help", () => {
  test("render", () => {
    const wrapper = shallow(<Help faq={<>lol</>} onLog={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("toggle", () => {
    window.location.assign = jest.fn();
    const wrapper = shallow(<Help faq={<>lol</>} onLog={jest.fn()} />);

    wrapper.instance().handleToggle();

    expect(wrapper.state("shown")).toBe(true);
    expect(window.location.assign).toBeCalledWith("/?help=%2F");
  });
});
