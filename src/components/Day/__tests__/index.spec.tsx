import * as React from "react";
import { mount } from "enzyme";

import Day from "..";

describe("#Day", () => {
  test("format default", () => {
    const date = new Date(Date.UTC(2017, 9, 28));
    const wrapper = mount(<Day date={date} />);

    expect(wrapper).not.toBeUndefined();
    // TODO: separate date fns locale promise and test
  });

  test("format custom", () => {
    const date = new Date(Date.UTC(2017, 9, 28));
    const wrapper = mount(<Day date={date} format="dd MM | yyyy" />);

    expect(wrapper).not.toBeUndefined();
    // TODO: separate date fns locale promise and test
  });
});
