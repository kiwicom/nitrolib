// @flow strict

import * as React from "react";
import { useRelayEnvironment } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";

import errors from "../../../../consts/errors";
import addScript from "../../../../services/utils/addScript";
import * as validators from "../../../../services/input/validators";
import Text from "../../../Text";
import createAccount from "../../mutations/createAccount";
import type { CreateAccountError } from "../../mutations/__generated__/createAccountMutation.graphql";
import LogContext from "../../../../services/log/context";
import IntlContext from "../../../../services/intl/context";
import * as loginEvents from "../../consts/events";
import { API_ERROR, API_REQUEST_FAILED } from "../../../../consts/events";
import type { Context as IntlContextType } from "../../../../services/intl/context";
import type { Event, Props as EventProps } from "../../../../records/Event";
import type { PasswordStrengthEnum } from "../../../../records/Auth";
import CreateAccount from "../screens/CreateAccount";
import { PASSWORD_SCORE_TO_STRENGTH } from "../../consts/password";

const ZXCVBN_URL = "https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js";

type OwnProps = {|
  email: string,
  brandId: string,
  onEmailChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onSignUpConfirmation: () => void,
|};

type Props = {|
  ...OwnProps,
  environment: Environment,
  log: (event: Event, props: EventProps) => void,
  intl: IntlContextType,
|};

type State = {|
  error: ?string,
  password: string,
  passwordConfirm: string,
  isCreatingAccount: boolean,
  passwordStrength: PasswordStrengthEnum,
  validateEmail: boolean,
  passwordError: ?string,
  passwordConfirmError: ?string,
|};

// TODO no errors in state, just in render
const defaultErrors = {
  passwordError: null,
  passwordConfirmError: null,
};

const submitErrors = {
  ACCOUNT_EXISTS: errors.accountExists,
  WEAK_PASSWORD: errors.weakPassword,
  INVALID_EMAIL: errors.invalidEmail,
  "%future added value": errors.general,
};

class CreateAccountWithoutContext extends React.PureComponent<Props, State> {
  state = {
    ...defaultErrors,
    error: null,
    password: "",
    passwordConfirm: "",
    passwordStrength: "WEAK",
    isCreatingAccount: false,
    validateEmail: false,
  };

  componentDidMount() {
    if (!window.zxcvbn) {
      addScript(ZXCVBN_URL);
    }
  }

  handleEmailBlur = () => {
    this.setState({ validateEmail: true });
  };

  handlePasswordChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value }, this.getPasswordStrength);
  };

  handlePasswordBlur = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState(this.getPasswordStrength);
  };

  handlePasswordConfirmChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ passwordConfirm: e.target.value });
    this.setState(({ password, passwordConfirm, passwordConfirmError }) => {
      if (passwordConfirmError === null) {
        return null;
      }

      if (password !== passwordConfirm) {
        return { passwordConfirmError: errors.passwordMismatch };
      }

      return { passwordConfirmError: "" };
    });
  };

  handlePasswordConfirmBlur = () => {
    this.setState(({ password, passwordConfirm }) => {
      if (password !== passwordConfirm) {
        return { passwordConfirmError: errors.passwordMismatch };
      }

      return { passwordConfirmError: "" };
    });
  };

  handleContinue = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.validateInput()) {
      return;
    }

    const { email, brandId, onSignUpConfirmation, log, environment } = this.props;
    const { password } = this.state;

    this.setState({ isCreatingAccount: true, error: null, ...defaultErrors });

    createAccount(environment, brandId, { email, password })
      .then(res => {
        this.setState({ isCreatingAccount: false });

        if (!res.createAccount?.success) {
          log(API_REQUEST_FAILED, {
            operation: "createAccount",
            error: res.createAccount?.error || "",
          });
          this.setSubmitError(res.createAccount?.error);
          return;
        }

        log(loginEvents.REGISTRATION_SENT, {});
        onSignUpConfirmation();
      })
      .catch(err => {
        this.setState({ isCreatingAccount: false });

        log(API_ERROR, { error: String(err), operation: "createAccount" });
        this.setSubmitError(null);
      });
  };

  getPasswordConfirmError = () => {
    const { password, passwordConfirm } = this.state;

    if (!passwordConfirm) {
      return errors.requiredField;
    }

    return password === passwordConfirm ? "" : errors.passwordMismatch;
  };

  validateInput = () => {
    const { email } = this.props;
    const { password } = this.state;
    const emailError = email ? validators.email(email) : errors.requiredField;
    const passwordError = password ? validators.password(password) : errors.requiredField;
    const passwordConfirmError = this.getPasswordConfirmError();

    this.setState({
      validateEmail: true,
      passwordConfirmError,
      error: emailError || passwordError || passwordConfirmError,
    });

    return emailError || passwordError || passwordConfirmError;
  };

  getPasswordStrength = () => {
    const { password } = this.state;
    const { email } = this.props;
    const userInput = ["skypicker", "kiwi", email];

    // Score from 0 to 4 according to zxcvbn
    const score = validators.passwordScore(password, userInput);
    const passwordStrength = PASSWORD_SCORE_TO_STRENGTH[String(score)];
    this.setState({
      passwordStrength: passwordStrength || "WEAK",
    });
  };

  setSubmitError = (responseError: ?CreateAccountError) => {
    const error = responseError ? submitErrors[responseError] : errors.general;

    this.setState({ error });
  };

  render() {
    const { email, onEmailChange, intl } = this.props;
    const {
      password,
      passwordConfirm,
      isCreatingAccount,
      error,
      passwordStrength,
      validateEmail,
      passwordConfirmError,
    } = this.state;
    const emailError = validateEmail ? intl.translate(validators.email(email)) : "";
    const passConfirmError = passwordConfirmError ? intl.translate(passwordConfirmError) : "";
    return (
      <CreateAccount
        email={email}
        password={password}
        error={error ? <Text t={error} values={{ text: email }} /> : null}
        passwordConfirm={passwordConfirm}
        emailError={emailError}
        passwordStrength={passwordStrength}
        passwordConfirmError={passConfirmError}
        isLoading={isCreatingAccount}
        onEmailChange={onEmailChange}
        onEmailBlur={this.handleEmailBlur}
        onPasswordChange={this.handlePasswordChange}
        onPasswordBlur={this.handlePasswordBlur}
        onPasswordConfirmChange={this.handlePasswordConfirmChange}
        onPasswordConfirmBlur={this.handlePasswordConfirmBlur}
        onContinue={this.handleContinue}
      />
    );
  }
}

const CreateAccountScreen = (props: OwnProps) => {
  const { log } = React.useContext(LogContext);
  const intl = React.useContext(IntlContext);
  const environment = useRelayEnvironment();

  return <CreateAccountWithoutContext {...props} intl={intl} environment={environment} log={log} />;
};

export default CreateAccountScreen;
