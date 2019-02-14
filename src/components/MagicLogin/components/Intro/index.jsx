// @flow strict

import * as React from "react";

import AccountLogin from "../../../AccountLogin/index";
import CheckEmail from "../../mutations/CheckEmail";
import errors from "../../../../consts/errors";
import type { Screen } from "../../consts/types";
import Text from "../../../Text/index";

type Props = {|
  email: string,
  brandId: string,
  type: "mmb" | "help" | "refer",
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
  state = {
    isLoading: false,
    error: null,
  };

  handleCheckEmail = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { email, brandId, onChangeScreen, onSendMagicLink } = this.props;

    e.preventDefault();
    this.setState({ isLoading: true, error: "" });

    CheckEmail(email, brandId)
      .then(res => {
        this.setState({ isLoading: false });

        const result = res.checkEmail?.result;

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
      })
      .catch(() => {
        // TODO log error
        this.setState({ isLoading: false, error: errors.general });
      });
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
