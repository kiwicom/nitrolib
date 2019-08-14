// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import Tooltip from "@kiwicom/orbit-components/lib/Tooltip";

import PasswordStrengthBar from "../PasswordStrengthBar";
import Translate from "../../../../Translate";
import { CONFIGS } from "../../../consts/password";
import type { PasswordStrengthEnum } from "../../../../../records/Auth";
import PasswordLabelTranslation from "../PasswordLabelTranslation";

type Props = {|
  +passwordStrength: PasswordStrengthEnum,
|};

const PasswordValidationBox = ({ passwordStrength }: Props) => {
  const { color, width, orbitTextType, label } = CONFIGS[passwordStrength];
  return (
    <Stack
      mediumMobile={{
        justify: "between",
        align: "start",
      }}
    >
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
          <PasswordLabelTranslation label={label} />
        </Text>
      </Tooltip>
    </Stack>
  );
};

export default PasswordValidationBox;
