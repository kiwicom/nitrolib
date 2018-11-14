// @flow strict
import * as React from "react";
import styled from "styled-components";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Portal from "@kiwicom/orbit-components/lib/Portal";

import CloseByKey from "../../../CloseByKey";
import Desktop from "../../../Desktop";
import Mobile from "../../../Mobile";
import Translate from "../../../Translate";
import * as authContext from "../../../../services/auth/context";
import { Consumer as BrandConsumer } from "../../../../services/brand/context";
import Button from "../../primitives/Button";
import Trips from "../Trips";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import SideNav from "./components/SideNav";
import * as MODALS from "../../../../consts/modals";
import type { AuthModal, Modal as ModalType } from "../../../../consts/modals";
import marginMixin from "../../styles/marginMixin";

const Wrapper = styled.div`
  ${marginMixin};
`;

type Props = {|
  chat: React.Node,
  subscription: React.Node,
  debug?: React.Node,
  portal: string,
  inverted: boolean,
  onSetModal: (modal: ModalType) => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
|};

type State = {|
  modalOpen: "" | AuthModal,
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
    this.setState({ modalOpen: "" });
  };

  handleOpenMyBooking = () => {
    this.setState({ modalOpen: MODALS.MY_BOOKING });
  };

  handleOpenRegister = () => {
    this.setState({ modalOpen: MODALS.REGISTER });
  };

  handleOpenSignIn = () => {
    this.setState({ modalOpen: MODALS.SIGN_IN });
  };

  handleOpenForgotPassword = () => {
    this.setState({ modalOpen: MODALS.FORGOT_PASSWORD });
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
        <Wrapper>
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
                      <Translate t={__("account.my_bookings_action")} />
                    </Button>
                  </Desktop>
                  <Mobile display="flex">
                    <Button
                      direction="x"
                      color={!inverted && "secondary"}
                      onClick={this.handleOpenMyBooking}
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
        </Wrapper>

        <Wrapper>
          <SideNav
            chat={chat}
            subscription={subscription}
            debug={debug}
            inverted={inverted}
            portal={portal}
            onOpenRegister={this.handleOpenRegister}
            onOpenSignIn={this.handleOpenSignIn}
            onSaveLanguage={onSaveLanguage}
            onSetModal={onSetModal}
          />
        </Wrapper>

        {modalOpen === MODALS.FORGOT_PASSWORD && (
          <CloseByKey onClose={this.handleClose}>
            <Portal element={portal}>
              <Modal onClose={this.handleClose} size="normal">
                <ModalSection>
                  <BrandConsumer>
                    {brand => <ForgotPassword brandId={brand.id} onClose={this.handleClose} />}
                  </BrandConsumer>
                </ModalSection>
              </Modal>
            </Portal>
          </CloseByKey>
        )}

        {(modalOpen === MODALS.MY_BOOKING ||
          modalOpen === MODALS.SIGN_IN ||
          modalOpen === MODALS.REGISTER) && (
          <CloseByKey onClose={this.handleClose}>
            <Portal element={portal}>
              <Modal onClose={this.handleClose} size="normal">
                <ModalSection>
                  <Login
                    // $FlowExpected: 'modalOpen' can only be one of these things
                    open={modalOpen}
                    onCloseSuccess={this.handleClose}
                    onOpenMyBooking={this.handleOpenMyBooking}
                    onOpenRegister={this.handleOpenRegister}
                    onOpenSignIn={this.handleOpenSignIn}
                    onOpenForgotPassword={this.handleOpenForgotPassword}
                  />
                </ModalSection>
              </Modal>
            </Portal>
          </CloseByKey>
        )}
      </>
    );
  }
}
