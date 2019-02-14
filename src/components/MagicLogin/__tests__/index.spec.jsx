// @flow
/* eslint-env node */

import * as React from "react";
import { mount } from "enzyme";

import MagicLogin from "../index";
import IntroScreen from "../components/Intro/index";
import { brandDefault } from "../../../records/Brand";
import { Provider as BrandProvider } from "../../../services/brand/context";

jest.mock("../mutations/CheckEmail");
jest.mock("../mutations/SendMagicLink");

const defaultProps = {
  onSocialLogin: () => Promise.resolve(undefined),
  onSignIn: () => {},
  onClose: () => {},
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

  it("handles successful sending of magic link", async () => {
    const wrapper = mount(
      <BrandProvider value={brandDefault}>
        <MagicLogin {...defaultProps} />
      </BrandProvider>,
    );

    wrapper
      .find(`input[data-test="Email"]`)
      .simulate("change", { target: { value: "withBooking@example.com" } });
    wrapper.find(`input[data-test="Email"]`).simulate("blur");
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(wrapper.state("screen")).toBe("magicLink");
    });
  });

  it("handles network error while sending magic link", done => {
    const wrapper = mount(
      <BrandProvider value={brandDefault}>
        <MagicLogin {...defaultProps} />
      </BrandProvider>,
    );
    wrapper
      .find(`input[data-test="Email"]`)
      .simulate("change", { target: { value: "withBookingError@example.com" } });
    wrapper.find(`input[data-test="Email"]`).simulate("blur");
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(wrapper.state("error")).toBe("common.api_error");
      expect(wrapper.state("screen")).toBe("intro");
      done();
    });
  });
});
