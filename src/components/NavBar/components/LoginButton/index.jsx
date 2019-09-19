// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import button from "../../../../styles/mixins/button";
import { themeDefault } from "../../../../records/Theme";

const Mobile = styled.div`
  display: flex;

  ${mq.largeMobile(css`
    display: none;
  `)};
`;

Mobile.defaultProps = {
  theme: themeDefault,
};

const Desktop = styled.div`
  display: none;

  ${mq.largeMobile(css`
    display: flex;
  `)};
`;

const CustomButton = styled.button`
  ${button}
  background: transparent;
`;

Desktop.defaultProps = {
  theme: themeDefault,
};

// TODO: Remove after Account release

type Props = {|
  children: React.Node,
  onClick?: () => void,
|};

const LoginButton = ({ children, onClick }: Props) => (
  <>
    <Desktop>
      <CustomButton onClick={onClick}>
        <Stack flex align="center" spacing="condensed">
          <AccountCircle color="tertiary" />
          {children}
        </Stack>
      </CustomButton>
    </Desktop>
    <Mobile>
      <CustomButton onClick={onClick}>
        <AccountCircle />
      </CustomButton>
    </Mobile>
  </>
);

export default LoginButton;
