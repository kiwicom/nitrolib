// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountPairedFacebook from "..";

describe("#AccountPairedFacebook", () => {
  test("render", () => {
    const wrapper = shallow(
      <AccountPairedFacebook
        onAskSignInLink={() => {}}
        onFacebookLogin={() => {}}
        onGoogleLogin={() => {}}
        email="kek@bur.com"
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
