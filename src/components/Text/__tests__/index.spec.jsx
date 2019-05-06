// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Text from "..";

describe("#Text", () => {
  test("string", () => {
    const wrapper = shallow(<Text t="lol" />);

    expect(wrapper.find("Text").exists()).toBe(true);
  });

  test("html", () => {
    const wrapper = shallow(<Text t="lol" html />);

    expect(wrapper.find("Translate").prop("html")).toBe(true);
  });
});
