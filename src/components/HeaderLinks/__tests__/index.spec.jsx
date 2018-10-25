// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import HeaderLinks from "..";

const props = {
  searchParams: {
    currency: "eur",
    language: "en",
    adultsCount: 1,
    childrenCount: 0,
    aid: true,
  },
  urlParam: "search",
};

describe("#Currency", () => {
  test("render", () => {
    const wrapper = shallow(<HeaderLinks {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
