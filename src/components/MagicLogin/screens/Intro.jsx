// @flow strict

import * as React from "react";

import AccountLogin from "../../AccountLogin";
import CheckEmail from "../mutations/CheckEmail";
import errors from "../../../consts/errors";
import type { LoginType, Screen } from "../types";
import Text from "../../Text";

type Props = {|
  email: string,
  brandingId: string,
  type: LoginType,
  magicLinkError: string,
  onGoogleLogin: () => void,
  onFacebookLogin: () => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onChangeScreen: (screen: Screen) => void,
  onSendMagicLink: () => void,
|};

type State = {|
  isLoading: boolean,
  error: ?string,
|};

class IntroScreen extends React.Component<Props, State> {
  state = {
    isLoading: false,
    error: null,
  };

  handleCheckEmail = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({ isLoading: true, error: "" }, this.checkEmail);
  };

  checkEmail = async () => {
    const { email, brandingId, onChangeScreen, onSendMagicLink } = this.props;
    const response = await (async () => {
      try {
        return await CheckEmail(email, brandingId);
      } catch (error) {
        // TODO log error
        this.setState({ isLoading: false, error: errors.general });
      }

      return null;
    })();

    this.setState({ isLoading: false });

    const result = response?.checkEmail?.result;

    if (!result) {
      // TODO log error
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
    const submitError = error || magicLinkError;

    return (
      <AccountLogin
        email={email}
        error={submitError ? <Text t={submitError} /> : null}
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
