// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import { MdClose } from "react-icons/md/index";

import IconText from "..";

describe("#IconText", () => {
  test("render", () => {
    const wrapper = shallow(<IconText Icon={MdClose}>Kek</IconText>);

    expect(wrapper).toMatchSnapshot();
  });
});
