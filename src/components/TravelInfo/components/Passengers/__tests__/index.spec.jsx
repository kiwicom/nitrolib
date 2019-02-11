// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Passengers from "..";

describe("#Passengers", () => {
  test("render", () => {
    // eslint-disable-next-line
    const wrapper = shallow(<Passengers adults={2} children={1} />);

    expect(wrapper).toMatchSnapshot();
  });
});
