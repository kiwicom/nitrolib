// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import CONFIGS from "../../PasswordValidationBox/PasswordConfigs";

import PasswordStrengthBar from "..";

const PasswordStrengthConfigs = Object.keys(CONFIGS).map(config => {
  const { color, width } = CONFIGS[config];
  return [color, width];
});

describe("#PasswordStrengthBar", () => {
  test.each(PasswordStrengthConfigs)(
    "Check that the bar has correct style for each of the configs",
    (color, width) => {
      // For each configuration we check that the width and background color have been applied correctly
      const wrapper = mount(<PasswordStrengthBar color={color} width={width} />);

      wrapper.find("[data-test='MagicLogin-PasswordStrengthBar']").forEach(node => {
        expect(node).toHaveStyleRule("background-color", color);
        expect(node).toHaveStyleRule("width", width);
      });
    },
  );
});
