// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Help from "../index";

describe("#Help", () => {
  test("render", () => {
    const wrapper = shallow(<Help inverted={false} onOpen={jest.fn()} />);

    expect(wrapper.find("Button").exists()).toBe(true);
    expect(wrapper.find("Button").prop("data-test")).toBe("NavBar-Help");
  });
});
