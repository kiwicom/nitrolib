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
import * as MODALS from "../../../../consts/modals";

type AuthModal =
  | typeof MODALS.MY_BOOKING
  | typeof MODALS.REGISTER
  | typeof MODALS.SIGN_IN
  | typeof MODALS.FORGOT_PASSWORD;

type Props = {|
  chat: React.Node,
  portal?: string,
  subscription: React.Node,
  debug?: React.Node,
  inverted?: boolean,
  onResetError: () => void,
  onSetModal: (modal: MODALS.ModalType) => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
  onLog: (event: Event<"OPEN_MODAL", { modal: AuthModal }>) => void,
|};

type State = {|
  modalOpen: typeof MODALS.NONE | AuthModal,
|};

export default class Menu extends React.Component<Props, State> {
  state = {
    modalOpen: MODALS.NONE,
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { onSetModal } = this.props;
    const { modalOpen } = this.state;

    if (modalOpen !== prevState.modalOpen) {
      onSetModal(modalOpen);
    }
  }

  handleClose = () => {
    const { onResetError } = this.props;

    onResetError();
    this.setState({ modalOpen: MODALS.NONE });
  };

  handleOpenMyBooking = () => {
    const { onLog, onResetError } = this.props;
    onResetError();

    this.setState({ modalOpen: MODALS.MY_BOOKING });
    onLog({ event: OPEN_MODAL, data: { modal: MODALS.MY_BOOKING } });
  };

  handleOpenRegister = () => {
    const { onLog, onResetError } = this.props;
    onResetError();


    this.setState({ modalOpen: MODALS.REGISTER });
    onLog({ event: OPEN_MODAL, data: { modal: MODALS.REGISTER } });
  };

  handleOpenSignIn = () => {
    const { onLog, onResetError } = this.props;
    onResetError();

    this.setState({ modalOpen: MODALS.SIGN_IN });
    onLog({ event: OPEN_MODAL, data: { modal: MODALS.SIGN_IN } });
  };

  handleOpenForgotPassword = () => {
    const { onLog } = this.props;

    this.setState({ modalOpen: MODALS.FORGOT_PASSWORD });
    onLog({ event: OPEN_MODAL, data: { modal: MODALS.FORGOT_PASSWORD } });
  };

  render() {
    const {
      chat,
      subscription,
      debug,
      portal,
      inverted,
      onSaveLanguage,
      onSelectTrip,
      onSetModal,
    } = this.props;
    const { modalOpen } = this.state;

    return (
      <>
        <authContext.Consumer>
          {({ auth, environment }) =>
            auth === null ? (
              <>
                <Desktop display="flex">
                  <Button
                    direction="x"
                    onClick={this.handleOpenMyBooking}
                    color={!inverted && "secondary"}
                  >
                    <Text t={__("account.my_bookings_action")} />
                  </Button>
                </Desktop>
                <Mobile display="flex">
                  <Button
                    direction="x"
                    color={!inverted && "secondary"}
                    onClick={this.handleOpenMyBooking}
                    padding="13px 9px"
                  >
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
          inverted={inverted}
          onOpenRegister={this.handleOpenRegister}
          onOpenSignIn={this.handleOpenSignIn}
          onSaveLanguage={onSaveLanguage}
          onSetModal={onSetModal}
        />

        {modalOpen !== MODALS.NONE && (
          <CloseByKey onClose={this.handleClose}>
            {portal ? (
              <Portal element={portal}>
                <Modal onClose={this.handleClose} size="normal">
                  <ModalSection>
                    {modalOpen === MODALS.FORGOT_PASSWORD ? (
                      <BrandConsumer>
                        {brand => <ForgotPassword brandId={brand.id} onClose={this.handleClose} />}
                      </BrandConsumer>
                    ) : (
                      <Login
                        // $FlowIssue
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
                  {modalOpen === MODALS.FORGOT_PASSWORD ? (
                    <BrandConsumer>
                      {brand => <ForgotPassword brandId={brand.id} onClose={this.handleClose} />}
                    </BrandConsumer>
                  ) : (
                    <Login
                      // $FlowIssue
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
