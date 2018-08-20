// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";

import Modal from "../../../Modal";
import Text from "../../../Text";
import mq from "../../../../styles/mediaQuery";
import * as authContext from "../../../../services/auth/context";
import Button from "../../primitives/Button";
import Trips from "../Trips";
import Login from "./components/Login";
import SideNav from "./components/SideNav";

type Props = {|
  debug: boolean,
  onOpenDebug?: () => void,
  onOpenSubscription: () => void,
  onOpenChat: () => void,
  onSaveToken: (token: string) => void,
  onSaveLanguage: (lang: string) => void,
|};

type LoginModal = "myBooking" | "register" | "signIn";

type State = {|
  modalOpen: "" | LoginModal,
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

export default class SideBar extends React.PureComponent<Props, State> {
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

  render() {
    const {
      onOpenChat,
      onOpenSubscription,
      debug,
      onOpenDebug,
      onSaveToken,
      onSaveLanguage,
    } = this.props;
    const { modalOpen } = this.state;

    return (
      <>
        <authContext.Consumer>
          {({ user }) =>
            user === null ? (
              <>
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
              </>
            ) : (
              <Trips user={user} />
            )
          }
        </authContext.Consumer>
        <SideNav
          onOpenChat={onOpenChat}
          onOpenSubscription={onOpenSubscription}
          onOpenRegister={this.handleOpenRegister}
          onOpenSignIn={this.handleOpenSignIn}
          debug={debug}
          onOpenDebug={onOpenDebug}
          onSaveLanguage={onSaveLanguage}
        />

        {modalOpen !== "" && (
          <Modal onClose={this.handleClose}>
            <Login
              open={modalOpen}
              onOpenMyBooking={this.handleOpenMyBooking}
              onOpenRegister={this.handleOpenRegister}
              onOpenSignIn={this.handleOpenSignIn}
              onSaveToken={onSaveToken}
            />
          </Modal>
        )}
      </>
    );
  }
}
