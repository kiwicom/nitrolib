// @flow
import * as React from "react";
import { shallow } from "enzyme";

import { intlDefault } from "../../../../../records/Intl";
import { brandDefault } from "../../../../../records/Brand";

import Logo from "..";

describe("#Logo", () => {
  test("render", () => {
    // $FlowIssue
    const wrapper = shallow(<Logo brand={brandDefault} intl={intlDefault} onClick={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
