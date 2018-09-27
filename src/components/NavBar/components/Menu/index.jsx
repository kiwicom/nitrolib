// @flow strict
import * as React from "react";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import Desktop from "../../../Desktop";
import Mobile from "../../../Mobile";
import Text from "../../../Text";
import * as authContext from "../../../../services/auth/context";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import Button from "../../primitives/Button";
import Trips from "../Trips";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import SideNav from "./components/SideNav";
import MenuSpacings from "../../primitives/MenuSpacings";
import type { Event } from "../../../../records/Event";

type AuthModal = "myBooking" | "register" | "signIn" | "forgotPassword";

type Props = {|
  chat: React.Node,
  subscription: React.Node,
  debug?: React.Node,
  onSaveLanguage: (lang: string) => void,
  onLog: (event: Event<"openLoginModal", { modal: AuthModal }>) => void,
|};

type State = {|
  modalOpen: "" | AuthModal,
|};

export default class Menu extends React.PureComponent<Props, State> {
  state = {
    modalOpen: "",
  };

  handleClose = () => {
    this.setState({ modalOpen: "" });
  };

  handleOpenMyBooking = () => {
    const { onLog } = this.props;

    this.setState({ modalOpen: "myBooking" });
    onLog({ event: "openLoginModal", data: { modal: "myBooking" } });
  };

  handleOpenRegister = () => {
    const { onLog } = this.props;

    this.setState({ modalOpen: "register" });
    onLog({ event: "openLoginModal", data: { modal: "register" } });
  };

  handleOpenSignIn = () => {
    const { onLog } = this.props;

    this.setState({ modalOpen: "signIn" });
    onLog({ event: "openLoginModal", data: { modal: "signIn" } });
  };

  handleOpenForgotPassword = () => {
    const { onLog } = this.props;

    this.setState({ modalOpen: "forgotPassword" });
    onLog({ event: "openLoginModal", data: { modal: "forgotPassword" } });
  };

  render() {
    const { chat, subscription, debug, onSaveLanguage } = this.props;
    const { modalOpen } = this.state;

    return (
      <>
        <authContext.Consumer>
          {({ auth, environment }) =>
            auth === null ? (
              <MenuSpacings>
                <Desktop display="flex">
                  <Button onClick={this.handleOpenMyBooking}>
                    <Text t={__("account.my_bookings_action")} />
                  </Button>
                </Desktop>
                <Mobile display="flex">
                  <Button onClick={this.handleOpenMyBooking} padding="13px 9px">
                    <AccountCircle />
                  </Button>
                </Mobile>
              </MenuSpacings>
            ) : (
              <Trips auth={auth} env={environment} />
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
          <Modal onClose={this.handleClose} size="small">
            <ModalSection>
              {modalOpen === "forgotPassword" ? (
                <BrandConsumer>
                  {brand => <ForgotPassword brandId={brand.id} onClose={this.handleClose} />}
                </BrandConsumer>
              ) : (
                <Login
                  open={modalOpen}
                  onCloseSuccess={this.handleClose}
                  onOpenMyBooking={this.handleOpenMyBooking}
                  onOpenRegister={this.handleOpenRegister}
                  onOpenSignIn={this.handleOpenSignIn}
                  onOpenForgotPassword={this.handleOpenForgotPassword}
                />
              )}
            </ModalSection>
          </Modal>
        )}
      </>
    );
  }
}
