// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import AccountCreate from "..";

describe("#AccountCreate", () => {
  test("render", () => {
    const wrapper = mount(
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

    expect(wrapper.find("Alert").exists()).toBe(false);
  });

  test("render error", () => {
    const wrapper = mount(
      <AccountCreate
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
        .find("[data-test='Email']")
        .first()
        .prop("error"),
    ).toBe("Wrong format of e-mail");
    expect(
      wrapper
        .find("[data-test='Password']")
        .first()
        .prop("error"),
    ).toBe("Password should be more complex");
    expect(
      wrapper
        .find("[data-test='PasswordConfirm']")
        .first()
        .prop("error"),
    ).toBe("Passwords do not match");
  });
});
