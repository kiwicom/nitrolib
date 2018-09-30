// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import { navbar } from "../../styles";
import mq from "../../styles/mq";
import * as rtl from "../../styles/rtl";
import Desktop from "../Desktop";
import type { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import Flex from "../../primitives/Flex";
import Language from "../Language";
import { Consumer as BrandConsumer } from "../../services/brand/context";
import { Consumer as LogConsumer } from "../../services/log/context";
import Help from "./components/Help";
import Menu from "./components/Menu";
import Logo from "./components/Logo";
import Currency from "../Currency";
import Starred from "../Starred";
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
  chat: React.Node,
  subscription: React.Node,
  debug?: React.Node,
  onOpenFaq: () => void,
  onSaveLanguage: (lang: string) => void,
|};

const NavBar = ({
  headerLinks,
  starred,
  chat,
  subscription,
  debug,
  onOpenFaq,
  onSaveLanguage,
}: Props) => (
  <LogConsumer>
    {({ log }) => (
      <Container x="space-between" y="center">
        <Flex y="center" x="flex-start">
          <Logo />
          <BrandConsumer>{brand => brand.id === "kiwicom" && headerLinks}</BrandConsumer>
        </Flex>
        <Flex y="center">
          <Wrapper>
            <Desktop display="flex">
              <MenuSpacings>
                <Language
                  positionMenuDesktop={-270}
                  positionMenuTablet={0}
                  onChange={onSaveLanguage}
                />
              </MenuSpacings>
              <MenuSpacings>
                <Currency positionMenuDesktop={-270} positionMenuTablet={-200} />
              </MenuSpacings>
              <MenuSpacings>
                <Help onOpen={onOpenFaq} onLog={log} />
              </MenuSpacings>
            </Desktop>
            {starred && (
              <MenuSpacings>
                <Starred positionMenuDesktop={-100} positionMenuTablet={-183}>
                  {starred}
                </Starred>
              </MenuSpacings>
            )}
            <Menu
              chat={chat}
              subscription={subscription}
              debug={debug}
              onSaveLanguage={onSaveLanguage}
              onLog={log}
            />
          </Wrapper>
        </Flex>
      </Container>
    )}
  </LogConsumer>
);

export default NavBar;
