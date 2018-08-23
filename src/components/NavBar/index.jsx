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
  headerLinks: React.Node,
  // TODO make these injectables into a container
  onOpenSubscription: () => void,
  onOpenChat: () => void,
  onSaveToken: (token: string) => void,
  onSaveLanguage: (lang: string) => void,
  debug: boolean,
  onOpenDebug?: () => void,
|};

const NavBar = ({
  headerLinks,
  onOpenSubscription,
  onOpenChat,
  onSaveToken,
  onSaveLanguage,
  debug,
  onOpenDebug,
}: Props) => (
  <Container x="space-between" y="center">
    <Flex y="center" x="flex-start">
      <Logo />
      <brandContext.Consumer>
        {brand => brand.id === "kiwicom" && headerLinks}
      </brandContext.Consumer>
    </Flex>
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
          onSaveToken={onSaveToken}
          onSaveLanguage={onSaveLanguage}
          debug={debug}
          onOpenDebug={onOpenDebug}
        />
      </Wrapper>
    </Flex>
  </Container>
);

NavBar.defaultProps = {
  debug: false,
};

export default NavBar;
