// @flow strict
import * as React from "react";
import * as R from "ramda";
import MenuHamburger from "@kiwicom/orbit-components/lib/icons/MenuHamburger";
import styled from "styled-components";
import AngleRight from "react-icons/lib/fa/angle-right";

import ClientOnly from "client/components/ClientOnly";
import Text from "client/components/Text";
import * as sessionContext from "client/services/session/context";
import * as brandContext from "client/services/brand/context";
import Portal from "./Portal";
import MenuGroup from "./MenuGroup";
import MenuItem from "./MenuItem";
import BrandedMenuItem from "./BrandedMenuItem";
import { IS_DEBUG_ENABLED, companySection, getSocialMedia } from "./Constants";

type State = {|
  shown: boolean,
|};

type Props = {|
  onOpenRegister: () => void,
  onOpenSignIn: () => void,
|};

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
  flex: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 400px;
  background: white;
  transition: right 1.25s ease-in;
`;

const Close = styled.div`
  cursor: pointer;
  color: green;
`;

const CloseIcon = styled(AngleRight)`
  height: 14px;
  width: 14px;
  top: -28px;
  right: -5px;
`;
const MenuOpen = styled.div`
  cursor: pointer;
`;

export default class SideNav extends React.Component<Props, State> {
  state = {
    shown: false,
  };

  handleToggle = () => {
    this.setState({ shown: !this.state.shown });
  };

  showDebugModal = () => {
    alert("Not implemented yet");
  };

  showSubscriptionForm = () => {
    alert("Not implemented yet");
  };

  handleOpenChat = () => {
    alert("Not implemented yet");
  };

  render = () => (
    <>
      <MenuOpen onClick={this.handleToggle}>
        {" "}
        <MenuHamburger />
      </MenuOpen>
      {this.state.shown && (
        <Portal>
          <SideNavMenu>
            <Wrapper>
              <Close onClick={this.handleToggle}>
                <Text t={__("common.hide")} /> <CloseIcon />
              </Close>

              {/* DEV FEATURES */}
              <ClientOnly>
                {IS_DEBUG_ENABLED && (
                  <MenuGroup headerText="Dev features">
                    <MenuItem
                      iconName="Settings"
                      onClick={this.showDebugModal}
                      text="Show debug window"
                    />
                  </MenuGroup>
                )}
              </ClientOnly>

              {/* SIGN-IN/UP/OUT */}
              <sessionContext.Consumer>
                {session => (
                  <MenuGroup>
                    {session.userId ? (
                      <MenuItem
                        iconName="AccountCircle"
                        onClick={this.props.onOpenSignIn}
                        text={__("account.log_out")}
                      />
                    ) : (
                      <>
                        <MenuItem
                          iconName="AccountCircle"
                          onClick={this.props.onOpenSignIn}
                          text={__("account.sign_in")}
                        />
                        <MenuItem
                          iconName="AccountCircle"
                          onClick={this.props.onOpenRegister}
                          text={__("account.sign_up")}
                        />
                      </>
                    )}
                  </MenuGroup>
                )}
              </sessionContext.Consumer>

              <brandContext.Consumer>
                {brand => {
                  const company = companySection(brand);
                  return (
                    <>
                      {/* EXPLORE */}
                      <MenuGroup headerText={__("sidenav.connect")}>
                        <BrandedMenuItem itemConfig={R.prop("invite", company)} />

                        {/* Newsletter */}
                        {brand.communication.newsletter.enabled && (
                          <MenuItem
                            iconName="ContactEmail"
                            onClick={this.showSubscriptionForm}
                            text={__("common.subscribe")}
                          />
                        )}

                        {/* Top routes */}
                        {brand.content.pages.top_routes.enabled && (
                          <MenuItem
                            iconName="StarFull"
                            href="/flights"
                            text={__("navbar.top-routes")}
                          />
                        )}

                        <BrandedMenuItem itemConfig={R.prop("stories", company)} />

                        {/* Chat */}
                        {brand.contacts.chat.enabled && (
                          <MenuItem
                            iconName="Chat"
                            onClick={this.handleOpenChat}
                            text={__("booking.abandonment.help.chat_action")}
                          />
                        )}

                        {/* --- Social links --- */}
                        {R.any(media => media.enabled)(brand.content.media) && (
                          <div className="SideNav-menu-item _icons">
                            {getSocialMedia(brand).map((item, networkName) => "networkName")}
                          </div>
                        )}
                      </MenuGroup>

                      {/* COMPANY */}
                      <MenuGroup headerText={__("sidenav.company")}>
                        <BrandedMenuItem itemConfig={R.prop("about", company)} />
                        <BrandedMenuItem itemConfig={R.prop("careers", company)} />
                        {brand.id === "kiwicom" && (
                          <>
                            <MenuItem
                              iconName="KiwicomCare"
                              href="https://care.kiwi.com/"
                              text="Care Kiwi.com"
                            />
                            <MenuItem
                              iconName="Code"
                              href="https://code.kiwi.com/"
                              text="Code Kiwi.com"
                            />
                          </>
                        )}
                        <BrandedMenuItem itemConfig={R.prop("branding", company)} />
                        <BrandedMenuItem itemConfig={R.prop("guarantee", company)} />
                        <BrandedMenuItem itemConfig={R.prop("terms", company)} />
                        <BrandedMenuItem itemConfig={R.prop("privacy", company)} />
                        <BrandedMenuItem itemConfig={R.prop("media", company)} />
                        <BrandedMenuItem itemConfig={R.prop("security", company)} />
                        <BrandedMenuItem itemConfig={R.prop("gdpr_terms", company)} />
                        <MenuItem
                          text="Cookies settings"
                          href="/pages/cookies_settings"
                          iconName="Settings"
                        />
                      </MenuGroup>
                    </>
                  );
                }}
              </brandContext.Consumer>
            </Wrapper>
          </SideNavMenu>
        </Portal>
      )}
    </>
  );
}
