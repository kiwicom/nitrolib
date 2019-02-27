// @flow strict

import * as React from "react";

import errors from "../../../../consts/errors";
import { Consumer } from "../../../../services/intl/context";
import * as validators from "../../../../services/input/validators";
import AccountCreate from "../../../AccountCreate/index";
import Text from "../../../Text/index";
import CreateAccount from "../../mutations/CreateAccount";
import type { CreateAccountError } from "../../mutations/__generated__/CreateAccountMutation.graphql";
import LogContext from "../../../../services/log/context";
import * as loginEvents from "../../consts/events";
import { API_ERROR, API_REQUEST_FAILED } from "../../../../consts/events";

type Props = {|
  email: string,
  brandId: string,
  onEmailChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onSignUpConfirmation: () => void,
|};

type State = {|
  error: ?string,
  password: string,
  passwordConfirm: string,
  isCreatingAccount: boolean,
  validatePassword: boolean,
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

export default class CreateAccountScreen extends React.PureComponent<Props, State> {
  static contextType = LogContext;

  state = {
    ...defaultErrors,
    error: null,
    password: "",
    passwordConfirm: "",
    isCreatingAccount: false,
    validatePassword: false, // eslint-disable-line react/no-unused-state
    validateEmail: false,
  };

  handleEmailBlur = () => {
    this.setState({ validateEmail: true });
  };

  handlePasswordChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value }, this.checkPasswordValidity);
  };

  handlePasswordBlur = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ validatePassword: true }, this.checkPasswordValidity);
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
    const { email, brandId, onSignUpConfirmation } = this.props;
    const { password } = this.state;
    const { log } = this.context;

    e.preventDefault();

    this.setState({ isCreatingAccount: true, error: null, ...defaultErrors });

    CreateAccount(brandId, { email, password })
      .then(res => {
        this.setState({ isCreatingAccount: false });

        if (!res.createAccount?.success) {
          log(API_REQUEST_FAILED, { operation: "createAccount", error: res.createAccount?.error });
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

  checkPasswordValidity = () => {
    this.setState(({ validatePassword, password }) => ({
      passwordError: validatePassword ? validators.password(password) : null,
    }));
  };

  setSubmitError = (responseError: ?CreateAccountError) => {
    const error = responseError ? submitErrors[responseError] : errors.general;

    this.setState({ error });
  };

  render() {
    return (
      <Consumer>
        {intl => {
          const { email, onEmailChange } = this.props;
          const {
            password,
            passwordConfirm,
            isCreatingAccount,
            error,
            validateEmail,
            passwordError,
            passwordConfirmError,
          } = this.state;
          const emailError = validateEmail ? intl.translate(validators.email(email)) : "";
          const passError = passwordError ? intl.translate(passwordError) : "";
          const passConfirmError = passwordConfirmError ? intl.translate(passwordConfirmError) : "";

          return (
            <AccountCreate
              email={email}
              password={password}
              error={error ? <Text t={error} values={{ text: email }} /> : null}
              passwordConfirm={passwordConfirm}
              emailHint=""
              emailError={emailError}
              passwordError={passError}
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
        }}
      </Consumer>
    );
  }
}
