// @flow strict
import * as React from "react";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Portal from "@kiwicom/orbit-components/lib/Portal";

import CloseByKey from "../../../CloseByKey";
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
import type { Event } from "../../../../records/Event";
import { OPEN_MODAL } from "../../../../consts/events";

type AuthModal = "myBooking" | "register" | "signIn" | "forgotPassword";

type Props = {|
  chat: React.Node,
  portal?: string,
  subscription: React.Node,
  debug?: React.Node,
  onResetError: () => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
  onLog: (event: Event<"OPEN_MODAL", { modal: AuthModal }>) => void,
|};

type State = {|
  modalOpen: "" | AuthModal,
|};

export default class Menu extends React.Component<Props, State> {
  state = {
    modalOpen: "",
  };

  handleClose = () => {
    const { onResetError } = this.props;

    onResetError();
    this.setState({ modalOpen: "" });
  };

  handleOpenMyBooking = () => {
    const { onLog } = this.props;

    this.setState({ modalOpen: "myBooking" });
    onLog({ event: OPEN_MODAL, data: { modal: "myBooking" } });
  };

  handleOpenRegister = () => {
    const { onLog } = this.props;
    this.setState({ modalOpen: "register" });
    onLog({ event: OPEN_MODAL, data: { modal: "register" } });
  };

  handleOpenSignIn = () => {
    const { onLog } = this.props;

    this.setState({ modalOpen: "signIn" });
    onLog({ event: OPEN_MODAL, data: { modal: "signIn" } });
  };

  handleOpenForgotPassword = () => {
    const { onLog } = this.props;
    this.setState({ modalOpen: "forgotPassword" });
    onLog({ event: OPEN_MODAL, data: { modal: "forgotPassword" } });
  };

  render() {
    const { chat, subscription, debug, onSaveLanguage, onSelectTrip, portal } = this.props;
    const { modalOpen } = this.state;

    return (
      <>
        <authContext.Consumer>
          {({ auth, environment }) =>
            auth === null ? (
              <>
                <Desktop display="flex">
                  <Button direction="x" onClick={this.handleOpenMyBooking} background="white">
                    <Text t={__("account.my_bookings_action")} />
                  </Button>
                </Desktop>
                <Mobile display="flex">
                  <Button direction="x" onClick={this.handleOpenMyBooking} padding="13px 9px">
                    <AccountCircle />
                  </Button>
                </Mobile>
              </>
            ) : (
              <Trips auth={auth} env={environment} onSelect={onSelectTrip} />
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
          <CloseByKey onClose={this.handleClose}>
            {portal ? (
              <Portal element={portal}>
                <Modal onClose={this.handleClose} size="normal">
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
              </Portal>
            ) : (
              <Modal onClose={this.handleClose} size="normal">
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
          </CloseByKey>
        )}
      </>
    );
  }
}
