// @flow strict
import { themeDefault } from "../../../records/Theme";
import type { PasswordStrengthEnum } from "../../../records/Auth";

type PasswordStrengthConfig = {|
  +orbitTextType: "critical" | "warning" | "success",
  +color: string,
  +width: string,
  +label: PasswordStrengthEnum,
|};

// Maps the result of zxcvbn to a relative strength
const PASSWORD_SCORE_TO_STRENGTH: { [key: string]: PasswordStrengthEnum } = {
  "0": "WEAK",
  "1": "WEAK",
  "2": "MEDIUM",
  "3": "MEDIUM",
  "4": "STRONG",
};

// Different configurations for each one of the password strengths
const CONFIGS: {
  [key: PasswordStrengthEnum]: PasswordStrengthConfig,
  ...,
} = {
  WEAK: {
    label: "WEAK",
    orbitTextType: "critical",
    color: themeDefault.orbit.colorTextCritical,
    width: "30%",
  },
  MEDIUM: {
    label: "MEDIUM",
    orbitTextType: "warning",
    color: themeDefault.orbit.colorTextWarning,
    width: "60%",
  },
  STRONG: {
    label: "STRONG",
    orbitTextType: "success",
    color: themeDefault.orbit.colorTextSuccess,
    width: "100%",
  },
};

export { CONFIGS, PASSWORD_SCORE_TO_STRENGTH };
