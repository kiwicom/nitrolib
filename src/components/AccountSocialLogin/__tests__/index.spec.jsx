// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import AccountPairedFacebook from "..";

describe("#AccountPairedFacebook", () => {
  test("render button to login via Facebook", () => {
    const wrapper = mount(
      <AccountPairedFacebook
        onAskSignInLink={() => {}}
        onSocialLogin={() => {}}
        email="kek@bur.com"
        pairedWith="facebook"
      />,
    );

    expect(
      wrapper
        .find(`[data-test="AccountSocialLogin"]`)
        .find("button")
        .exists(),
    ).toBe(true);
  });
});
