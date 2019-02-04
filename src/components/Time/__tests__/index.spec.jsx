// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Time from "..";

describe("#Time", () => {
  test("format", () => {
    const time = new Date(Date.UTC(2019, 2, 8, 11, 30));
    const wrapper = mount(<Time time={time} />);

    console.log(time);

    expect(wrapper.contains("12:30")).toBe(true);
  });
});
