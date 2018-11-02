// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountPassword from "..";

import { intlDefault } from "../../../records/Intl";

describe("#AccountPassword", () => {
  test("render", () => {
    const wrapper = shallow(
      <AccountPassword
        onAskSignInLink={() => {}}
        onChangeEmail={() => {}}
        onPasswordChange={() => {}}
        onSignIn={() => {}}
        password="asdfg"
        email="example@example.com"
      />,
    );

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });
});
