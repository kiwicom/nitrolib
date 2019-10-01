// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Mobile from "@kiwicom/orbit-components/lib/Mobile";
import Desktop from "@kiwicom/orbit-components/lib/Desktop";
import * as R from "ramda";
import NavigationBar from "@kiwicom/orbit-components/lib/NavigationBar";
import NavigationList from "@kiwicom/orbit-components/lib/NavigationList";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";

import * as MODALS from "../../consts/modals";
import Language from "../Language";
import Help from "./components/Help";
import Menu from "./components/Menu";
import Logo from "./components/Logo";
import Currency from "../Currency";
import type { Modal } from "../../consts/modals";

type NavElement = "currencies" | "help" | "starred" | "mmb" | "languages" | "logo" | "sideNav";

type Props = {|
  starred: React.Node,
  subscription: React.Node,
  debug: React.Node,
  portal: string,
  hide: NavElement | NavElement[],
  onOpenFaq: () => void,
  onSetModal: (modal: Modal) => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
  onLogoClick: (ev: SyntheticMouseEvent<HTMLAnchorElement>) => void,
  // defaulted
  headerLinks: React.Node,
  debug: React.Node,
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

  const [shown, setShown] = React.useState(MODALS.NONE);

  const toggle = () => setShown(shown === MODALS.SIDE_NAV ? MODALS.NONE : MODALS.SIDE_NAV);

  return (
    <NavigationBar onMenuOpen={toggle}>
      <Stack flex align="center" justify="between" spacing="condensed">
        {visible("logo") && (
          <Logo onClick={onLogoClick} animate={animateLogo} animateShow={logoAnimateShow} />
        )}
        <Stack inline align="center" spacing="none">
          {headerLinks}
        </Stack>

        <Desktop>
          <NavigationList type="inline">
            {visible("languages") && (
              <Language
                positionMenuDesktop={270}
                positionMenuTablet={5}
                onChange={onSaveLanguage}
                onSetModal={onSetModal}
              />
            )}

            {visible("currencies") && (
              <Currency positionMenuDesktop={270} positionMenuTablet={5} onSetModal={onSetModal} />
            )}

            {visible("help") && <Help onOpen={onOpenFaq} />}

            {visible("starred") && (
              <ButtonLink type="secondary" transparent>
                {starred}
              </ButtonLink>
            )}
            {visible("sideNav") && (
              <Menu
                newDesign={newDesign}
                subscription={subscription}
                debug={debug}
                shown={visible("mmb")}
                isOpenNav={shown}
                onToggle={toggle}
                sideNav={visible("sideNav")}
                onSetModal={onSetModal}
                onSaveLanguage={onSaveLanguage}
                onSelectTrip={onSelectTrip}
                portal={portal}
              />
            )}
          </NavigationList>
        </Desktop>

        <Mobile>
          <NavigationList type="inline">
            {visible("help") && <Help onOpen={onOpenFaq} />}

            {visible("starred") && (
              <ButtonLink type="secondary" transparent>
                {starred}
              </ButtonLink>
            )}
          </NavigationList>
        </Mobile>
      </Stack>
    </NavigationBar>
  );
};

NavBar.defaultProps = {
  headerLinks: null,
  debug: null,
  hide: [],
  newDesign: false,
  animateLogo: false,
  logoAnimateShow: false,
};

export default NavBar;
