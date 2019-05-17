// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import CreateAccount from "..";

describe("#CreateAccount", () => {
  test("render", () => {
    const wrapper = mount(
      <CreateAccount
        email=""
        password=""
        passwordConfirm=""
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
        onPasswordConfirmChange={() => {}}
        onContinue={() => {}}
      />,
    );

    expect(wrapper.find("Alert").exists()).toBe(false);
  });

  test("render error", () => {
    const wrapper = mount(
      <CreateAccount
        email=""
        password=""
        passwordConfirm=""
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
        onPasswordConfirmChange={() => {}}
        onContinue={() => {}}
        error="Kek"
        emailError="Wrong format of e-mail"
        passwordError="Password should be more complex"
        passwordConfirmError="Passwords do not match"
      />,
    );

    expect(wrapper.find("Alert").exists()).toBe(true);

    expect(
      wrapper
        .find(`[data-test="MagicLogin-Email"]`)
        .first()
        .prop("error"),
    ).toBe("Wrong format of e-mail");
    expect(
      wrapper
        .find(`[data-test="MagicLogin-Password"]`)
        .first()
        .prop("error"),
    ).toBe("Password should be more complex");
    expect(
      wrapper
        .find(`[data-test="MagicLogin-PasswordConfirm"]`)
        .first()
        .prop("error"),
    ).toBe("Passwords do not match");
  });
});
