// @flow strict

import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import Text from "../../../Text";
import Button from "../../../Button";

type Props = {|
  onGoogleLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
|};

const LoginViaSocials = ({ onGoogleLogin, onFacebookLogin }: Props) => (
  <ModalSection suppressed dataTest="MagicLogin-LoginViaSocials">
    <Text weight="bold" spaceAfter="medium" t="account.or_social_account" />
    <Stack
      direction="column"
      mediumMobile={{
        direction: "row",
        align: "end",
      }}
      spacing="natural"
    >
      <Button
        t="account.log_in_with"
        values={{ provider: "Facebook" }}
        type="facebook"
        fullWidth
        bordered
        icon={<FacebookIcon />}
        onClick={onFacebookLogin}
      />
      <Button
        t="account.log_in_with"
        values={{ provider: "Google" }}
        type="google"
        fullWidth
        bordered
        icon={<GoogleIcon />}
        onClick={onGoogleLogin}
      />
    </Stack>
  </ModalSection>
);

export default LoginViaSocials;
