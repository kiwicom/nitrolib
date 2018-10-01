// @flow strict
import * as React from "react";
import styled from "styled-components";
import Button from "@kiwicom/orbit-components/lib/Button";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";

import Text from "../../../../../Text";
import type { ThemeProps } from "../../../../../../records/Theme";
import { themeDefault } from "../../../../../../records/Theme";
import Flex from "../../../../../../primitives/Flex";
import * as rtl from "../../../../../../styles/rtl";
import type { SocialProvider } from "../../../../../../records/Auth";

const ButtonWrap = styled.div`
  flex: 1;

  &:nth-child(2) {
    margin-${rtl.left}: 10px;
  }
`;

ButtonWrap.defaultProps = {
  theme: themeDefault,
};

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
  transform: translate(-50%, -50%); // vertical and horizontal center
  padding: 10px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  text-transform: uppercase;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
`;

OrText.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  facebook: boolean,
  google: boolean,
  onSocialAuth: (provider: SocialProvider) => any,
|};

const SocialLogin = ({ facebook, google, onSocialAuth }: Props) => (
  <>
    <Flex>
      {google && (
        <ButtonWrap>
          <Button
            type="google"
            block
            bordered
            icon={<GoogleIcon />}
            onClick={() => onSocialAuth("google")}
          >
            <Text t={__("account.log_in_with")} values={{ provider: "Google" }} />
          </Button>
        </ButtonWrap>
      )}
      {facebook && (
        <ButtonWrap>
          <Button
            type="facebook"
            block
            bordered
            icon={<FacebookIcon />}
            onClick={() => onSocialAuth("facebook")}
          >
            <Text t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
          </Button>
        </ButtonWrap>
      )}
    </Flex>
    <Or>
      <OrLine />
      <OrText>
        <Text t={__("common.or")} />
      </OrText>
    </Or>
  </>
);

export default SocialLogin;
