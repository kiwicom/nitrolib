// @flow
/* eslint-env node */

import * as React from "react";
import { mount } from "enzyme";
import { RelayEnvironmentProvider } from "@kiwicom/relay";
import { createMockEnvironment } from "relay-test-utils";

import AccountLogin from "../../screens/Intro";
import TailoredHeader from "../../TailoredHeader";

import Intro from "..";

jest.mock("../../../mutations/checkEmail");

const IntroComponent = props => {
  const defaultProps = {
    email: "joe.doe@example.com",
    brandId: "",
    magicLinkError: "",
    tailoredHeader: <TailoredHeader type="mmb" />,
    onGoogleLogin: () => {},
    onFacebookLogin: () => {},
    onEmailChange: () => {},
    onChangeScreen: () => {},
    onSendMagicLink: () => {},
  };

  return (
    <RelayEnvironmentProvider environment={createMockEnvironment()}>
      <Intro {...defaultProps} {...props} />
    </RelayEnvironmentProvider>
  );
};

describe("#Intro", () => {
  it("should render", () => {
    const wrapper = mount(<IntroComponent />);

    expect(wrapper.find(AccountLogin).exists()).toBe(true);
  });

  it("handles loading properly on success", done => {
    const wrapper = mount(<IntroComponent />);

    wrapper.find("form").simulate("submit");

    expect(wrapper.find(`[data-test="MagicLogin-CheckEmail"]`).prop("disabled")).toBe(true);

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find(`[data-test="MagicLogin-CheckEmail"]`).prop("disabled")).toBeFalsy();
      done();
    });
  });

  it("handles network error on submit", done => {
    const wrapper = mount(<IntroComponent email="error@example.com" />);

    wrapper.find("form").simulate("submit");
    expect(wrapper.find(`[data-test="MagicLogin-CheckEmail"]`).prop("disabled")).toBe(true);

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find(`[data-test="MagicLogin-CheckEmail"]`).prop("disabled")).toBeFalsy();
      expect(wrapper.find(`[t="common.api_error"]`).exists()).toBeTruthy();
      done();
    });
  });

  it("handles e-mail check for account only with booking", done => {
    const onChangeScreen = jest.fn();
    const onSendMagicLink = jest.fn();
    const wrapper = mount(
      <IntroComponent
        email="withBooking@example.com"
        onChangeScreen={onChangeScreen}
        onSendMagicLink={onSendMagicLink}
      />,
    );

    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(onChangeScreen).not.toHaveBeenCalled();
      expect(onSendMagicLink).toHaveBeenCalled();
      done();
    });
  });

  it("handles e-mail check for account connected to Facebook", done => {
    const onChangeScreen = jest.fn();
    const onSendMagicLink = jest.fn();
    const wrapper = mount(
      <IntroComponent
        email="withFacebook@example.com"
        onChangeScreen={onChangeScreen}
        onSendMagicLink={onSendMagicLink}
      />,
    );

    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(onChangeScreen).toHaveBeenCalled();
      expect(onSendMagicLink).not.toHaveBeenCalled();
      done();
    });
  });
});
