// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import MdClose from "react-icons/lib/md/close";
import { rtlSpacing, right } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Button from "@kiwicom/orbit-components/lib/Button";
import ButtonGroup from "@kiwicom/orbit-components/lib/ButtonGroup";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import linkMixin from "../../../../styles/mixins/link";
import Translate from "../../../Translate";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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
  margin-bottom: 20px;

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
    <Message>
      <Translate t="content.cookies.banner.text" html />
    </Message>
    <Stack justify="end" spaceAfter="medium">
      <ButtonGroup>
        <Button onClick={onCustomize} size="small" type="secondary">
          <Text size="small" weight="bold">
            Customize my preferences
          </Text>
        </Button>
        <Button onClick={onAccept} size="small">
          <Text size="small" type="white" weight="bold">
            I agree
          </Text>
        </Button>
      </ButtonGroup>
    </Stack>
    <AcceptButton onClick={onAccept}>
      <Close />
    </AcceptButton>
  </Container>
);

export default CookiesBanner;
