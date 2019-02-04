// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";

import IconText from "..";

describe("#IconText", () => {
  test("props", () => {
    const wrapper = shallow(<IconText icon={<Airplane />}>Kek</IconText>);
    expect(
      wrapper
        .find("IconText__Text")
        .render()
        .text(),
    ).toBe("Kek");

    expect(wrapper.find("Airplane").exists()).toBe(true);
  });
});
