// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import Close from "react-icons/lib/md/close";

import IconText from "../index";

describe("#IconText", () => {
  test("render", () => {
    const wrapper = shallow(<IconText Icon={Close}>Kek</IconText>);

    expect(wrapper).toMatchSnapshot();
  });
});
