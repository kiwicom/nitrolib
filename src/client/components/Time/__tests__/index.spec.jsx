// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Time from "../index";

describe("#Time", () => {
  test("format", () => {
    const time = new Date(Date.UTC(0, 0, 0, 10, 30));
    const wrapper = shallow(<Time time={time} />);

    expect(wrapper).toMatchSnapshot();
  });
});
