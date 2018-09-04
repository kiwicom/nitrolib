// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Desktop from "../index";

describe("#Desktop", () => {
  test("render", () => {
    const wrapper = shallow(<Desktop>asd</Desktop>);

    expect(wrapper.find("Desktop__Wrapper").shallow()).toMatchSnapshot();
  });
});
