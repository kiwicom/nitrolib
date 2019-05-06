// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import HeaderLinks from "..";

import { props, response } from "../__mocks__/api";

describe("HeaderLinks", () => {
  test("should render correctly", () => {
    // TODO replace this with a marble test
    const wrapper = shallow(<HeaderLinks {...props} testResponse={response} />);

    expect(wrapper.find("HeaderLinks__Desktop").exists()).toBe(true);
  });
});
