// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountCheckEmail from "..";

describe("#AccountCheckEmail", () => {
  test("render - magicLink", () => {
    const wrapper = shallow(<AccountCheckEmail email="foo@bar.com" reason="magicLink" />);

    expect(wrapper).toMatchSnapshot();
  });

  test("render - signUpConfirmation", () => {
    const wrapper = shallow(<AccountCheckEmail email="bar@foo.com" reason="signUpConfirmation" />);

    expect(wrapper).toMatchSnapshot();
  });
});
