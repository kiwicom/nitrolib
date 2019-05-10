// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import Duration from "..";

describe("#Duration", () => {
  test("format default", () => {
    const dateFrom = new Date(Date.UTC(2017, 9, 28, 10));
    const dateTo = new Date(Date.UTC(2017, 9, 28, 11));

    const wrapper = mount(<Duration from={dateFrom} to={dateTo} />);
    // TODO: separate date fns locale promise and test

    expect(wrapper).not.toBeUndefined();
  });

  test("format custom", () => {
    const dateFrom = new Date(Date.UTC(2017, 9, 28, 10));
    const dateTo = new Date(Date.UTC(2017, 9, 28, 12));

    const wrapper = mount(<Duration from={dateFrom} to={dateTo} format="HH:mm:ss" />);
    // TODO: separate date fns locale promise and test

    expect(wrapper).not.toBeUndefined();
  });
});
