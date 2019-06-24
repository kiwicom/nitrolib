// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import MdClose from "react-icons/lib/md/close";
import { rtlSpacing, right } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Button from "@kiwicom/orbit-components/lib/Button";
import ButtonGroup from "@kiwicom/orbit-components/lib/ButtonGroup";
import Text from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";

import linkMixin from "../../../../styles/mixins/link";
import Translate from "../../../Translate";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
  z-index: 600;
  padding: ${rtlSpacing("10px 50px 10px 20px")};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  line-height: 20px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  transition: bottom 0.25s ease-in;
  box-shadow: 0 -1px 6px 0 rgba(0, 0, 0, 0.2);

  ${mq.desktop(
    css`
      flex-direction: row;
      align-items: center;
    `
  )};

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
  margin-bottom: 20px;
  width: 100%;
  text-align: justify;

  ${mq.desktop(
    css`
      padding-right: 12px;
    `
  )};

  ${mq.largeMobile(css`
    line-height: 20px;
  `)};
`;

Message.defaultProps = {
  theme: themeDefault,
};

const ButtonWrap = styled.div`
  padding-bottom: 10px;
  ${mq.desktop(
    css`
      padding-right: 30px;
      padding-bottom: 0px;
    `
  )};
`;

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

const Close = styled(MdClose)`
  height: 20px;
  width: 20px;
`;

type Props = {|
  onAccept: () => void,
  onCustomize: () => void,
|};

const CookiesBanner = ({ onAccept, onCustomize }: Props) => (
  <Container>
    <Heading spaceAfter="medium">
      <Translate t="content.cookies.banner.your_privacy.title" />
    </Heading>
    <Message>
      <Translate t="content.cookies.banner.your_privacy.text" html />
    </Message>
    <ButtonWrap>
      <ButtonGroup>
        <Button onClick={onCustomize} size="small" type="secondary">
          <Text size="small" weight="bold">
            <Translate t="content.cookies.banner.customize" />
          </Text>
        </Button>
        <Button onClick={onAccept} size="small">
          <Text size="small" type="white" weight="bold">
            <Translate t="content.cookies.banner.accept" />
          </Text>
        </Button>
      </ButtonGroup>
    </ButtonWrap>
    <AcceptButton onClick={onAccept}>
      <Close />
    </AcceptButton>
  </Container>
);

export default CookiesBanner;
