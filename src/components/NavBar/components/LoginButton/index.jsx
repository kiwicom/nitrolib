// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Button from "@kiwicom/orbit-components/lib/Button";

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
      <Button
        iconLeft={<AccountCircle size="small" />}
        size="small"
        type="secondary"
        onClick={onClick}
      >
        {children}
      </Button>
    </Desktop>
    <Mobile>
      <Button
        iconLeft={<AccountCircle size="small" />}
        size="small"
        type="secondary"
        onClick={onClick}
      />
    </Mobile>
  </>
);

export default LoginButton;
