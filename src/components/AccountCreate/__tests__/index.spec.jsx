// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import AccountCreate from "..";

import { intlDefault } from "../../../records/Intl";

describe("#AccountCreate", () => {
  test("render", () => {
    const wrapper = shallow(
      <AccountCreate
        email=""
        password=""
        passwordConfirm=""
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
        onPasswordConfirmChange={() => {}}
        onContinue={() => {}}
      />,
    );

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });

  test("validation errors", () => {
    const wrapper = shallow(
      <AccountCreate
        email=""
        password=""
        passwordConfirm=""
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
        onPasswordConfirmChange={() => {}}
        onContinue={() => {}}
        emailError="Wrong format of e-mail"
        passwordError="Password should be more complex"
        passwordConfirmError="Passwords do not match"
      />,
    );

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });
});
