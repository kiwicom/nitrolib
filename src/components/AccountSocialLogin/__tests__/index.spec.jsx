// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountPairedFacebook from "..";

describe("#AccountPairedFacebook", () => {
  test("render", () => {
    const wrapper = shallow(
      <AccountPairedFacebook
        onAskSignInLink={() => {}}
        onSocialLogin={() => {}}
        email="kek@bur.com"
        pairedWith="facebook"
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
