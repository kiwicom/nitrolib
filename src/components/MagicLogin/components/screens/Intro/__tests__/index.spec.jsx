// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import IntroScreen from "..";

const commonProps = {
  email: "",
  tailoredHeader: <div />,
  onEmailChange: () => {},
  onEmailBlur: () => {},
  onFacebookLogin: () => {},
  onGoogleLogin: () => {},
  onContinue: () => {},
  onIncorrectEmail: () => {},
};

describe("#IntroScreen", () => {
  test("render", () => {
    const wrapper = mount(<IntroScreen {...commonProps} />);

    expect(wrapper.find(`[data-test="MagicLogin-LoginViaSocials"]`).exists()).toBe(true);
  });

  test("render error", () => {
    const wrapper = mount(<IntroScreen {...commonProps} error="Kek" />);

    expect(wrapper.find("Alert").prop("type")).toBe("critical");
  });
});
