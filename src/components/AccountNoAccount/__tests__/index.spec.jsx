// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountNoAccount from "..";

import { brandDefault } from "../../../records/Brand";

describe("#AccountNoAccount", () => {
  test("renders button to register", () => {
    const wrapper = shallow(
      <AccountNoAccount
        onBack={() => {}}
        onRegister={() => {}}
        onFacebookLogin={() => {}}
        onGoogleLogin={() => {}}
      />,
    );
    const registerLink = shallow(<span>{wrapper.prop("children")(brandDefault)}</span>).find(
      `[t="account.register"]`,
    );

    expect(registerLink.exists()).toBe(true);
  });
});
