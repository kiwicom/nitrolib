// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import Tooltip from "@kiwicom/orbit-components/lib/Tooltip";

import PasswordStrengthBar from "../PasswordStrengthBar";
import Translate from "../../../Translate";
import CONFIGS, { type PasswordStrengthEnum } from "./PasswordConfigs";

type Props = {|
  +passwordStrength: PasswordStrengthEnum,
|};

const StackStyle = {
  justify: "between",
  direction: "row",
  align: "start",
};

const StackViewportProps = {
  largeDesktop: StackStyle,
  desktop: StackStyle,
  mediumMobile: StackStyle,
};

const PasswordValidationBox = ({ passwordStrength }: Props) => {
  const { color, width, orbitTextType, translateKey } = CONFIGS[passwordStrength];
  return (
    <Stack {...StackViewportProps}>
      <PasswordStrengthBar color={color} width={width} />

      <Tooltip
        dataTest="MagicLogin-PasswordValidationTooltip"
        preferredPosition="bottom"
        content={<Translate t="account.password_validation.tooltip_text" />}
      >
        <Text
          dataTest="MagicLogin-PasswordValidationStrengthLabel"
          weight="bold"
          type={orbitTextType}
        >
          <Translate t={translateKey} />
        </Text>
      </Tooltip>
    </Stack>
  );
};

export default PasswordValidationBox;
