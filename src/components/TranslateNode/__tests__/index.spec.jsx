// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { intlDefault } from "../../../records/Intl";

import TranslateNode from "..";

describe("#TranslateNode", () => {
  test("string", () => {
    const wrapper = shallow(
      <TranslateNode t="lol __x__ kek bur" values={{ x: <span>lmao</span> }} />,
    );

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });
});
