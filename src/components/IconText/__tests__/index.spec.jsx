// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";

import IconText from "..";

describe("#IconText", () => {
  test("render", () => {
    const wrapper = shallow(<IconText icon={<Airplane />}>Kek</IconText>);

    expect(wrapper).toMatchSnapshot();
  });
});
