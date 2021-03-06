// @flow strict

import * as React from "react";
import { useRelayEnvironment } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";

import IntroScreen from "../screens/Intro";
import checkEmail from "../../mutations/checkEmail";
import errors from "../../../../consts/errors";
import type { Screen } from "../../records/Screen";
import Text from "../../../Text";
import * as events from "../../../../consts/events";
import { useLog } from "../../../../services/log/context";
import * as validators from "../../../../services/input/validators";
import { GET_SIMPLE_TOKEN } from "../../consts/events";
import type { Event, Props as EventProps } from "../../../../records/Event";

type OwnProps = {|
  email: string,
  brandId: string,
  tailoredHeader: React.Node,
  disableSocialLogin?: boolean,
  magicLinkError: string,
  onGoogleLogin: () => void,
  onFacebookLogin: () => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onChangeScreen: (screen: Screen) => void,
  onSendMagicLink: () => void,
|};

type Props = {|
  ...OwnProps,
  environment: Environment,
  log: (event: Event, props: EventProps) => void,
|};

type State = {|
  isLoading: boolean,
  error: ?string,
  validateEmail: boolean,
|};

class IntroWithoutContext extends React.Component<Props, State> {
  state = {
    error: null,
    isLoading: false,
    validateEmail: false,
  };

  handleEmailBlur = () => {
    this.setState({ validateEmail: true });
  };

  handleIncorrectEmail = () => {
    const { onChangeScreen, log } = this.props;

    log(GET_SIMPLE_TOKEN, {});

    onChangeScreen("getSingleBooking");
  };

  handleCheckEmail = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { email, brandId, onChangeScreen, onSendMagicLink, environment, log } = this.props;

    e.preventDefault();

    if (this.validateInput()) {
      return;
    }

    this.setState({ isLoading: true, error: "" });

    log(events.API_REQUEST, { operation: "checkEmail" });

    checkEmail(environment, email, brandId)
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
      disableSocialLogin,
      magicLinkError,
      tailoredHeader,
      onGoogleLogin,
      onFacebookLogin,
      onEmailChange,
    } = this.props;
    const { isLoading, error } = this.state;

    const submitError = error || magicLinkError;

    return (
      <IntroScreen
        email={email}
        error={submitError ? <Text t={submitError} /> : null}
        emailError={this.getEmailError()}
        isLoading={isLoading}
        disableSocialLogin={disableSocialLogin}
        tailoredHeader={tailoredHeader}
        onEmailChange={onEmailChange}
        onEmailBlur={this.handleEmailBlur}
        onGoogleLogin={onGoogleLogin}
        onFacebookLogin={onFacebookLogin}
        onContinue={this.handleCheckEmail}
        onIncorrectEmail={this.handleIncorrectEmail}
      />
    );
  }
}

const Intro = (props: OwnProps) => {
  const { log } = useLog();
  const environment = useRelayEnvironment();

  return <IntroWithoutContext {...props} log={log} environment={environment} />;
};

export default Intro;
