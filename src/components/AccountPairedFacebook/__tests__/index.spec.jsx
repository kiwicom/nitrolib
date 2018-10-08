// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountPairedFacebook from "..";
import { intlDefault } from "../../../records/Intl";

describe("#AccountPairedFacebook", () => {
  test("render", () => {
    const wrapper = shallow(
      <AccountPairedFacebook
        onAskSignInLink={() => {}}
        onFacebookLogin={() => {}}
        email="email@example.com"
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
