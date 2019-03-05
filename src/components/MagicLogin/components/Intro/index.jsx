// @flow strict

import * as React from "react";

import AccountLogin from "../../../AccountLogin";
import CheckEmail from "../../mutations/CheckEmail";
import errors from "../../../../consts/errors";
import type { Screen } from "../../records/Screen";
import Text from "../../../Text";
import * as events from "../../../../consts/events";
import LogContext from "../../../../services/log/context";

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
|};

export default class IntroScreen extends React.Component<Props, State> {
  static contextType = LogContext;

  state = {
    isLoading: false,
    error: null,
  };

  handleCheckEmail = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { email, brandId, onChangeScreen, onSendMagicLink } = this.props;
    const { log } = this.context;

    e.preventDefault();
    this.setState({ isLoading: true, error: "" });

    log(events.API_REQUEST, { operation: "checkEmail" });

    CheckEmail(email, brandId)
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
        isLoading={isLoading}
        type={type}
        disableSocialLogin={disableSocialLogin}
        onEmailChange={onEmailChange}
        onGoogleLogin={onGoogleLogin}
        onFacebookLogin={onFacebookLogin}
        onContinue={this.handleCheckEmail}
      />
    );
  }
}
