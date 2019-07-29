import * as React from "react";
import styled, { css } from "styled-components";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import { rtlSpacing, right } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import linkMixin from "../../../../styles/mixins/link";
import Translate from "../../../Translate";
import { themeDefault } from "../../../../records/Theme";
import { ThemeProps } from "../../../../records/Theme";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  z-index: 600;
  padding: ${rtlSpacing("10px 50px 10px 20px")};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  line-height: 20px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  transition: bottom 0.25s ease-in;
  box-shadow: 0 -1px 6px 0 rgba(0, 0, 0, 0.2);

  ${mq.largeMobile(css`
    padding: ${rtlSpacing("20px 50px 20px 20px")};
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

  ${mq.largeMobile(css`
    line-height: 20px;
  `)};
`;

Message.defaultProps = {
  theme: themeDefault,
};

const AcceptButton = styled.a`
  position: absolute;
  top: 0;
  ${right}: 0;
  padding: 10px;
  cursor: pointer;
`;

AcceptButton.defaultProps = {
  theme: themeDefault,
};

type Props = {
  onAccept: () => void,
};

const CookiesBanner = ({ onAccept }: Props) => (
  <Container>
    <Message>
      <Translate t="content.cookies.banner.text" html />
    </Message>
    <AcceptButton onClick={onAccept}>
      <Close color="secondary" />
    </AcceptButton>
  </Container>
);

export default CookiesBanner;
