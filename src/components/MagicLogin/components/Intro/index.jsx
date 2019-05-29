// @flow strict

import * as React from "react";

import AccountLogin from "../screens/Intro";
import checkEmail from "../../mutations/checkEmail";
import errors from "../../../../consts/errors";
import type { Screen } from "../../records/Screen";
import Text from "../../../Text";
import * as events from "../../../../consts/events";
import LogContext from "../../../../services/log/context";
import type { Context as LogContextType } from "../../../../services/log/context";
import * as validators from "../../../../services/input/validators";

type Props = {|
  email: string,
  brandId: string,
  type: "mmb" | "help" | "refer",
  disableSocialLogin?: boolean,
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
  validateEmail: boolean,
|};

export default class IntroScreen extends React.Component<Props, State> {
  static contextType = LogContext;

  state = {
    error: null,
    isLoading: false,
    validateEmail: false,
  };

  context: LogContextType;

  handleEmailBlur = () => {
    this.setState({ validateEmail: true });
  };

  handleCheckEmail = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { email, brandId, onChangeScreen, onSendMagicLink } = this.props;
    const { log } = this.context;

    e.preventDefault();

    if (this.validateInput()) {
      return;
    }

    this.setState({ isLoading: true, error: "" });

    log(events.API_REQUEST, { operation: "checkEmail" });

    checkEmail(email, brandId)
      .then(res => {
        this.setState({ isLoading: false });

        const result = res.checkEmail?.result;

        if (!result) {
          log(events.API_REQUEST_FAILED, { operation: "checkEmail" });
          this.setState({ error: errors.general });
          return;
        }

        log(events.API_SUCCESS, { operation: "checkEmail" });

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
      })
      .catch(err => {
        log(events.API_ERROR, { error: String(err), operation: "checkEmail" });
        this.setState({ isLoading: false, error: errors.general });
      });
  };

  validateInput = () => {
    const { email } = this.props;
    const error = email ? validators.email(email) : errors.requiredField;

    this.setState({ error, validateEmail: true });

    return Boolean(error);
  };

  getEmailError = () => {
    const { email } = this.props;
    const { validateEmail } = this.state;

    if (!validateEmail) {
      return "";
    }

    return email ? validators.email(email) : errors.requiredField;
  };

  render() {
    const {
      email,
      type,
      disableSocialLogin,
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
        emailError={this.getEmailError()}
        isLoading={isLoading}
        type={type}
        disableSocialLogin={disableSocialLogin}
        onEmailChange={onEmailChange}
        onEmailBlur={this.handleEmailBlur}
        onGoogleLogin={onGoogleLogin}
        onFacebookLogin={onFacebookLogin}
        onContinue={this.handleCheckEmail}
      />
    );
  }
}
