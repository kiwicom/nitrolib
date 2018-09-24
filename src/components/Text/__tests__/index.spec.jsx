// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { intlDefault } from "../../../records/Intl";

import Text from "..";

describe("#Text", () => {
  test("string", () => {
    const wrapper = shallow(<Text t="lol" />);

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });

  test("html", () => {
    const wrapper = shallow(<Text t="lol" html />);

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });
});
