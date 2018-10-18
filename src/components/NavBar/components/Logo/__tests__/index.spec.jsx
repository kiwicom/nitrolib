// @flow
import * as React from "react";
import { shallow } from "enzyme";

import { intlDefault } from "../../../../../records/Intl";
import { brandDefault } from "../../../../../records/Brand";

import Logo from "..";

describe("#Logo", () => {
  test("render", () => {
    const wrapper = shallow(
      <Logo height={50} width={75} brand={brandDefault} intl={intlDefault} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
