// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { brandDefault } from "../../../records/Brand";

import BrandName from "..";

describe("#BrandName", () => {
  test("render", () => {
    const wrapper = shallow(<BrandName />);

    expect(wrapper.prop("children")(brandDefault)).toBe(brandDefault.name);
  });
});
