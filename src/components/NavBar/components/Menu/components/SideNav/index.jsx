// @flow strict
import * as React from "react";
import styled from "styled-components";
import MenuHamburger from "@kiwicom/orbit-components/lib/icons/MenuHamburger";
import FaAngleRight from "react-icons/lib/fa/angle-right";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import ClientOnly from "../../../../../ClientOnly";
import Mobile from "../../../../../Mobile";
import Text from "../../../../../Text";
import Language from "../../../../../Language";
import { Consumer as BrandConsumer } from "../../../../../../services/brand/context";
import { Consumer as AuthConsumer } from "../../../../../../services/auth/context";
import type { ThemeProps } from "../../../../../../records/Theme";
import { themeDefault } from "../../../../../../records/Theme";
import * as rtl from "../../../../../../styles/rtl";
import Currency from "../../../../../Currency";
import LogMount from "../../../../../LogMount";
import { OPEN_CHAT } from "../../../../../../consts/events";
import SideBar from "../../../SideBar";
import MenuGroup from "./MenuGroup";
import MenuItem from "./MenuItem";
import BrandedMenuItem from "./BrandedMenuItem";
import { icons, getPagesItems, getSocialMediaItems } from "./services/menu";

const SIDENAV_OPENED_CLASS = "sidenav-opened";

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
  ${rtl.right}: 0;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  padding: ${rtl.box(23, 30, 10, 0)};
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
  ${rtl.right}: -5px;
`;

CloseIcon.defaultProps = {
  theme: themeDefault,
};

const MenuOpen = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0 2px;
  &:hover {
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
    border-radius: 3px;
    svg {
      fill: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
    }
  }
  svg {
    height: 20px;
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
  shown: boolean,
  modalOpen: "" | "chat" | "subscription" | "debug",
|};

type Props = {|
  chat: React.Node,
  subscription: React.Node,
  debug?: React.Node,
  onOpenSignIn: () => void,
  onOpenRegister: () => void,
  onSaveLanguage: (lang: string) => void,
  onSideNavChange?: (shown: boolean) => void,
|};

export default class SideNav extends React.Component<Props, State> {
  static defaultProps = {
    debug: false,
  };

  state = {
    shown: false,
    modalOpen: "",
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { shown } = this.state;
    const { onSideNavChange } = this.props;

    if (shown !== prevState.shown) {
      const body = document.querySelector("body");

      if (body) {
        if (shown) {
          body.classList.add(SIDENAV_OPENED_CLASS);
        } else {
          body.classList.remove(SIDENAV_OPENED_CLASS);
        }
      }

      if (onSideNavChange) {
        onSideNavChange(shown);
      }
    }
  }

  handleToggle = () => {
    this.setState(state => ({
      shown: !state.shown,
    }));
  };

  handleOpenSignIn = () => {
    const { onOpenSignIn } = this.props;
    onOpenSignIn();
    this.handleToggle();
  };

  handleOpenRegister = () => {
    const { onOpenRegister } = this.props;
    onOpenRegister();
    this.handleToggle();
  };

  handleOpenChat = () => {
    this.setState({
      shown: false,
      modalOpen: "chat",
    });
  };

  handleOpenSubscription = () => {
    this.setState({
      shown: false,
      modalOpen: "subscription",
    });
  };

  handleOpenDebug = () => {
    this.setState({
      shown: false,
      modalOpen: "debug",
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalOpen: "",
    });
  };

  render = () => {
    const { chat, subscription, debug, onSaveLanguage } = this.props;
    const { shown, modalOpen } = this.state;

    return (
      <>
        <MenuOpen onClick={this.handleToggle} data-test="NavbarMenu">
          <MenuHamburger />
        </MenuOpen>

        <ClientOnly>
          {modalOpen === "" && (
            <SideBar onClick={this.handleToggle} shown={shown}>
              <Close onClick={this.handleToggle} data-test="NavbarMenuClose">
                <Text t={__("common.hide")} /> <CloseIcon />
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
                          text={<Text t={__("account.log_out")} />}
                        />
                      ) : (
                        <>
                          <MenuItem
                            Icon={icons.AccountCircle}
                            onClick={this.handleOpenSignIn}
                            text={<Text t={__("account.sign_in")} />}
                          />
                          <MenuItem
                            Icon={icons.AccountCircle}
                            onClick={this.handleOpenRegister}
                            text={<Text t={__("account.sign_up")} />}
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
                        <MenuGroup text={<Text t={__("sidenav.connect")} />}>
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
                              text={<Text t={__("common.subscribe")} />}
                            />
                          )}

                          {/* Top routes */}
                          {brand.content.pages.top_routes.enabled && (
                            <MenuItem
                              Icon={icons.StarFull}
                              link="/flights"
                              text={<Text t={__("navbar.top-routes")} />}
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
                              text={<Text t={__("booking.abandonment.help.chat_action")} />}
                            />
                          )}

                          {/* --- Social links --- */}
                          <MediaIcons>
                            {socialMedia.map(({ link, Icon }) => (
                              <Link
                                key={link}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {Icon && <Icon className="socialIcon" />}
                              </Link>
                            ))}
                          </MediaIcons>
                        </MenuGroup>

                        <Separator />

                        {/* COMPANY */}
                        <MenuGroup text={<Text t={__("sidenav.company")} />}>
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

                        <MenuGroup text={<Text t={__("content.pages.legal.title")} />}>
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
                            text="Cookies settings"
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
          )}
        </ClientOnly>

        {/* MODALS */}
        {modalOpen === "chat" && (
          <Modal onClose={this.handleCloseModal}>
            <ModalSection>
              <LogMount event={{ event: OPEN_CHAT, data: null }} />
              {chat}
            </ModalSection>
          </Modal>
        )}

        {modalOpen === "subscription" && (
          <Modal onClose={this.handleCloseModal}>
            <ModalSection>{subscription}</ModalSection>
          </Modal>
        )}

        {modalOpen === "debug" && (
          <Modal onClose={this.handleCloseModal}>
            <ModalSection>{debug}</ModalSection>
          </Modal>
        )}
      </>
    );
  };
}
