// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import { navbar } from "../../styles";
import Translate from "../Translate";
import Desktop from "../Desktop";
import Toggle from "../Toggle";
import type { ThemeProps } from "../../records/Theme";
import { themeDefault } from "../../records/Theme";
import Flex from "../../primitives/Flex";
import Button from "./primitives/Button";
import Language from "../Language";
import { Consumer as BrandConsumer } from "../../services/brand/context";
import { Consumer as AuthConsumer } from "../../services/auth/context";
import Menu from "./components/Menu";
import Logo from "./components/Logo";
import Trips from "./components/Trips";
import Currency from "../Currency";
import type { Modal } from "../../consts/modals";
import marginMixin from "./styles/marginMixin";
// import Starred from "../Starred"; FIXME add as a full feature
// TODO: replace z-index with Orbit token after refactoring all front-end indexes

type Inverted = {|
  ...ThemeProps,
  inverted: boolean,
|};

const Container = styled(Flex)`
  width: 100%;
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

const WrapperChild = styled.div`
  display: flex;
  align-items: center;
  ${marginMixin};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  starred: React.Node,
  chat: React.Node,
  subscription: React.Node,
  debug: React.Node,
  portal: string,
  onOpenStarred: (e: SyntheticEvent<any>) => void,
  onOpenFaq: ?() => void,
  onSetModal: (modal: Modal) => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
  onLogoClick: (ev: SyntheticMouseEvent<HTMLAnchorElement>) => void,
  // defaulted
  headerLinks: React.Node,
  debug: React.Node,
  inverted: boolean,
|};

const NavBar = ({
  headerLinks,
  starred,
  chat,
  subscription,
  debug,
  portal,
  inverted,
  onOpenStarred,
  onOpenFaq,
  onSetModal,
  onSaveLanguage,
  onSelectTrip,
  onLogoClick,
}: Props) => (
  <Toggle>
    {({ open: openTrips, onToggle: onToggleTrips }) => (
      <>
        <Container x="space-between" y="center" data-test="NavBar" inverted={inverted}>
          <Stack flex shrink align="center">
            <Logo inverted={inverted} onClick={onLogoClick} />
            {headerLinks && (
              <BrandConsumer>{brand => brand.id === "kiwicom" && headerLinks}</BrandConsumer>
            )}
          </Stack>
          <Flex y="center">
            <Wrapper>
              <Desktop display="flex">
                <WrapperChild>
                  <ButtonWrapper>
                    <WrapperChild>
                      <Language
                        positionMenuDesktop={270}
                        positionMenuTablet={5}
                        inverted={inverted}
                        onChange={onSaveLanguage}
                        onSetModal={onSetModal}
                      />
                    </WrapperChild>
                    <WrapperChild>
                      <Currency
                        positionMenuDesktop={270}
                        positionMenuTablet={5}
                        inverted={inverted}
                        onSetModal={onSetModal}
                      />
                    </WrapperChild>
                    <WrapperChild>
                      <Button
                        data-test="Help"
                        onClick={onOpenFaq}
                        disabled={!onOpenFaq}
                        color={!inverted && "secondary"}
                      >
                        <Translate t="common.help" />
                      </Button>
                    </WrapperChild>
                    <WrapperChild>{starred}</WrapperChild>
                  </ButtonWrapper>
                </WrapperChild>
              </Desktop>
              <Menu
                chat={chat}
                subscription={subscription}
                starred={starred}
                debug={debug}
                onSetModal={onSetModal}
                onSaveLanguage={onSaveLanguage}
                onOpenStarred={onOpenStarred}
                onOpenFaq={onOpenFaq}
                onToggleTrips={onToggleTrips}
                inverted={inverted}
                portal={portal}
              />
            </Wrapper>
          </Flex>
        </Container>
        <AuthConsumer>
          {({ environment }) => (
            <Trips
              env={environment}
              portal={portal}
              open={openTrips}
              onToggle={onToggleTrips}
              onSelect={onSelectTrip}
            />
          )}
        </AuthConsumer>
      </>
    )}
  </Toggle>
);

NavBar.defaultProps = {
  headerLinks: null,
  debug: null,
  inverted: false,
};

export default NavBar;
