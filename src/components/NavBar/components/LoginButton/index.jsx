// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";

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
      <ButtonLink
        iconLeft={<AccountCircle size="small" color="tertiary" />}
        type="secondary"
        transparent
        onClick={onClick}
      >
        {children}
      </ButtonLink>
    </Desktop>
    <Mobile>
      <ButtonLink
        iconLeft={<AccountCircle size="small" />}
        type="secondary"
        transparent
        onClick={onClick}
      />
    </Mobile>
  </>
);

export default LoginButton;
