// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import { CONFIGS } from "../../../../consts/password";

import PasswordValidationBox from "..";

describe("#PasswordValidationBox", () => {
  it("Shows correct text and color for a given config", () => {
    const { color } = CONFIGS.MEDIUM;
    const wrapper = mount(<PasswordValidationBox passwordStrength="MEDIUM" />);

    expect(
      wrapper
        .find("Text")
        .first()
        .text(),
    ).toEqual("account.password_validation.strength_label.medium");

    wrapper.find("[data-test='MagicLogin-PasswordValidationStrengthLabel']").forEach(node => {
      expect(node).toHaveStyleRule("color", color);
    });
  });
});
