// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import MenuHamburger from "@kiwicom/orbit-components/lib/icons/MenuHamburger";
import FaAngleRight from "react-icons/lib/fa/angle-right";

import ClientOnly from "components/ClientOnly";
import Text from "components/Text";
import * as brandContext from "services/brand/context";
import type { ThemeProps } from "records/Theme";
import { themeDefault } from "records/Theme";
import mq from "styles/mediaQuery";
import Language from "components/Language";
import { Consumer as AuthConsumer } from "services/auth/context";
import Currency from "../../../../components/Currency";
import Portal from "./Portal";
import MenuGroup from "./MenuGroup";
import MenuItem from "./MenuItem";
import BrandedMenuItem from "./BrandedMenuItem";
import { icons, getPagesItems, getSocialMediaItems } from "./services/menu";

const SideNavMenu = styled.section`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 480px;
  font-weight: 500;
  font-size: 14px;
  background: white;
  overflow-y: auto;
  transition: right 1.25s ease-in;
  box-shadow: 0 6px 16px rgba(46, 53, 59, 0.22), 0 1px 3px rgba(0, 0, 0, 0.09);

  ${mq.ltTablet(css`
    max-width: 320px;
    width: 100%;
  `)};
`;

const Mobile = styled.div`
  display: flex;
  ${mq.gtTablet(css`
    display: none;
  `)};
`;

const MediaIcons = styled.div`
  margin-top: 20px;
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
  right: 0;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  padding: 23px 30px 10px 0;
  font-size: 14px;
  cursor: pointer;
`;

Close.defaultProps = {
  theme: themeDefault,
};

const CloseIcon = styled(FaAngleRight)`
  height: 14px;
  width: 14px;
  top: -28px;
  right: -5px;
`;

const MenuOpen = styled.div`
  cursor: pointer;
`;

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

  &:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  }
`;

Link.defaultProps = {
  theme: themeDefault,
};

type State = {|
  shown: boolean,
|};

type Props = {|
  onOpenSubscription: () => void,
  onOpenChat: () => void,
  onOpenRegister: () => void,
  onOpenSignIn: () => void,
  debug?: boolean,
  onOpenDebug?: () => void,
  onSaveLanguage: (lang: string) => void,
|};

export default class SideNav extends React.Component<Props, State> {
  static defaultProps = {
    debug: false,
  };

  state = {
    shown: false,
  };

  handleToggle = () => {
    this.setState(state => ({
      shown: !state.shown,
    }));
  };

  openSignIn = () => {
    const { onOpenSignIn } = this.props;
    onOpenSignIn();
    this.handleToggle();
  };

  openRegister = () => {
    const { onOpenRegister } = this.props;
    onOpenRegister();
    this.handleToggle();
  };

  render = () => {
    const { debug, onOpenDebug, onOpenSubscription, onOpenChat, onSaveLanguage } = this.props;
    const { shown } = this.state;

    return (
      <>
        <MenuOpen onClick={this.handleToggle}>
          {" "}
          <MenuHamburger />
        </MenuOpen>
        {shown && (
          <Portal>
            <SideNavMenu>
              <Wrapper>
                <Close onClick={this.handleToggle}>
                  <Text t={__("common.hide")} /> <CloseIcon />
                </Close>

                <Content>
                  {/* DEV FEATURES */}
                  <ClientOnly>
                    {debug && (
                      <MenuGroup text="Dev features">
                        <MenuItem
                          Icon={icons.Settings}
                          onClick={onOpenDebug}
                          text="Show debug window"
                        />
                      </MenuGroup>
                    )}
                  </ClientOnly>

                  <Separator />

                  {/* Languages and Currencies */}
                  {/* TODO: fix language icon for sidebar */}
                  <Mobile>
                    <MenuGroup>
                      <Language onChange={onSaveLanguage} />
                      <ClientOnly>
                        <MenuItem Icon={icons.Exchange} text={<Currency />} />
                      </ClientOnly>
                      <Separator />
                    </MenuGroup>
                  </Mobile>

                  {/* SIGN-IN/UP/OUT */}
                  <AuthConsumer>
                    {auth => (
                      <MenuGroup>
                        {auth.user ? (
                          <MenuItem
                            Icon={icons.AccountCircle}
                            onClick={this.openSignIn}
                            text={<Text t={__("account.log_out")} />}
                          />
                        ) : (
                          <>
                            <MenuItem
                              Icon={icons.AccountCircle}
                              onClick={this.openSignIn}
                              text={<Text t={__("account.sign_in")} />}
                            />
                            <MenuItem
                              Icon={icons.AccountCircle}
                              onClick={this.openRegister}
                              text={<Text t={__("account.sign_up")} />}
                            />
                          </>
                        )}
                      </MenuGroup>
                    )}
                  </AuthConsumer>

                  <Separator />

                  <brandContext.Consumer>
                    {brand => {
                      const company = getPagesItems(brand); // TODO move to provider
                      const socialMedia = getSocialMediaItems(brand); // TODO move to provider

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
                                onClick={onOpenSubscription}
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
                                onClick={onOpenChat}
                                text={<Text t={__("booking.abandonment.help.chat_action")} />}
                              />
                            )}

                            {/* --- Social links --- */}
                            <MediaIcons>
                              {socialMedia.map(({ link, Icon }) => (
                                <Link
                                  key={link}
                                  link={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Icon className="socialIcon" />
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
                  </brandContext.Consumer>
                </Content>
              </Wrapper>
            </SideNavMenu>
          </Portal>
        )}
      </>
    );
  };
}
