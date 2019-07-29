
/* eslint-env node */

import * as React from "react";
import { mount } from "enzyme";

import IntroScreen from "../components/Intro";
import { brandDefault } from "../../../records/Brand";
import { Provider as BrandProvider } from "../../../services/brand/context";
import { Provider as LogProvider } from "../../../services/log/context";
import * as loginEvents from "../consts/events";

import MagicLogin from "..";

jest.mock("../mutations/checkEmail");
jest.mock("../mutations/sendMagicLink");

const defaultProps = {
  onSocialLogin: () => Promise.resolve(undefined),
  onSignIn: () => {},
  onClose: () => {},
  onGetSimpleToken: () => {},
  initialScreen: "intro",
  type: "mmb",
};

describe("#MagicLogin", () => {
  it("renders intro screen by default", () => {
    const wrapper = mount(
      <BrandProvider value={brandDefault}>
        <MagicLogin {...defaultProps} />
      </BrandProvider>,
    );

    expect(wrapper.find(IntroScreen).exists()).toBe(true);
  });

  it("handles successful sending of magic link", done => {
    const wrapper = mount(
      <BrandProvider value={brandDefault}>
        <MagicLogin {...defaultProps} />
      </BrandProvider>,
    );

    wrapper
      .find(`input[data-test="MagicLogin-Email"]`)
      .simulate("change", { target: { value: "withBooking@example.com" } });
    wrapper.find(`input[data-test="MagicLogin-Email"]`).simulate("blur");
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(wrapper.render().find(`[data-test="MagicLogin-CheckEmail"]`)).toHaveLength(1);
      done();
    });
  });

  it("handles network error while sending magic link", done => {
    const wrapper = mount(
      <BrandProvider value={brandDefault}>
        <MagicLogin {...defaultProps} />
      </BrandProvider>,
    );
    wrapper
      .find(`input[data-test="MagicLogin-Email"]`)
      .simulate("change", { target: { value: "withBookingError@example.com" } });
    wrapper.find(`input[data-test="MagicLogin-Email"]`).simulate("blur");
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(wrapper.render().find(`[data-test="MagicLogin-Intro"]`)).toHaveLength(1);
      expect(wrapper.render().text()).toContain("common.api_error");
      done();
    });
  });

  it("handles login via facebook", () => {
    const onSocialLogin = jest.fn();
    const log = jest.fn();
    const wrapper = mount(
      <LogProvider value={{ log }}>
        <BrandProvider value={brandDefault}>
          <MagicLogin {...defaultProps} onSocialLogin={onSocialLogin} />
        </BrandProvider>
      </LogProvider>,
    );

    wrapper
      .find(`[data-test="MagicLogin-LoginViaSocials"]`)
      .find("button")
      .first()
      .simulate("click");
    wrapper.unmount();

    expect(onSocialLogin).toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith(loginEvents.LOGIN_PATH_FULFILLED, { withMagicLink: false });
  });

  it("logs that process of login was abandoned", () => {
    const log = jest.fn();
    const wrapper = mount(
      <LogProvider value={{ log }}>
        <BrandProvider value={brandDefault}>
          <MagicLogin {...defaultProps} />
        </BrandProvider>
      </LogProvider>,
    );
    wrapper.unmount();

    expect(log).toHaveBeenCalledWith(loginEvents.LOGIN_ABANDONED, { screen: "intro" });
  });

  it("logs that user went though the whole login path successfully", done => {
    const log = jest.fn();
    const wrapper = mount(
      <LogProvider value={{ log }}>
        <BrandProvider value={brandDefault}>
          <MagicLogin {...defaultProps} />
        </BrandProvider>
      </LogProvider>,
    );

    wrapper
      .find(`input[data-test="MagicLogin-Email"]`)
      .simulate("change", { target: { value: "withBooking@example.com" } });
    wrapper.find(`input[data-test="MagicLogin-Email"]`).simulate("blur");
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      wrapper.unmount();

      expect(log).toHaveBeenCalledWith(loginEvents.LOGIN_PATH_FULFILLED, { withMagicLink: true });
      done();
    });
  });
});
