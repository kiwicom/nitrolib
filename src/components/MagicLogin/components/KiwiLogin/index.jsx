// @flow strict

import * as React from "react";

import Text from "../../../Text";
import AccountPassword from "../../../AccountPassword";
import SignIn from "../../mutations/SignIn";
import ResetPassword from "../../mutations/ResetPassword";
import errors from "../../../../consts/errors";
import type { Screen } from "../../records/Screen";
import type { AuthUser } from "../../../../records/Auth";
import toUser from "../../services/toUser";
import LogContext from "../../../../services/log/context";
import * as loginEvents from "../../consts/events";
import { API_REQUEST_FAILED, API_ERROR } from "../../../../consts/events";

type Props = {
  email: string,
  magicLinkError: string,
  isSendingEmail: boolean,
  brandId: string,
  onResetMagicLinkError: () => void,
  onClose: boolean => void,
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
  static contextType = LogContext;

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
    const { log } = this.context;

    e.preventDefault();
    onResetMagicLinkError();

    this.setState({ isSigningIn: true });

    SignIn(email, password, brandId)
      .then(res => {
        this.setState({ isSigningIn: false });

        const user = res.signIn?.user;
        if (!user) {
          log(API_REQUEST_FAILED, { operation: "signIn" });
          this.setState({ error: errors.loginFailed });
          return;
        }

        onSignIn(toUser(user));
        onClose(true);
        log(loginEvents.LOGGED_WITH_ACCOUNT, {});
      })
      .catch(err => {
        log(API_ERROR, { error: String(err), operation: "signIn" });
        this.setState({ error: errors.general, isSigningIn: false });
      });
  };

  handleSignInLink = () => {
    const { onAskSignInLink } = this.props;
    const { log } = this.context;

    log(loginEvents.ASK_FOR_MAGIC_LINK, {});

    onAskSignInLink();
  };

  handleChangeEmail = () => {
    const { onChangeScreen } = this.props;
    const { log } = this.context;

    log(loginEvents.CHANGE_EMAIL, {});

    onChangeScreen("intro");
  };

  handlePasswordChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  handleForgotPassword = () => {
    const { email, brandId, onChangeScreen } = this.props;
    const { log } = this.context;

    this.setState({ error: null });

    ResetPassword(email, brandId)
      .then(res => {
        if (!res.resetPassword?.success) {
          log(API_REQUEST_FAILED, { operation: "resetPassword" });
          this.setState({ error: errors.general });
          return;
        }

        onChangeScreen("resetPassword");
      })
      .catch(err => {
        log(API_ERROR, { error: String(err), operation: "resetPassword" });
        this.setState({ error: errors.general });
      });
  };

  render() {
    const { email, magicLinkError, isSendingEmail } = this.props;
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
        onAskSignInLink={this.handleSignInLink}
        onForgotPassword={this.handleForgotPassword}
        onPasswordChange={this.handlePasswordChange}
        onSignIn={this.handleSignIn}
      />
    );
  }
}
