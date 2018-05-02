// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Day from "../index";

describe("#Day", () => {
  test("format default", () => {
    const date = new Date(Date.UTC(2017, 9, 28));
    const wrapper = shallow(<Day date={date} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("format custom", () => {
    const date = new Date(Date.UTC(2017, 9, 28));
    const wrapper = shallow(<Day date={date} format="DD MM | YYYY" />);

    expect(wrapper).toMatchSnapshot();
  });
});
