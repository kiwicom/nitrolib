// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";

import Modal from "../../../Modal";
import Text from "../../../Text";
import mq from "../../../../styles/mediaQuery";
import * as authContext from "../../../../services/auth/context";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import Button from "../../primitives/Button";
import Trips from "../Trips";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import SideNav from "./components/SideNav";
import MenuSpacings from "../../primitives/MenuSpacings";

type Props = {|
  chat: React.Node,
  subscription: React.Node,
  debug?: React.Node,
  onSaveToken: (token: string) => void,
  onSaveLanguage: (lang: string) => void,
|};

type AuthModal = "myBooking" | "register" | "signIn" | "forgotPassword";

type State = {|
  modalOpen: "" | AuthModal,
|};

const Desktop = styled.div`
  display: none;
  ${mq.gtTablet(css`
    display: flex;
  `)};
`;

const Mobile = styled.div`
  display: flex;
  ${mq.gtTablet(css`
    display: none;
  `)};
`;

export default class Menu extends React.PureComponent<Props, State> {
  state = {
    modalOpen: "",
  };

  handleClose = () => {
    this.setState({ modalOpen: "" });
  };

  handleOpenMyBooking = () => {
    this.setState({ modalOpen: "myBooking" });
  };

  handleOpenRegister = () => {
    this.setState({ modalOpen: "register" });
  };

  handleOpenSignIn = () => {
    this.setState({ modalOpen: "signIn" });
  };

  handleOpenForgotPassword = () => {
    this.setState({ modalOpen: "forgotPassword" });
  };

  render() {
    const { chat, subscription, debug, onSaveToken, onSaveLanguage } = this.props;
    const { modalOpen } = this.state;

    return (
      <>
        <authContext.Consumer>
          {({ user }) =>
            user === null ? (
              <MenuSpacings>
                <Desktop>
                  <Button onClick={this.handleOpenMyBooking}>
                    <Text t={__("account.my_bookings_action")} />
                  </Button>
                </Desktop>
                <Mobile>
                  <Button onClick={this.handleOpenMyBooking} padding="13px 9px">
                    <AccountCircle />
                  </Button>
                </Mobile>
              </MenuSpacings>
            ) : (
              <Trips user={user} />
            )
          }
        </authContext.Consumer>
        <SideNav
          chat={chat}
          subscription={subscription}
          debug={debug}
          onOpenRegister={this.handleOpenRegister}
          onOpenSignIn={this.handleOpenSignIn}
          onSaveLanguage={onSaveLanguage}
        />

        {modalOpen !== "" && (
          <Modal onClose={this.handleClose}>
            {modalOpen === "forgotPassword" ? (
              <BrandConsumer>
                {brand => <ForgotPassword brandId={brand.id} onClose={this.handleClose} />}
              </BrandConsumer>
            ) : (
              <Login
                open={modalOpen}
                onOpenMyBooking={this.handleOpenMyBooking}
                onOpenRegister={this.handleOpenRegister}
                onOpenSignIn={this.handleOpenSignIn}
                onOpenForgotPassword={this.handleOpenForgotPassword}
                onSaveToken={onSaveToken}
              />
            )}
          </Modal>
        )}
      </>
    );
  }
}
