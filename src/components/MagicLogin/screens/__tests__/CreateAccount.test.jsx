// @flow
/* eslint-env node */

import * as React from "react";
import { mount } from "enzyme";

import CreateAccount from "../CreateAccount";
import AccountCreate from "../../../AccountCreate";

jest.mock("../../mutations/CreateAccount");

const defaultProps = {
  email: "",
  brandingId: "kiwicom",
  onEmailChange: jest.fn(),
  onSignUpConfirmation: jest.fn(),
};

describe("#CreateAccount", () => {
  it("renders CreateAccount screen", () => {
    const wrapper = mount(<CreateAccount {...defaultProps} />);

    expect(wrapper.find(AccountCreate).exists()).toBe(true);
  });

  it("check password validity only after input blur", () => {
    const wrapper = mount(<CreateAccount {...defaultProps} />);

    wrapper.find(`input[data-test="Password"]`).simulate("change", { target: { value: "123" } });
    expect(wrapper.find(AccountCreate).prop("passwordError")).toBe("");
    wrapper.find(`input[data-test="Password"]`).simulate("blur");
    expect(wrapper.find(AccountCreate).prop("passwordError")).toBe("account.password_too_short");
  });

  it("check integrity of the password", () => {
    const wrapper = mount(<CreateAccount {...defaultProps} />);

    wrapper.find(`input[data-test="Password"]`).simulate("change", { target: { value: "123" } });
    wrapper
      .find(`input[data-test="PasswordConfirm"]`)
      .simulate("change", { target: { value: "abc" } });
    // no error before input loses focus
    expect(wrapper.find(AccountCreate).prop("passwordConfirmError")).toBe("");

    wrapper.find(`input[data-test="PasswordConfirm"]`).simulate("blur");
    // error is detected when input lost focus and passwords don't match
    expect(wrapper.find(AccountCreate).prop("passwordConfirmError")).toBe(
      "account.password_confirm_not_matching",
    );

    wrapper
      .find(`input[data-test="PasswordConfirm"]`)
      .simulate("change", { target: { value: "123" } });
    // error is removed immediately as user is typing, without blur event
    expect(wrapper.find(AccountCreate).prop("passwordConfirmError")).toBe("");
  });

  it("handles successful submit", done => {
    const onSignUpConfirmation = jest.fn();
    const wrapper = mount(
      <CreateAccount {...defaultProps} onSignUpConfirmation={onSignUpConfirmation} />,
    );
    wrapper
      .find(`input[data-test="Password"]`)
      .simulate("change", { target: { value: "qwertyuiop123" } });
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(onSignUpConfirmation).toHaveBeenCalled();
      done();
    });
  });

  it("handles submit errors", done => {
    const onSignUpConfirmation = jest.fn();
    const wrapper = mount(
      <CreateAccount {...defaultProps} onSignUpConfirmation={onSignUpConfirmation} />,
    );
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(onSignUpConfirmation).not.toHaveBeenCalled();
      expect(wrapper.state("error")).toBe("account.password_too_simple");
      done();
    });
  });
});
