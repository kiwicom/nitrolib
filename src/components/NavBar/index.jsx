// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import { navbar } from "../../styles";
import mq from "../../styles/mediaQuery";
import * as rtl from "../../styles/rtl";
import ClientOnly from "../ClientOnly";
import Desktop from "../Desktop";
import type { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import Flex from "../../primitives/Flex";
import Language from "../Language";
import * as brandContext from "../../services/brand/context";
import Help from "./components/Help";
import Menu from "./components/Menu";
import Logo from "./components/Logo";
import Currency from "../Currency";
import MenuSpacings from "./primitives/MenuSpacings";

const Container = styled(Flex)`
  width: 100%;
  height: ${navbar.height}px;
  background-color: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  padding: 0 10px;
  box-sizing: border-box;

  ${mq.gtTablet(css`
    position: fixed;
    top: 0;
    ${rtl.left}: 0;
  `)};
`;

Container.defaultProps = {
  theme: themeDefault,
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  headerLinks: React.Node,
  starred: React.Node,
  faq: React.Node,
  chat: React.Node,
  subscription: React.Node,
  debug?: React.Node,
  onSaveLanguage: (lang: string) => void,
|};

const NavBar = ({
  headerLinks,
  starred,
  faq,
  chat,
  subscription,
  debug,
  onSaveLanguage
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
        <Desktop display="flex">
          <MenuSpacings>
            <Language onChange={onSaveLanguage} positionMenuDesktop={-270} positionMenuTablet={0} />
          </MenuSpacings>
          <ClientOnly>
            <MenuSpacings>
              <Currency />
            </MenuSpacings>
          </ClientOnly>
          <MenuSpacings>
            <Help faq={faq} />
          </MenuSpacings>
        </Desktop>
        {starred && <MenuSpacings>{starred}</MenuSpacings>}
        <Menu
          chat={chat}
          subscription={subscription}
          debug={debug}
          onSaveLanguage={onSaveLanguage}
        />
      </Wrapper>
    </Flex>
  </Container>
);

export default NavBar;
