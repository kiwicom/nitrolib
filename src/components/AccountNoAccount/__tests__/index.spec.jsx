// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountNoAccount from "..";

describe("#AccountNoAccount", () => {
  test("render", () => {
    const wrapper = shallow(
      <AccountNoAccount
        onBack={() => {}}
        onRegister={() => {}}
        onFacebookLogin={() => {}}
        onGoogleLogin={() => {}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
