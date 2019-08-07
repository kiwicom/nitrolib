// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import CONFIGS from "../PasswordConfigs";

import PasswordValidationBox from "..";

describe("#PasswordValidationBox", () => {
  it("Shows correct text and color for a given config", () => {
    const { translateKey, color } = CONFIGS.MEDIUM;
    const wrapper = mount(<PasswordValidationBox passwordStrength="MEDIUM" />);

    expect(
      wrapper
        .find("Text")
        .first()
        .text(),
    ).toEqual(translateKey);

    wrapper.find("[data-test='MagicLogin-PasswordValidationStrengthLabel']").forEach(node => {
      expect(node).toHaveStyleRule("color", color);
    });
  });
});
