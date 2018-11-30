// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { intlDefault } from "../../../records/Intl";

import Footer from "..";

describe("#Footer", () => {
  test("render", () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });
});
