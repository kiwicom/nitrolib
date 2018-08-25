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
import * as api from "../../../../../../services/auth/api";

const ButtonWrap = styled.div`
  flex: 1;

  &:nth-child(2) {
    margin-left: 10px;
  }
`;

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
  font-size: 14px;
`;

OrText.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  facebook: boolean,
  google: boolean,
  // DI
  socialAuth: typeof api.socialAuth,
|};

const SocialLogin = ({ facebook, google, socialAuth }: Props) => (
  <>
    <Flex>
      {facebook && (
        <ButtonWrap>
          <Button
            type="facebook"
            block
            bordered
            icon={<FacebookIcon />}
            onClick={() => socialAuth("facebook")}
          >
            <Text t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
          </Button>
        </ButtonWrap>
      )}
      {google && (
        <ButtonWrap>
          <Button
            type="google"
            block
            bordered
            icon={<GoogleIcon />}
            onClick={() => socialAuth("google")}
          >
            <Text t={__("account.log_in_with")} values={{ provider: "Google" }} />
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

SocialLogin.defaultProps = {
  socialAuth: api.socialAuth,
};

export default SocialLogin;
