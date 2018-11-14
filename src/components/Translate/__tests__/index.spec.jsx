// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { intlDefault } from "../../../records/Intl";

import Translate from "..";

describe("#Translate", () => {
  test("string", () => {
    const wrapper = shallow(<Translate t="lol" />);

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });

  test("html", () => {
    const wrapper = shallow(<Translate t="lol" html />);

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });
});
