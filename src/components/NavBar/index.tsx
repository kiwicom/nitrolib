import * as React from "react";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import { navbar } from "../../styles";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import Language from "../Language";
import Help from "./components/Help";
import Menu from "./components/Menu";
import Logo from "./components/Logo";
import Currency from "../Currency";
import { Modal } from "../../consts/modals";

type Inverted = {
  ...ThemeProps,
  inverted: boolean,
};

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  height: ${navbar.height}px;
  background-color: ${({ theme, inverted }: Inverted) =>
    inverted ? theme.orbit.paletteProductNormal : theme.orbit.paletteWhite};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
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

type Props = {
  starred: React.ReactNode,
  subscription: React.ReactNode,
  debug: React.ReactNode,
  portal: string,
  onOpenFaq: ?() => void,
  onSetModal: (modal: Modal) => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
  onLogoClick: (ev: SyntheticMouseEvent<HTMLAnchorElement>) => void,
  // defaulted
  headerLinks: React.ReactNode,
  debug: React.ReactNode,
  inverted: boolean,
};

const NavBar = ({
  starred,
  headerLinks,
  subscription,
  debug,
  portal,
  inverted,
  onOpenFaq,
  onSetModal,
  onSaveLanguage,
  onSelectTrip,
  onLogoClick,
}: Props) => (
  <Container inverted={inverted}>
    <Stack justify="between" align="center" dataTest="NavBar">
      <Stack flex shrink inline align="center">
        <Logo inverted={inverted} onClick={onLogoClick} />
        {headerLinks}
      </Stack>
      <Stack inline align="center" justify="end" spacing="tight" tablet={{ spacing: "natural" }}>
        <Desktop display="flex">
          <Stack flex align="center">
            <Language
              positionMenuDesktop={270}
              positionMenuTablet={5}
              inverted={inverted}
              onChange={onSaveLanguage}
              onSetModal={onSetModal}
            />
            <Currency
              positionMenuDesktop={270}
              positionMenuTablet={5}
              inverted={inverted}
              onSetModal={onSetModal}
            />
            <Help onOpen={onOpenFaq} inverted={inverted} />
          </Stack>
        </Desktop>
        {starred}
        <Mobile>
          <Help onOpen={onOpenFaq} inverted={inverted} />
        </Mobile>
        <Menu
          subscription={subscription}
          debug={debug}
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

NavBar.defaultProps = {
  headerLinks: null,
  debug: null,
  inverted: false,
};

export default NavBar;
