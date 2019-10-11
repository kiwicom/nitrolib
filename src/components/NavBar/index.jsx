// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import * as R from "ramda";

import { navbar } from "../../styles";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import type { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import Language from "../Language";
import Help from "./components/Help";
import Menu from "./components/Menu";
import Logo from "./components/Logo";
import Currency from "../Currency";
import type { Modal } from "../../consts/modals";

type Inverted = {|
  ...ThemeProps,
  inverted: boolean,
|};

type NavElement = "currencies" | "help" | "starred" | "mmb" | "languages";

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  height: ${navbar.height}px;
  background-color: ${({ theme, inverted }: Inverted) =>
    inverted ? theme.orbit.paletteProductNormal : theme.orbit.paletteWhite};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowFixed};
  padding: 0 10px;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  box-sizing: border-box;

  ${mq.tablet(css`
    position: fixed;
    top: 0;
    ${left}: 0;
  `)};
`;

Container.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  starred: React.Node,
  subscription: React.Node,
  debug: React.Node,
  portal: string,
  hide: NavElement | NavElement[],
  onOpenFaq: ?() => void,
  onSetModal: (modal: Modal) => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
  onLogoClick: (ev: SyntheticMouseEvent<HTMLAnchorElement>) => void,
  // defaulted
  headerLinks: React.Node,
  debug: React.Node,
  inverted: boolean,
  newDesign: boolean,
  animateLogo: boolean,
  logoAnimateShow: boolean,
|};

const NavBar = ({
  starred,
  headerLinks,
  subscription,
  debug,
  portal,
  inverted,
  animateLogo,
  logoAnimateShow,
  onOpenFaq,
  hide,
  onSetModal,
  newDesign,
  onSaveLanguage,
  onSelectTrip,
  onLogoClick,
}: Props) => {
  const visible = (input: NavElement | NavElement[]): boolean =>
    R.compose(
      R.not,
      // $FlowExpected: untyped ramda function
      R.includes(input),
    )(hide);

  return (
    <Container inverted={inverted}>
      <Stack justify="between" align="center" spacing="none" dataTest="NavBar">
        <Stack flex shrink inline align="center" spacing="none" mediumMobile={{ spacing: "comfy" }}>
          <Logo
            inverted={inverted}
            onClick={onLogoClick}
            animate={animateLogo}
            animateShow={logoAnimateShow}
          />
          {headerLinks}
        </Stack>
        <Stack
          inline
          align="center"
          justify="end"
          spacing="tight"
          mediumMobile={{ spacing: "comfy" }}
        >
          <Desktop>
            <Stack flex align="center" spacing="comfy">
              {visible("languages") && (
                <Language
                  positionMenuDesktop={270}
                  positionMenuTablet={5}
                  inverted={inverted}
                  onChange={onSaveLanguage}
                  onSetModal={onSetModal}
                />
              )}
              {visible("currencies") && (
                <Currency
                  positionMenuDesktop={270}
                  positionMenuTablet={5}
                  inverted={inverted}
                  onSetModal={onSetModal}
                />
              )}
              {visible("help") && <Help onOpen={onOpenFaq} inverted={inverted} />}
            </Stack>
          </Desktop>
          {visible("starred") && starred}
          <Mobile>{visible("help") && <Help onOpen={onOpenFaq} inverted={inverted} />}</Mobile>
          <Menu
            newDesign={newDesign}
            subscription={subscription}
            debug={debug}
            shown={visible("mmb")}
            onSetModal={onSetModal}
            onSaveLanguage={onSaveLanguage}
            onSelectTrip={onSelectTrip}
            inverted={inverted}
            portal={portal}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

NavBar.defaultProps = {
  headerLinks: null,
  debug: null,
  hide: [],
  inverted: false,
  newDesign: false,
  animateLogo: false,
  logoAnimateShow: false,
};

export default NavBar;
