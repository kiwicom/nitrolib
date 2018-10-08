// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountNoAccount from "..";
import { intlDefault } from "../../../records/Intl";

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
