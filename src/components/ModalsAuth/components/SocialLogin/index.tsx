import * as React from "react";
import styled from "styled-components";
import Button from "@kiwicom/orbit-components/lib/Button";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Translate from "../../../Translate";
import { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";
import { SocialProvider } from "../../../../records/Auth";

const STACK_DESKTOP = { direction: "row" };

const Or = styled.div`
  position: relative;
  padding: 12px 0;
`;

const OrLine = styled.hr`
  width: 100%;
  border-top: 1px solid ${({ theme }: ThemeProps) => theme.orbit.paletteCloudNormal};
`;

OrLine.defaultProps = {
  theme: themeDefault,
};

const OrText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  text-transform: uppercase;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
`;

OrText.defaultProps = {
  theme: themeDefault,
};

type Props = {
  facebook: boolean,
  google: boolean,
  onSocialAuth: (provider: SocialProvider) => any,
};

const SocialLogin = ({ facebook, google, onSocialAuth }: Props) => (
  <>
    <Stack desktop={STACK_DESKTOP} direction="column">
      {google && (
        <Button
          block
          type="google"
          bordered
          icon={<GoogleIcon />}
          onClick={() => onSocialAuth("google")}
        >
          <Translate t="account.log_in_with" values={{ provider: "Google" }} />
        </Button>
      )}
      {facebook && (
        <Button
          type="facebook"
          bordered
          block
          icon={<FacebookIcon />}
          onClick={() => onSocialAuth("facebook")}
        >
          <Translate t="account.log_in_with" values={{ provider: "Facebook" }} />
        </Button>
      )}
    </Stack>
    <Or>
      <OrLine />
      <OrText>
        <Translate t="common.or" />
      </OrText>
    </Or>
  </>
);

export default SocialLogin;
