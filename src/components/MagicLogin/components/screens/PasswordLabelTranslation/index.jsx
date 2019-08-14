// @flow strict
import * as React from "react";

import type { PasswordStrengthEnum } from "../../../../../records/Auth";
import Translate from "../../../../Translate";

type Props = {|
  +label: PasswordStrengthEnum,
|};

const PasswordLabelTranslation = ({ label }: Props) => {
  if (label === "STRONG")
    return <Translate t="account.password_validation.strength_label.strong" />;
  if (label === "MEDIUM")
    return <Translate t="account.password_validation.strength_label.medium" />;
  return <Translate t="account.password_validation.strength_label.weak" />;
};

export default PasswordLabelTranslation;
