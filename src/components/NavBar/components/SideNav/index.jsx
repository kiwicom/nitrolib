// @flow strict
import * as React from "react";
import styled from "styled-components";
import MenuHamburger from "@kiwicom/orbit-components/lib/icons/MenuHamburger";
import ChevronRight from "@kiwicom/orbit-components/lib/icons/ChevronRight";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import Portal from "@kiwicom/orbit-components/lib/Portal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import { right, rtlSpacing } from "@kiwicom/orbit-components/lib/utils/rtl";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Separator from "@kiwicom/orbit-components/lib/Separator";

import Translate from "../../../Translate";
import ClientOnly from "../../../ClientOnly";
import Mobile from "../../../Mobile";
import Language from "../../../Language";
import { useBrand } from "../../../../services/brand/context";
import { useAuth } from "../../../../services/auth/context";
import type { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";
import Currency from "../../../Currency";
import SideBar from "../../../SideBar";
import MenuGroup from "./MenuGroup";
import MenuItem from "./MenuItem";
import BrandedMenuItem from "./BrandedMenuItem";
import { icons, getPagesItems, getSocialMediaItems } from "./services/menu";
import * as MODALS from "../../../../consts/modals";
import type { Modal as ModalType } from "../../../../consts/modals";
import button from "../../../../styles/mixins/button";

type InvertedProps = {|
  ...ThemeProps,
  inverted: boolean,
|};

const MediaIcons = styled.div`
  padding-top: 10px;
`;

const Content = styled.div`
  margin-top: 75px;
  padding-bottom: 24px;

  .socialIcon {
    margin: 0 14px;
    width: 20px;
    height: 20px;
    text-decoration: none;
  }
`;

const Close = styled.button`
  ${button};
  position: absolute;
  top: 0;
  ${right}: 0;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  padding: ${rtlSpacing(`23px 30px 10px 0`)};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
  cursor: pointer;
`;

Close.defaultProps = {
  theme: themeDefault,
};

const MenuOpen = styled.button`
  ${button};
  cursor: pointer;
  display: flex;
  padding: 0 2px;
  background: transparent;
  svg {
    fill: ${({ inverted, theme }: InvertedProps) => inverted && theme.orbit.paletteWhite};
    height: 20px;
  }
  &:hover {
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
    border-radius: 3px;
    svg {
      fill: ${({ theme, inverted }: InvertedProps) =>
        inverted ? theme.orbit.paletteWhiteHover : theme.orbit.paletteWhite};
    }
  }
`;

MenuOpen.defaultProps = {
  theme: themeDefault,
};

const Link = styled.a`
  padding: 10px 0;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  cursor: pointer;

  &:link,
  &:visited {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  }

  &:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  }
`;

Link.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  subscription: React.Node,
  debug?: React.Node,
  portal: string,
  inverted: boolean,
  onOpenModal: (value: string) => void,
  onSaveLanguage: (lang: string) => void,
  onSetModal: (modal: ModalType) => void,
|};

const SideNav = ({
  subscription,
  debug,
  onSaveLanguage,
  portal,
  inverted,
  onSetModal,
  onOpenModal,
}: Props) => {
  const [state, setState] = React.useState({
    modalOpen: MODALS.NONE,
  });

  const { modalOpen } = state;
  const { auth, onSignOut } = useAuth();
  const brand = useBrand();
  const company = getPagesItems(brand);
  const socialMedia = getSocialMediaItems(brand);

  const handleToggle = () => {
    if (modalOpen === MODALS.SIDE_NAV) {
      onSetModal(MODALS.NONE);
      setState({ modalOpen: MODALS.NONE });
    } else {
      onSetModal(MODALS.SIDE_NAV);
      setState({ modalOpen: MODALS.SIDE_NAV });
    }
  };

  const handleOpenSignIn = () => {
    onOpenModal(MODALS.SIGN_IN);

    setState({ modalOpen: MODALS.NONE });
  };

  const handleOpenRegister = () => {
    onOpenModal(MODALS.REGISTER);

    setState({ modalOpen: MODALS.NONE });
  };

  const handleOpenSubscription = () => {
    onSetModal(MODALS.SUBSCRIPTION);

    setState({ modalOpen: MODALS.SUBSCRIPTION });
  };

  const handleOpenDebug = () => {
    onSetModal(MODALS.DEBUG);

    setState({ modalOpen: MODALS.DEBUG });
  };

  const handleCloseModal = () => {
    onSetModal(MODALS.NONE);

    setState({ modalOpen: MODALS.NONE });
  };

  return (
    <>
      <MenuOpen
        aria-label="open"
        data-test="NavBar-SideNav-Open"
        onClick={handleToggle}
        inverted={inverted}
      >
        <MenuHamburger />
      </MenuOpen>
      <ClientOnly>
        <SideBar onClick={handleToggle} shown={modalOpen === MODALS.SIDE_NAV}>
          <section data-test="NavBar-SideNav">
            <Close data-test="NavBar-SideNav-Close" onClick={handleToggle}>
              <Stack flex align="center" spacing="none">
                <Translate html t="common.hide" />{" "}
                <ChevronRight customColor="#00a991" size="small" />
              </Stack>
            </Close>

            <Content>
              {/* DEV FEATURES */}
              {debug && (
                <MenuGroup text="Dev features">
                  <MenuItem
                    Icon={icons.Settings}
                    onClick={handleOpenDebug}
                    text="Show debug window"
                  />
                </MenuGroup>
              )}
              <Separator spaceAfter="large" />
              {/* Languages and Currencies */}
              <Mobile display="flex">
                <Stack flex direction="column" spacing="none">
                  <MenuGroup>
                    <Language onChange={onSaveLanguage} native />
                    <Currency native />
                  </MenuGroup>
                  <Separator spaceAfter="large" />
                </Stack>
              </Mobile>
              {/* SIGN-IN/UP/OUT */}
              <MenuGroup>
                {auth !== null ? (
                  <MenuItem
                    Icon={icons.AccountCircle}
                    onClick={() => {
                      onSignOut();
                      handleToggle();
                    }}
                    text={<Translate t="account.log_out" />}
                  />
                ) : (
                  <>
                    <MenuItem
                      Icon={icons.AccountCircle}
                      onClick={handleOpenSignIn}
                      text={<Translate t="account.sign_in" />}
                    />
                    <MenuItem
                      Icon={icons.AccountCircle}
                      onClick={handleOpenRegister}
                      text={<Translate t="account.sign_up" />}
                    />
                  </>
                )}
              </MenuGroup>
              <Separator spaceAfter="large" />
              <>
                {/* EXPLORE */}
                <MenuGroup text={<Translate t="sidenav.connect" />}>
                  {company.invite && (
                    <BrandedMenuItem
                      title={company.invite.title}
                      Icon={company.invite.Icon}
                      link={company.invite.link}
                    />
                  )}

                  {/* Newsletter */}
                  {brand.communication.newsletter.enabled && (
                    <MenuItem
                      Icon={icons.ContactEmail}
                      onClick={handleOpenSubscription}
                      text={<Translate t="common.subscribe" />}
                    />
                  )}

                  {company.stories && (
                    <BrandedMenuItem
                      title={company.stories.title}
                      Icon={company.stories.Icon}
                      link={company.stories.link}
                    />
                  )}

                  {/* --- Social links --- */}
                  <MediaIcons>
                    {socialMedia.map(({ link, Icon, label }) => (
                      <Link
                        key={link}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label && <Translate t={label} />}
                      >
                        {Icon && <Icon className="socialIcon" />}
                      </Link>
                    ))}
                  </MediaIcons>
                </MenuGroup>

                <Separator spaceAfter="large" />

                {/* COMPANY */}
                <MenuGroup text={<Translate t="sidenav.company" />}>
                  {company.about && (
                    <BrandedMenuItem
                      title={company.about.title}
                      Icon={company.about.Icon}
                      link={company.about.link}
                    />
                  )}
                  {company.careers && (
                    <BrandedMenuItem
                      title={company.careers.title}
                      Icon={company.careers.Icon}
                      link={company.careers.link}
                    />
                  )}
                  {brand.id === "kiwicom" && (
                    <>
                      <MenuItem
                        Icon={icons.KiwicomCare}
                        link="https://care.kiwi.com/"
                        text="Care Kiwi.com"
                      />
                      <MenuItem
                        Icon={icons.Code}
                        link="https://code.kiwi.com/"
                        text="Code Kiwi.com"
                      />
                    </>
                  )}
                  {company.guarantee && (
                    <BrandedMenuItem
                      title={company.guarantee.title}
                      Icon={company.guarantee.Icon}
                      link={company.guarantee.link}
                    />
                  )}
                  {company.media && (
                    <BrandedMenuItem
                      title={company.media.title}
                      Icon={company.media.Icon}
                      link={company.media.link}
                    />
                  )}
                </MenuGroup>

                <Separator spaceAfter="large" />
                <MenuGroup text={<Translate t="content.pages.legal.title" />}>
                  {company.terms && (
                    <BrandedMenuItem
                      title={company.terms.title}
                      Icon={company.terms.Icon}
                      link={company.terms.link}
                    />
                  )}
                  {company.gdpr_terms && (
                    <BrandedMenuItem
                      title={company.gdpr_terms.title}
                      Icon={company.gdpr_terms.Icon}
                      link={company.gdpr_terms.link}
                    />
                  )}
                  {company.privacy && (
                    <BrandedMenuItem
                      title={company.privacy.title}
                      Icon={company.privacy.Icon}
                      link={company.privacy.link}
                    />
                  )}
                  {company.security && (
                    <BrandedMenuItem
                      title={company.security.title}
                      Icon={company.security.Icon}
                      link={company.security.link}
                    />
                  )}
                  <MenuItem
                    text={<Translate t="seo.content.title_cookies_settings" />}
                    link="/pages/cookies_settings"
                    Icon={icons.Settings}
                  />
                </MenuGroup>
              </>
            </Content>
          </section>
        </SideBar>
      </ClientOnly>
      {/* MODALS */}
      {modalOpen === MODALS.SUBSCRIPTION && (
        <Portal renderInto={portal}>
          <Modal onClose={handleCloseModal}>
            <ModalSection>{subscription}</ModalSection>
          </Modal>
        </Portal>
      )}
      {modalOpen === MODALS.DEBUG && (
        <Portal renderInto={portal}>
          <Modal onClose={handleCloseModal}>
            <ModalSection>{debug || null}</ModalSection>
          </Modal>
        </Portal>
      )}
    </>
  );
};

export default SideNav;
