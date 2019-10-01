// @flow strict

import * as React from "react";
import { useRelayEnvironment } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";

import Text from "../../../Text";
import Password from "../screens/Password";
import signIn from "../../mutations/signIn";
import resetPassword from "../../mutations/resetPassword";
import errors from "../../../../consts/errors";
import type { Screen } from "../../records/Screen";
import type { AuthUser } from "../../../../records/Auth";
import toUser from "../../services/toUser";
import { useLog } from "../../../../services/log/context";
import type { Context as LogContextType } from "../../../../services/log/context";
import * as loginEvents from "../../consts/events";
import { API_REQUEST_FAILED, API_ERROR } from "../../../../consts/events";
import handleAffiliateId from "../../../../services/utils/handleAffiliateId";
import type { Event, Props as EventProps } from "../../../../records/Event";

type OwnProps = {|
  email: string,
  magicLinkError: string,
  isSendingEmail: boolean,
  brandId: string,
  tailoredHeader: React.Node,
  onResetMagicLinkError: () => void,
  onClose: boolean => void,
  onChangeScreen: Screen => void,
  onAskSignInLink: () => void,
  onSignIn: (user: AuthUser) => void,
|};

type Props = {|
  ...OwnProps,
  environment: Environment,
  log: (event: Event, props: EventProps) => void,
|};

type State = {|
  error: string | null,
  password: string,
  passwordError: string,
  isSigningIn: boolean,
|};

class KiwiLoginWithoutContext extends React.Component<Props, State> {
  state = {
    error: null,
    password: "",
    passwordError: "",
    isSigningIn: false,
  };

  context: LogContextType;

  componentWillUnmount() {
    const { onResetMagicLinkError } = this.props;

    onResetMagicLinkError();
  }

  handleSignIn = (e: SyntheticEvent<HTMLFormElement>) => {
    const {
      email,
      brandId,
      onResetMagicLinkError,
      onSignIn,
      onClose,
      log,
      environment,
    } = this.props;
    const { password } = this.state;

    e.preventDefault();
    onResetMagicLinkError();
    if (this.validateInput()) {
      return;
    }

    this.setState({ isSigningIn: true, error: null, passwordError: "" });

    signIn(environment, { email, password, brand: brandId })
      .then(res => {
        this.setState({ isSigningIn: false });

        const user = res.signIn?.user;
        if (!user) {
          log(API_REQUEST_FAILED, { operation: "signIn" });
          this.setState({ error: errors.loginFailed });
          return;
        }

        const affiliateId = user.bookingIdentity?.affiliateId || "";
        handleAffiliateId(affiliateId);

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
    const { onAskSignInLink, log } = this.props;

    log(loginEvents.ASK_FOR_MAGIC_LINK, {});

    onAskSignInLink();
  };

  handleChangeEmail = () => {
    const { onChangeScreen, log } = this.props;

    log(loginEvents.CHANGE_EMAIL, {});

    onChangeScreen("intro");
  };

  handlePasswordChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  handleForgotPassword = () => {
    const { email, brandId, onChangeScreen, environment, log } = this.props;

    this.setState({ error: null, passwordError: "" });

    resetPassword(environment, email, brandId)
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

  validateInput = () => {
    const { password } = this.state;

    if (!password) {
      this.setState({
        error: errors.requiredField,
        passwordError: errors.requiredField,
      });
    }

    return !password;
  };

  render() {
    const { email, magicLinkError, isSendingEmail, tailoredHeader } = this.props;
    const { error, password, isSigningIn, passwordError } = this.state;

    const formError = error || magicLinkError;

    return (
      <Password
        email={email}
        error={formError ? <Text t={formError} /> : null}
        isSigningIn={isSigningIn}
        isSendingEmail={isSendingEmail}
        password={password}
        passwordError={passwordError}
        tailoredHeader={tailoredHeader}
        onChangeEmail={this.handleChangeEmail}
        onAskSignInLink={this.handleSignInLink}
        onForgotPassword={this.handleForgotPassword}
        onPasswordChange={this.handlePasswordChange}
        onSignIn={this.handleSignIn}
      />
    );
  }
}

const KiwiLogin = (props: OwnProps) => {
  const { log } = useLog();
  const environment = useRelayEnvironment();

  return <KiwiLoginWithoutContext {...props} log={log} environment={environment} />;
};

export default KiwiLogin;
