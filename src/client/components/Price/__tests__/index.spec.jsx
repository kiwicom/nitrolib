// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Price from "../index";

describe("#Price", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<Price value={1234} />);

    expect(wrapper).toMatchSnapshot();
  });
});
