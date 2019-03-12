// @flow
/* eslint-env node */

import * as React from "react";
import { mount } from "enzyme";

import Intro from "..";

import AccountLogin from "../../../../AccountLogin";

jest.mock("../../../mutations/CheckEmail");

const defaultProps = {
  email: "joe.doe@example.com",
  brandId: "",
  type: "mmb",
  magicLinkError: "",
  onGoogleLogin: () => {},
  onFacebookLogin: () => {},
  onEmailChange: () => {},
  onChangeScreen: () => {},
  onSendMagicLink: () => {},
};

describe("#Intro", () => {
  it("should render", () => {
    const wrapper = mount(<Intro {...defaultProps} />);

    expect(wrapper.find(AccountLogin).exists()).toBe(true);
  });

  it("handles loading properly on success", done => {
    const wrapper = mount(<Intro {...defaultProps} />);

    wrapper.find("form").simulate("submit");

    expect(wrapper.state("isLoading")).toBe(true);

    setImmediate(() => {
      expect(wrapper.state("isLoading")).toBe(false);
      done();
    });
  });

  it("handles network error on submit", done => {
    const wrapper = mount(<Intro {...defaultProps} email="error@example.com" />);

    wrapper.find("form").simulate("submit");
    expect(wrapper.state("isLoading")).toBe(true);

    setImmediate(() => {
      expect(wrapper.state("isLoading")).toBe(false);
      expect(wrapper.state("error")).toBe("common.api_error");
      done();
    });
  });

  it("handles e-mail check for account only with booking", done => {
    const onChangeScreen = jest.fn();
    const onSendMagicLink = jest.fn();
    const wrapper = mount(
      <Intro
        {...defaultProps}
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
      <Intro
        {...defaultProps}
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
