// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import HeaderLinks from "..";

const props = {
  searchParams: {
    language: "en",
  },
  urlParam: "search",
};

describe("#Currency", () => {
  test("render", () => {
    const wrapper = shallow(<HeaderLinks {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
