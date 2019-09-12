// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Button from "@kiwicom/orbit-components/lib/Button";

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
`;

Desktop.defaultProps = {
  theme: themeDefault,
};

// TODO: Remove after Account release
// Temporary hack for long translations in button

type Props = {|
  children: React.Node,
  onClick?: () => void,
|};

const LoginButton = ({ children, onClick }: Props) => (
  <>
    <Desktop>
      <Button onClick={onClick} iconLeft={<AccountCircle />} type="secondary" size="small">
        {children}
      </Button>
    </Desktop>
    <Mobile>
      <CustomButton onClick={onClick}>
        <AccountCircle />
      </CustomButton>
    </Mobile>
  </>
);

export default LoginButton;
