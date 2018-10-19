// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";

import { navbar } from "../../styles";
import mq from "../../styles/mq";
import * as rtl from "../../styles/rtl";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import type { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import Flex from "../../primitives/Flex";
import Language from "../Language";
import { Consumer as AuthConsumer } from "../../services/auth/context";
import { Consumer as BrandConsumer } from "../../services/brand/context";
import { Consumer as LogConsumer } from "../../services/log/context";
import Help from "./components/Help";
import Menu from "./components/Menu";
import Logo from "./components/Logo";
import Currency from "../Currency";
// import Starred from "../Starred"; FIXME add as a full feature

// TODO: replace z-index with Orbit token after refactoring all front-end indexes
const Container = styled(Flex)`
  width: 100%;
  position: relative;
  height: ${navbar.height}px;
  background-color: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  ${({ shadow }) => shadow && `box-shadow: 0 0 3px rgba(0,0,0,.25);`};
  padding: 0 10px;
  box-sizing: border-box;
  z-index: 824;

  ${mq.gtTablet(css`
    position: fixed;
    top: 0;
    ${rtl.left}: 0;
  `)};
`;

Container.defaultProps = {
  theme: themeDefault,
};

const marginMixin = css`
  margin-${rtl.left}: 20px;
  &:first-child {
    margin-${rtl.left}: 0;
  }
  ${mq.ltTablet(css`
    margin-${rtl.left}: 5px;
  `)};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  & > div {
    ${marginMixin};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  & > button {
    ${marginMixin};
  }
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  headerLinks?: React.Node,
  starred: React.Node,
  chat: React.Node,
  subscription: React.Node,
  debug?: React.Node,
  shadow?: boolean,
  onOpenFaq: () => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
  portal?: string,
|};

const NavBar = ({
  headerLinks,
  starred,
  chat,
  subscription,
  debug,
  portal,
  shadow,
  onOpenFaq,
  onSaveLanguage,
  onSelectTrip,
}: Props) => (
  <LogConsumer>
    {({ log }) => (
      <Container x="space-between" y="center" shadow={shadow} dataTest="Navbar">
        <Flex y="center" x="flex-start">
          <Logo />
          {headerLinks && (
            <BrandConsumer>{brand => brand.id === "kiwicom" && headerLinks}</BrandConsumer>
          )}
        </Flex>
        <Flex y="center">
          <Wrapper>
            <Desktop display="flex">
              <ButtonWrapper>
                <Language
                  positionMenuDesktop={270}
                  positionMenuTablet={5}
                  onChange={onSaveLanguage}
                />
                <Currency positionMenuDesktop={270} positionMenuTablet={5} />
                <Help onOpen={onOpenFaq} />
              </ButtonWrapper>
            </Desktop>
            {starred && starred}
            <Mobile>
              <Help onOpen={onOpenFaq} />
            </Mobile>
            <AuthConsumer>
              {({ onResetError }) => (
                <Menu
                  chat={chat}
                  subscription={subscription}
                  debug={debug}
                  onResetError={onResetError}
                  onSaveLanguage={onSaveLanguage}
                  onSelectTrip={onSelectTrip}
                  onLog={log}
                  portal={portal}
                />
              )}
            </AuthConsumer>
          </Wrapper>
        </Flex>
      </Container>
    )}
  </LogConsumer>
);

NavBar.defaultProps = {
  shadow: true,
};

export default NavBar;
