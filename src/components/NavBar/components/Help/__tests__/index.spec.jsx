// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Help from "..";

describe("#Help", () => {
  test("render", () => {
    const wrapper = shallow(<Help onOpen={jest.fn()} />);

    expect(wrapper.find("ButtonLink").exists()).toBe(true);
    expect(wrapper.find("ButtonLink").prop("dataTest")).toBe("NavBar-Help");
  });
});
