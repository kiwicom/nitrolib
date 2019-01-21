// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Button from "..";

describe("#Button", () => {
  test("string", () => {
    const wrapper = shallow(<Button onClick={() => "kek"} t="lol" />);

    expect(wrapper).toMatchSnapshot();
  });

  test("html", () => {
    const wrapper = shallow(<Button onClick={() => "kek"} t="lol" html />);

    expect(wrapper).toMatchSnapshot();
  });
});
