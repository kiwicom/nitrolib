// @flow strict
/* eslint-disable react/no-danger */
import * as React from "react";
import { mount } from "enzyme";

import Translate from "..";

describe("#Translate", () => {
  test("string", () => {
    const wrapper = mount(<Translate t="lol" />);

    expect(wrapper.contains("lol")).toBe(true);
  });

  test("html", () => {
    const wrapper = mount(<Translate t="lol" html />);

    expect(wrapper.contains(<span dangerouslySetInnerHTML={{ __html: "lol" }} />)).toBe(true);
  });
});
