// @flow strict
import * as React from "react";
import styled from "styled-components";
import MenuHamburger from "@kiwicom/orbit-components/lib/icons/MenuHamburger";
import FaAngleRight from "react-icons/lib/fa/angle-right";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import Portal from "@kiwicom/orbit-components/lib/Portal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import { right, rtlSpacing } from "@kiwicom/orbit-components/lib/utils/rtl";

import Translate from "../../../Translate";
import ClientOnly from "../../../ClientOnly/index";
import Mobile from "../../../Mobile";
import Language from "../../../Language";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import { Consumer as AuthConsumer } from "../../../../services/auth/context";
import type { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";
import Currency from "../../../Currency";
import LogMount from "../../../LogMount";
import { OPEN_CHAT } from "../../../../consts/events";
import SideBar from "../SideBar";
import MenuGroup from "./MenuGroup";
import MenuItem from "./MenuItem";
import BrandedMenuItem from "./BrandedMenuItem";
import { icons, getPagesItems, getSocialMediaItems } from "./services/menu";
import * as MODALS from "../../../../consts/modals";
import type { Modal as ModalType } from "../../../../consts/modals";

type InvertedProps = {|
  ...ThemeProps,
  inverted: boolean,
|};

const MediaIcons = styled.div`
  margin-top: 20px;
`;

const CurrencySpacing = styled.div`
  margin-top: 10px;
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

const Close = styled.div`
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

const CloseIcon = styled(FaAngleRight)`
  height: 14px;
  width: 14px;
  top: -28px;
  ${right}: -5px;
`;

CloseIcon.defaultProps = {
  theme: themeDefault,
};

const MenuOpen = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0 2px;
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

const Separator = styled.div`
  width: 100%;
  border-top: 1px dotted ${({ theme }: ThemeProps) => theme.orbit.paletteCloudNormal};
  margin: 24px 0;
`;

Separator.defaultProps = {
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

type State = {|
  modalOpen: "" | "chat" | "subscription" | "debug" | "sideNav",
|};

type Props = {|
  chat: React.Node,
  subscription: React.Node,
  debug?: React.Node,
  portal: string,
  inverted: boolean,
  onOpenSignIn: () => void,
  onOpenRegister: () => void,
  onSaveLanguage: (lang: string) => void,
  onSetModal: (modal: ModalType) => void,
|};

export default class SideNav extends React.Component<Props, State> {
  static defaultProps = {
    debug: false,
  };

  state = {
    modalOpen: MODALS.NONE,
  };

  handleToggle = () => {
    const { onSetModal } = this.props;
    const { modalOpen } = this.state;

    if (modalOpen === MODALS.SIDE_NAV) {
      onSetModal(MODALS.NONE);
      this.setState({ modalOpen: MODALS.NONE });
    } else {
      onSetModal(MODALS.SIDE_NAV);
      this.setState({ modalOpen: MODALS.SIDE_NAV });
    }
  };

  handleOpenSignIn = () => {
    const { onOpenSignIn } = this.props;
    onOpenSignIn();

    this.setState({ modalOpen: MODALS.NONE });
  };

  handleOpenRegister = () => {
    const { onOpenRegister } = this.props;
    onOpenRegister();

    this.setState({ modalOpen: MODALS.NONE });
  };

  handleOpenChat = () => {
    const { onSetModal } = this.props;
    onSetModal(MODALS.CHAT);

    this.setState({ modalOpen: MODALS.CHAT });
  };

  handleOpenSubscription = () => {
    const { onSetModal } = this.props;
    onSetModal(MODALS.SUBSCRIPTION);

    this.setState({ modalOpen: MODALS.SUBSCRIPTION });
  };

  handleOpenDebug = () => {
    const { onSetModal } = this.props;
    onSetModal(MODALS.DEBUG);

    this.setState({ modalOpen: MODALS.DEBUG });
  };

  handleCloseModal = () => {
    const { onSetModal } = this.props;
    onSetModal(MODALS.NONE);

    this.setState({ modalOpen: MODALS.NONE });
  };

  render = () => {
    const { chat, subscription, debug, onSaveLanguage, portal, inverted } = this.props;
    const { modalOpen } = this.state;

    return (
      <>
        <MenuOpen onClick={this.handleToggle} data-test="NavbarMenu" inverted={inverted}>
          <MenuHamburger />
        </MenuOpen>

        <ClientOnly>
          <SideBar onClick={this.handleToggle} shown={modalOpen === MODALS.SIDE_NAV}>
            <Close onClick={this.handleToggle} data-test="NavbarMenuClose">
              <Translate t="common.hide" /> <CloseIcon />
            </Close>

            <Content>
              {/* DEV FEATURES */}
              {debug && (
                <MenuGroup text="Dev features">
                  <MenuItem
                    Icon={icons.Settings}
                    onClick={this.handleOpenDebug}
                    text="Show debug window"
                  />
                </MenuGroup>
              )}

              <Separator />

              {/* Languages and Currencies */}
              <Mobile display="flex">
                <MenuGroup>
                  <Language onChange={onSaveLanguage} native />
                  <CurrencySpacing>
                    <Currency native />
                  </CurrencySpacing>
                  <Separator />
                </MenuGroup>
              </Mobile>

              {/* SIGN-IN/UP/OUT */}
              <AuthConsumer>
                {({ auth, onSignOut }) => (
                  <MenuGroup>
                    {auth !== null ? (
                      <MenuItem
                        Icon={icons.AccountCircle}
                        onClick={() => {
                          onSignOut();
                          this.handleToggle();
                        }}
                        text={<Translate t="account.log_out" />}
                      />
                    ) : (
                      <>
                        <MenuItem
                          Icon={icons.AccountCircle}
                          onClick={this.handleOpenSignIn}
                          text={<Translate t="account.sign_in" />}
                        />
                        <MenuItem
                          Icon={icons.AccountCircle}
                          onClick={this.handleOpenRegister}
                          text={<Translate t="account.sign_up" />}
                        />
                      </>
                    )}
                  </MenuGroup>
                )}
              </AuthConsumer>

              <Separator />

              <BrandConsumer>
                {brand => {
                  const company = getPagesItems(brand);
                  const socialMedia = getSocialMediaItems(brand);

                  return (
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
                            onClick={this.handleOpenSubscription}
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

                        {/* Chat */}
                        {brand.contacts.chat.enabled && (
                          <MenuItem
                            Icon={icons.Chat}
                            onClick={this.handleOpenChat}
                            text={<Translate t="booking.abandonment.help.chat_action" />}
                          />
                        )}

                        {/* --- Social links --- */}
                        <MediaIcons>
                          {socialMedia.map(({ link, Icon }) => (
                            <Link key={link} href={link} target="_blank" rel="noopener noreferrer">
                              {Icon && <Icon className="socialIcon" />}
                            </Link>
                          ))}
                        </MediaIcons>
                      </MenuGroup>

                      <Separator />

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
                        {company.branding && (
                          <BrandedMenuItem
                            title={company.branding.title}
                            Icon={company.branding.Icon}
                            link={company.branding.link}
                          />
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

                      <Separator />

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
                  );
                }}
              </BrandConsumer>
            </Content>
          </SideBar>
        </ClientOnly>

        {/* MODALS */}
        {modalOpen === MODALS.CHAT && (
          <Portal element={portal}>
            <Modal onClose={this.handleCloseModal} closable>
              <ModalSection>
                <LogMount event={{ event: OPEN_CHAT, data: null }} />
                {chat}
              </ModalSection>
            </Modal>
          </Portal>
        )}

        {modalOpen === MODALS.SUBSCRIPTION && (
          <Portal element={portal}>
            <Modal onClose={this.handleCloseModal} closable>
              <ModalSection>{subscription}</ModalSection>
            </Modal>
          </Portal>
        )}

        {modalOpen === MODALS.DEBUG && (
          <Portal element={portal}>
            <Modal onClose={this.handleCloseModal} closable>
              <ModalSection>{debug || null}</ModalSection>
            </Modal>
          </Portal>
        )}
      </>
    );
  };
}
