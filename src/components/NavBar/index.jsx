// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import { navbar } from "../../styles";
import mq from "../../styles/mediaQuery";
import ClientOnly from "../ClientOnly";
import type { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import Flex from "../../primitives/Flex";
import Language from "../Language";
import HeaderLinks from "../HeaderLinks";
import type { Splitster } from "../../records/Splitster";
import { splitsterDefault } from "../../records/Splitster";
import * as brandContext from "../../services/brand/context";
import SideBar from "./components/SideBar";
import Logo from "./components/Logo";
import Currency from "../Currency";

const Container = styled(Flex)`
  width: 100%;
  height: ${navbar.height}px;
  background-color: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkDark};
  padding: 0 10px;
  box-sizing: border-box;

  ${mq.gtTablet(css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  `)};
`;

Container.defaultProps = {
  theme: themeDefault,
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 50px;
  height: 50px;
  font-size: 12px;
  font-weight: 500;

  & > * {
    margin-left: 5px;
    cursor: pointer;
    align-items: center;

    ${mq.gtTablet(css`
      margin-left: 20px;
    `)};
  }
`;

const Desktop = styled.div`
  display: none;
  ${mq.gtTablet(css`
    display: flex;
    & > * {
      margin-left: 20px;
    }
  `)};
`;

type Props = {|
  onOpenSubscription: () => void,
  onOpenChat: () => void,
  debug: boolean,
  onOpenDebug?: () => void,
  onSaveToken: (token: string) => void,
  onSaveLanguage: (lang: string) => void,
  splitster: Splitster,
|};

const NavBar = ({
  onOpenSubscription,
  onOpenChat,
  debug,
  onOpenDebug,
  onSaveToken,
  onSaveLanguage,
  splitster,
}: Props) => (
  <Container x="space-between" y="center">
    <brandContext.Consumer>
      {brand => (
        <Flex y="center" x="flex-start">
          <Logo />
          {brand.id === "kiwicom" && <HeaderLinks splitster={splitster} />}
        </Flex>
      )}
    </brandContext.Consumer>
    <Flex y="center">
      <Wrapper>
        <Desktop>
          <Language onChange={onSaveLanguage} />
          <ClientOnly>
            <Currency />
          </ClientOnly>
        </Desktop>
        <SideBar
          onOpenSubscription={onOpenSubscription}
          onOpenChat={onOpenChat}
          debug={debug}
          onOpenDebug={onOpenDebug}
          onSaveToken={onSaveToken}
          onSaveLanguage={onSaveLanguage}
        />
      </Wrapper>
    </Flex>
  </Container>
);

NavBar.defaultProps = {
  debug: false,
  splitster: splitsterDefault,
};

export default NavBar;
