// @flow

import * as React from "react";

import { errors } from "../const";
import { Consumer } from "../../../services/intl/context";
import * as validators from "../../../services/input/validators";
import AccountCreate from "../../AccountCreate";
import Text from "../../Text";
import CreateAccount from "../mutations/CreateAccount";
import type { CreateAccountError } from "../mutations/__generated__/CreateAccountMutation.graphql";

type Props = {|
  email: string,
  brandingId: string,
  onEmailChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onSignUpConfirmation: () => void,
|};

type State = {|
  error: ?React.Element<typeof Text>,
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

class CreateAccountScreen extends React.Component<Props, State> {
  state = {
    ...defaultErrors,
    error: null,
    password: "",
    passwordConfirm: "",
    isCreatingAccount: false,
    validatePassword: false,
    validateEmail: false,
  };

  handleEmailBlur = () => {
    this.setState({ validateEmail: true });
  };

  handlePasswordChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value }, this.checkPasswordValidity);
  };

  handlePasswordBlur = () => {
    this.setState({ validatePassword: true }, this.checkPasswordValidity);
  };

  handlePasswordConfirmChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ passwordConfirm: e.target.value }, () => {
      this.checkPasswordIntegrity(true);
    });
  };

  handlePasswordConfirmBlur = () => {
    this.checkPasswordIntegrity();
  };

  handleContinue = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ isCreatingAccount: true, error: null, ...defaultErrors }, async () => {
      const { email, brandingId, onSignUpConfirmation } = this.props;
      const { password } = this.state;
      const credentials = {
        email,
        password,
      };

      try {
        const response = await CreateAccount(brandingId, credentials);

        if (response.createAccount && response.createAccount.success) {
          onSignUpConfirmation();
          return;
        }

        this.setSubmitError(response.createAccount && response.createAccount.error);
      } catch (error) {
        // TODO log error
        this.setSubmitError(null);
      }

      this.setState({ isCreatingAccount: false });
    });
  };

  checkPasswordValidity = () => {
    this.setState(({ validatePassword, password }) => {
      let passwordError = null;

      if (validatePassword) {
        passwordError = validators.password(password);
      }

      return { password, passwordError };
    });
  };

  checkPasswordIntegrity = (onlyWhenError: boolean = false) => {
    this.setState(({ password, passwordConfirm, passwordConfirmError }) => {
      // do not perform check if any error hasn't been set yet
      if (onlyWhenError && passwordConfirmError === null) {
        return null;
      }

      if (password !== passwordConfirm) {
        return { passwordConfirmError: errors.passwordMismatch };
      }

      return { passwordConfirmError: "" };
    });
  };

  setSubmitError = (responseError: ?CreateAccountError) => {
    const { email } = this.props;
    let error;
    let values;

    switch (responseError) {
      case "ACCOUNT_EXISTS":
        values = { text: email };
        error = errors.accountExists;
        break;
      case "WEAK_PASSWORD":
        error = errors.weakPassword;
        break;
      case "INVALID_EMAIL":
        error = errors.invalidEmail;
        break;
      default:
        error = errors.general;
        break;
    }

    this.setState({ error: <Text t={error} values={values} /> });
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
              error={error}
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

export default CreateAccountScreen;
