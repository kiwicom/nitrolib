// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import HeaderLinks from "..";

const props = {
  currency: "EUR",
  language: "CRO",
  adultsCount: 1,
  childrenCount: 0,
  aid: false,
};

describe("#Currency", () => {
  test("render", () => {
    const wrapper = shallow(<HeaderLinks {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
