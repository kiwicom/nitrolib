// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";

import SectionHeading from "..";

describe("#SectionHeading", () => {
  test("render", () => {
    const wrapper = mount(<SectionHeading t="test" icon={<Airplane />} />);

    expect(wrapper.contains("test")).toBe(true);
  });
});
