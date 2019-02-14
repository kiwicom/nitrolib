// @flow strict

import * as React from "react";

import Text from "../../../Text/index";
import AccountPassword from "../../../AccountPassword/index";
import SignIn from "../../mutations/SignIn";
import ResetPassword from "../../mutations/ResetPassword";
import errors from "../../../../consts/errors";
import type { Screen } from "../../consts/types";
import type { AuthUser } from "../../../../records/Auth";
import toUser from "../../services/toUser";

type Props = {
  email: string,
  magicLinkError: string,
  isSendingEmail: boolean,
  brandId: string,
  onResetMagicLinkError: () => void,
  onClose: () => void,
  onChangeScreen: Screen => void,
  onAskSignInLink: () => void,
  onSignIn: (user: AuthUser) => void,
};

type State = {|
  error: string | null,
  password: string,
  isSigningIn: boolean,
|};

export default class KiwiLoginScreen extends React.Component<Props, State> {
  state = {
    error: null,
    password: "",
    isSigningIn: false,
  };

  componentWillUnmount() {
    const { onResetMagicLinkError } = this.props;

    onResetMagicLinkError();
  }

  handleSignIn = (e: SyntheticEvent<HTMLFormElement>) => {
    const { email, brandId, onResetMagicLinkError, onSignIn, onClose } = this.props;
    const { password } = this.state;

    e.preventDefault();
    onResetMagicLinkError();

    this.setState({ isSigningIn: true });

    SignIn(email, password, brandId)
      .then(res => {
        this.setState({ isSigningIn: false });

        const user = res.signIn?.user;
        if (!user) {
          // TODO log error
          this.setState({ error: errors.loginFailed });
          return;
        }

        onSignIn(toUser(user));
        onClose();
      })
      .catch(() => {
        // TODO log error
        this.setState({ error: errors.general, isSigningIn: false });
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
    const { email, brandId, onChangeScreen } = this.props;

    this.setState({ error: null });

    ResetPassword(email, brandId)
      .then(res => {
        if (!res.resetPassword?.success) {
          // TODO log no success
          this.setState({ error: errors.general });
          return;
        }

        onChangeScreen("resetPassword");
      })
      .catch(() => {
        // TODO log error
        this.setState({ error: errors.general });
      });
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
