// @flow strict
import { themeDefault } from "../../../../records/Theme";

export type PasswordStrengthEnum = "WEAK" | "MEDIUM" | "STRONG";

type PasswordStrengthConfig = {|
  +orbitTextType: "critical" | "warning" | "success",
  +color: string,
  +width: string,
  +translateKey: string,
|};

// Different configurations for each one of the password strengths
const CONFIGS: {
  [key: PasswordStrengthEnum]: PasswordStrengthConfig,
  ...,
} = {
  WEAK: {
    orbitTextType: "critical",
    color: themeDefault.orbit.colorTextCritical,
    width: "30%",
    translateKey: "account.password_validation.strength_label.weak",
  },
  MEDIUM: {
    orbitTextType: "warning",
    color: themeDefault.orbit.colorTextWarning,
    width: "60%",
    translateKey: "account.password_validation.strength_label.medium",
  },
  STRONG: {
    orbitTextType: "success",
    color: themeDefault.orbit.colorTextSuccess,
    width: "100%",
    translateKey: "account.password_validation.strength_label.strong",
  },
};

export default CONFIGS;
