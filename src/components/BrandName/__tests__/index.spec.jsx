// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import BrandName from "..";

import { brandDefault } from "../../../records/Brand";

describe("#BrandName", () => {
  test("render", () => {
    const wrapper = shallow(<BrandName />);

    expect(wrapper.prop("children")(brandDefault)).toBe(brandDefault.name);
  });
});
