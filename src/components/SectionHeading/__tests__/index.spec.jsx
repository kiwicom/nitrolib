// @flow
import * as React from "react";
import { shallow } from "enzyme";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";

import SectionHeading from "..";

describe("#SectionHeading", () => {
  test("render", () => {
    const wrapper = shallow(<SectionHeading t="test" icon={<Airplane />} />);

    expect(wrapper).toMatchSnapshot();
  });
});
