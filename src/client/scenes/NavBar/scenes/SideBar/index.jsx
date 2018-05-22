// @flow strict
import * as React from "react";

import Modal from "client/components/Modal";
import { Consumer as BrandConsumer } from "client/services/brand/context";
import Login from "./components/Login";

type Props = {||};

type LoginModal = "myBooking" | "register" | "signIn";

type State = {|
  modalOpen: "" | LoginModal,
|};

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
    const { modalOpen } = this.state;

    return (
      <>
        <div>SideBar</div>
        <button onClick={this.handleOpenMyBooking}>My booking</button>
        <BrandConsumer>
          {brand =>
            brand.auth.credentials && (
              <>
                <button onClick={this.handleOpenRegister}>Register</button>
                <button onClick={this.handleOpenSignIn}>Sign In</button>
              </>
            )
          }
        </BrandConsumer>

        {modalOpen !== "" && (
          <Modal onClose={this.handleClose}>
            <Login
              open={modalOpen}
              onOpenMyBooking={this.handleOpenMyBooking}
              onOpenRegister={this.handleOpenRegister}
              onOpenSignIn={this.handleOpenSignIn}
            />
          </Modal>
        )}
      </>
    );
  }
}
