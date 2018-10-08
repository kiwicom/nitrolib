// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountLogin from "..";
import { intlDefault } from "../../../records/Intl";

describe("#AccountLogin", () => {
  test("render", () => {
    const wrapper = shallow(
      <AccountLogin
        email=""
        onNoAccount={() => {}}
        onEmailChange={() => {}}
        onFacebookLogin={() => {}}
        onGoogleLogin={() => {}}
        onContinue={() => {}}
      />,
    );

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });
});
