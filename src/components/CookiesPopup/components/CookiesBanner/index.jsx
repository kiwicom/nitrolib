// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import { rtlSpacing, right } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Button from "@kiwicom/orbit-components/lib/Button";
import ButtonGroup from "@kiwicom/orbit-components/lib/ButtonGroup";
import Text from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import linkMixin from "../../../../styles/mixins/link";
import Translate from "../../../Translate";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

// TODO: rewrite after z-index global changes
const Container = styled.div`
  position: relative;
  box-sizing: border-box;
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

  ${mq.desktop(css`
    padding: 20px;
  `)};
`;

Container.defaultProps = {
  theme: themeDefault
};

const Message = styled.p`
  ${linkMixin};
  line-height: 16px;
  margin-bottom: 20px;
  width: 100%;
  text-align: justify;

  ${mq.largeMobile(css`
    line-height: 20px;
  `)};
`;

Message.defaultProps = {
  theme: themeDefault
};

const AcceptButton = styled.a`
  position: absolute;
  top: 0;
  ${right}: 0;
  padding: 10px;
  cursor: pointer;
`;

AcceptButton.defaultProps = {
  theme: themeDefault
};

type Props = {|
  onAccept: () => void,
  onCustomize: () => void
|};

const CookiesBanner = ({ onAccept, onCustomize }: Props) => (
  <Container>
    <Stack
      justify="between"
      direction="column"
      flex
      align="end"
      spacing="comfy"
      desktop={{ align: "center", direction: "row", spacing: "natural" }}
    >
      <Heading spaceAfter="medium">
        <Translate t="content.cookies.banner.your_privacy.title" />
      </Heading>
      <Message>
        <Translate t="content.cookies.banner.your_privacy.text" html />
      </Message>
      <Stack inline justify="end">
        <ButtonGroup>
          <Button onClick={onCustomize} size="small" type="secondary">
            <Text size="small" weight="bold">
              <Translate t="content.cookies.banner.customize" />
            </Text>
          </Button>
          <Button onClick={() => onAccept()} size="small">
            <Text size="small" type="white" weight="bold">
              <Translate t="content.cookies.banner.accept" />
            </Text>
          </Button>
        </ButtonGroup>
      </Stack>
      <AcceptButton onClick={onAccept}>
        <Close color="secondary" />
      </AcceptButton>
    </Stack>
  </Container>
);

export default CookiesBanner;
