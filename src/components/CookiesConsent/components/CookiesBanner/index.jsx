// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import MdClose from "react-icons/lib/md/close";

import Text from "../../../Text/index";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import mq from "../../../../styles/mediaQuery";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 50px 10px 20px;
  font-size: 12px;
  line-height: 20px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  color: white;
  opacity: 0.94;
  transition: bottom 0.25s ease-in;
  box-shadow: 0 -1px 6px 0 rgba(0, 0, 0, 0.2);

  ${mq.gtTablet(css`
    padding: 20px 50px 20px 20px;
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormalActive};
    background: white;
  `)};
`;

Container.defaultProps = {
  theme: themeDefault,
};

const Message = styled.p`
  opacity: 0.5;

  ${mq.gtTablet(css`
    opacity: 1;
  `)};

  a {
    text-decoration: none;
    font-weight: 700;
    color: ${({ theme }: ThemeProps) => theme.orbit.colorTextLinkPrimary};

    &:hover {
      color: ${({ theme }: ThemeProps) => theme.orbit.colorTextLinkPrimaryHover};
    }
  }
`;

Message.defaultProps = {
  theme: themeDefault,
};

const AcceptButton = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
`;

const Close = styled(MdClose)`
  height: 20px;
  width: 20px;
`;

type Props = {|
  onAccept: () => void,
|};

const CookiesBanner = ({ onAccept }: Props) => (
  <Container>
    <Message>
      <Text t={__("content.cookies.banner.text")} html />
    </Message>
    <AcceptButton onClick={onAccept}>
      <Close />
    </AcceptButton>
  </Container>
);

export default CookiesBanner;
