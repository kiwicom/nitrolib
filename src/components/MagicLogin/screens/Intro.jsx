// @flow

import * as React from "react";

import AccountLogin from "../../AccountLogin";
import CheckEmail from "../mutations/CheckEmail";
import { errors } from "../const";
import type { LoginType, Screen } from "../types";

type Props = {
  email: string,
  brandingId: string,
  type: LoginType,
  magicLinkError: string,
  onGoogleLogin: () => void,
  onFacebookLogin: () => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onChangeScreen: (screen: Screen) => void,
  onSendMagicLink: () => void,
};

type State = {
  isLoading: boolean,
  error: string,
};

class IntroScreen extends React.Component<Props, State> {
  state = {
    isLoading: false,
    error: "",
  };

  handleCheckEmail = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({ isLoading: true, error: "" }, this.checkEmail);
  };

  checkEmail = async () => {
    let response = null;
    const { email, brandingId, onChangeScreen, onSendMagicLink } = this.props;

    try {
      response = await CheckEmail(email, brandingId);
    } catch (error) {
      // TODO log error
      this.setState({ isLoading: false, error: errors.general });
      return;
    }

    this.setState({ isLoading: false });

    const result = response && response.checkEmail && response.checkEmail.result;

    if (!result) {
      this.setState({ error: errors.general });
      return;
    }

    if (result.hasFacebook) {
      onChangeScreen("facebookLogin");
      return;
    }

    if (result.hasGoogle) {
      onChangeScreen("googleLogin");
      return;
    }

    if (result.hasKiwiAccount) {
      onChangeScreen("kiwiLogin");
      return;
    }

    if (result.hasBooking) {
      onSendMagicLink();
      return;
    }

    onChangeScreen("noAccount");
  };

  render() {
    const {
      email,
      type,
      magicLinkError,
      onGoogleLogin,
      onFacebookLogin,
      onEmailChange,
    } = this.props;
    const { isLoading, error } = this.state;

    return (
      <AccountLogin
        email={email}
        error={error || magicLinkError}
        isLoading={isLoading}
        type={type}
        onEmailChange={onEmailChange}
        onGoogleLogin={onGoogleLogin}
        onFacebookLogin={onFacebookLogin}
        onContinue={this.handleCheckEmail}
      />
    );
  }
}

export default IntroScreen;
