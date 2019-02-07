// @flow strict

import * as React from "react";

import Text from "../../Text";
import AccountPassword from "../../AccountPassword";
import SignIn from "../mutations/SignIn";
import ResetPassword from "../mutations/ResetPassword";
import errors from "../../../consts/errors";
import type { Screen } from "../types";
import type { SignInUser } from "../mutations/__generated__/SignInUser.graphql";

type Props = {
  email: string,
  magicLinkError: string,
  isSendingEmail: boolean,
  brandingId: string,
  resetMagicLinkError: () => void,
  onClose: () => void,
  onChangeScreen: Screen => void,
  onAskSignInLink: () => void,
  onSignIn: (graphQLUser: SignInUser) => void,
};

type State = {|
  error: ?string,
  password: string,
  isSigningIn: boolean,
|};

class KiwiLoginScreen extends React.Component<Props, State> {
  state = {
    error: null,
    password: "",
    isSigningIn: false,
  };

  componentWillUnmount() {
    const { resetMagicLinkError } = this.props;

    resetMagicLinkError();
  }

  handleSignIn = (e: SyntheticEvent<HTMLFormElement>) => {
    const { email, brandingId, resetMagicLinkError, onSignIn, onClose } = this.props;
    const { password } = this.state;
    e.preventDefault();
    resetMagicLinkError();

    this.setState({ isSigningIn: true }, async () => {
      const response = await (async () => {
        try {
          return await SignIn(email, password, brandingId);
        } catch (error) {
          // TODO log error
          this.setState({ error: errors.general, isSigningIn: false });
        }

        return null;
      })();

      this.setState({ isSigningIn: false });
      const user = response?.signIn?.user;

      if (user) {
        onSignIn(user);
      } else {
        // TODO log error
        this.setState({ error: errors.loginFailed, isSigningIn: false });
        return;
      }

      onClose();
    });
  };

  handleChangeEmail = () => {
    const { onChangeScreen } = this.props;

    onChangeScreen("intro");
  };

  handlePasswordChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  handleForgotPassword = () => {
    const { email, brandingId } = this.props;

    this.setState({ error: null }, () => this.resetPassword(email, brandingId));
  };

  resetPassword = async (email: string, brand: string) => {
    const { onChangeScreen } = this.props;
    const result = await (async () => {
      try {
        return await ResetPassword(email, brand);
      } catch (error) {
        // TODO log error
        this.setState({ error: errors.general });
      }

      return null;
    })();

    if (result && result.resetPassword && result.resetPassword.success) {
      onChangeScreen("resetPassword");
      return;
    }

    // TODO log no success
    this.setState({ error: errors.general });
  };

  render() {
    const { email, magicLinkError, onAskSignInLink, isSendingEmail } = this.props;
    const { error, password, isSigningIn } = this.state;
    const formError = error || magicLinkError;

    return (
      <AccountPassword
        email={email}
        error={formError ? <Text t={formError} /> : null}
        isSigningIn={isSigningIn}
        isSendingEmail={isSendingEmail}
        password={password}
        onChangeEmail={this.handleChangeEmail}
        onAskSignInLink={onAskSignInLink}
        onForgotPassword={this.handleForgotPassword}
        onPasswordChange={this.handlePasswordChange}
        onSignIn={this.handleSignIn}
      />
    );
  }
}

export default KiwiLoginScreen;
