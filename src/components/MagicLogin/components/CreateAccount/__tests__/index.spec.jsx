// @flow
/* eslint-env node */

import * as React from "react";
import { mount } from "enzyme";
import { createMockEnvironment } from "relay-test-utils";
import { RelayEnvironmentProvider } from "@kiwicom/relay";

import CreateAccountScreen from "../../screens/CreateAccount";

import CreateAccount from "..";

jest.mock("../../../mutations/createAccount");

const CreateAccountComponent = props => {
  const defaultProps = {
    email: "joe.doe@example.com",
    brandId: "kiwicom",
    onEmailChange: jest.fn(),
    onSignUpConfirmation: jest.fn(),
  };

  return (
    <RelayEnvironmentProvider environment={createMockEnvironment()}>
      <CreateAccount {...defaultProps} {...props} />
    </RelayEnvironmentProvider>
  );
};

describe("#CreateAccount", () => {
  it("renders CreateAccount screen", () => {
    const wrapper = mount(<CreateAccountComponent />);

    expect(wrapper.find(CreateAccountScreen).exists()).toBe(true);
  });

  it("check password hinter for different password", () => {
    const wrapper = mount(<CreateAccountComponent />);

    const passwordField = wrapper.find(`input[data-test="MagicLogin-Password"]`);
    const passwordHint = wrapper.find("[data-test='MagicLogin-PasswordValidationStrengthLabel']");

    passwordField.simulate("change", { target: { value: "123" } });
    expect(passwordHint.text()).toEqual("account.password_validation.strength_label.weak");

    global.zxcvbn = jest.fn().mockImplementation(() => ({
      score: 3,
    }));

    passwordField.simulate("change", {
      target: { value: "mediumPasswordWhatever2993" },
    });
    expect(passwordHint.text()).toEqual("account.password_validation.strength_label.medium");
  });

  it("check integrity of the password", () => {
    const wrapper = mount(<CreateAccountComponent />);

    wrapper
      .find(`input[data-test="MagicLogin-Password"]`)
      .simulate("change", { target: { value: "123" } });
    wrapper
      .find(`input[data-test="MagicLogin-PasswordConfirm"]`)
      .simulate("change", { target: { value: "abc" } });
    // no error before input loses focus
    expect(wrapper.find(CreateAccountScreen).prop("passwordConfirmError")).toBe("");

    wrapper.find(`input[data-test="MagicLogin-PasswordConfirm"]`).simulate("blur");
    // error is detected when input lost focus and passwords don't match
    expect(wrapper.find(CreateAccountScreen).prop("passwordConfirmError")).toBe(
      "account.password_confirm_not_matching",
    );

    wrapper
      .find(`input[data-test="MagicLogin-PasswordConfirm"]`)
      .simulate("change", { target: { value: "123" } });
    // error is removed immediately as user is typing, without blur event
    expect(wrapper.find(CreateAccountScreen).prop("passwordConfirmError")).toBe("");
  });

  it("handles successful submit", done => {
    const onSignUpConfirmation = jest.fn();
    const wrapper = mount(<CreateAccountComponent onSignUpConfirmation={onSignUpConfirmation} />);
    wrapper
      .find(`input[data-test="MagicLogin-Password"]`)
      .simulate("change", { target: { value: "qwertyuiop123" } });
    wrapper
      .find(`input[data-test="MagicLogin-PasswordConfirm"]`)
      .simulate("change", { target: { value: "qwertyuiop123" } });
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(onSignUpConfirmation).toHaveBeenCalled();
      done();
    });
  });

  it("handles submit errors", done => {
    const onSignUpConfirmation = jest.fn();
    const wrapper = mount(<CreateAccountComponent onSignUpConfirmation={onSignUpConfirmation} />);
    wrapper
      .find(`input[data-test="MagicLogin-Password"]`)
      .simulate("change", { target: { value: "qwerty" } });
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(onSignUpConfirmation).not.toHaveBeenCalled();
      done();
    });
  });

  it("handles errors in response after submit", done => {
    const onSignUpConfirmation = jest.fn();
    const wrapper = mount(
      <CreateAccountComponent
        email="error@example.com"
        onSignUpConfirmation={onSignUpConfirmation}
      />,
    );
    wrapper
      .find(`input[data-test="MagicLogin-Password"]`)
      .simulate("change", { target: { value: "qwertyuiop123" } });
    wrapper
      .find(`input[data-test="MagicLogin-PasswordConfirm"]`)
      .simulate("change", { target: { value: "qwertyuiop123" } });
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(onSignUpConfirmation).not.toHaveBeenCalled();
      done();
    });
  });
});
