// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import MdClose from "react-icons/lib/md/close";

import mq from "../../../../styles/mq";
import * as rtl from "../../../../styles/rtl";
import linkMixin from "../../../../styles/mixins/link";
import Text from "../../../Text";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  z-index: 600;
  padding: ${rtl.box(10, 50, 10, 20)};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  line-height: 20px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  transition: bottom 0.25s ease-in;
  box-shadow: 0 -1px 6px 0 rgba(0, 0, 0, 0.2);

  ${mq.gtTablet(css`
    padding: ${rtl.box(20, 50, 20, 20)};
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormalActive};
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  `)};
`;

Container.defaultProps = {
  theme: themeDefault,
};

const Message = styled.p`
  ${linkMixin};
  line-height: 16px;

  ${mq.gtTablet(css`
    line-height: 20px;
  `)};
`;

Message.defaultProps = {
  theme: themeDefault,
};

const AcceptButton = styled.a`
  position: absolute;
  top: 0;
  ${rtl.right}: 0;
  padding: 10px;
  cursor: pointer;
`;

AcceptButton.defaultProps = {
  theme: themeDefault,
};

const Close = styled(MdClose)`
  height: 20px;
  width: 20px;
`;

type Props = {|
  onAccept: () => void,
|};

const CookiesBanner = ({ onAccept }: Props) => (
  <Container data-test="cookie">
    <Message>
      <Text t={__("content.cookies.banner.text")} html />
    </Message>
    <AcceptButton data-test="close" onClick={onAccept}>
      <Close />
    </AcceptButton>
  </Container>
);

export default CookiesBanner;
