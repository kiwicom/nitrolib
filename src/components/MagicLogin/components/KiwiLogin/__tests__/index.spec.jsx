// @flow
/* eslint-env node */

import * as React from "react";
import { mount } from "enzyme";
import { createMockEnvironment } from "relay-test-utils";
import { RelayEnvironmentProvider } from "@kiwicom/relay";

import Password from "../../screens/Password";
import TailoredHeader from "../../TailoredHeader";

import KiwiLogin from "..";

jest.mock("../../../mutations/resetPassword");
jest.mock("../../../mutations/signIn");

const KiwiLoginComponent = props => {
  const defaultProps = {
    email: "",
    magicLinkError: "",
    isSendingEmail: false,
    brandId: "",
    tailoredHeader: <TailoredHeader type="mmb" />,
    onResetMagicLinkError: () => {},
    onClose: () => {},
    onChangeScreen: () => {},
    onAskSignInLink: () => {},
    onSignIn: () => {},
  };

  return (
    <RelayEnvironmentProvider environment={createMockEnvironment()}>
      <KiwiLogin {...defaultProps} {...props} />
    </RelayEnvironmentProvider>
  );
};

describe("#KiwiLogin", () => {
  it("should render", () => {
    const wrapper = mount(<KiwiLoginComponent />);

    expect(wrapper.find(Password).exists()).toBe(true);
  });

  it("handles forgotten password", done => {
    const onChangeScreen = jest.fn();
    const wrapper = mount(<KiwiLoginComponent onChangeScreen={onChangeScreen} />);

    wrapper
      .find("a")
      .at(1)
      .simulate("click");

    setImmediate(() => {
      expect(onChangeScreen).toHaveBeenCalled();
      done();
    });
  });

  it("handles request to change email", () => {
    const onChangeScreen = jest.fn();
    const wrapper = mount(<KiwiLoginComponent onChangeScreen={onChangeScreen} />);

    wrapper
      .find("a")
      .at(0)
      .simulate("click");

    expect(onChangeScreen).toHaveBeenCalled();
  });

  it("handles sign in", done => {
    const onSignIn = jest.fn();
    const onClose = jest.fn();
    const wrapper = mount(
      <KiwiLoginComponent email="joe.doe@example.com" onSignIn={onSignIn} onClose={onClose} />,
    );
    wrapper
      .find(`input[data-test="MagicLogin-PasswordInput"]`)
      .simulate("change", { target: { value: "qwertyuiop123" } });
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(onSignIn).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
      done();
    });
  });
});
