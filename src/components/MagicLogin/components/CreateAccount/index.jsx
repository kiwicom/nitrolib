// @flow strict
import * as React from "react";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Header from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import Section from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import styled from "styled-components";

import { themeDefault, type ThemeProps } from "../../../../records/Theme";
import PasswordValidationBox from "../PasswordValidationBox";
import { Consumer } from "../../../../services/intl/context";
import Translate from "../../../Translate";
import Text from "../../../Text";
import type { PasswordStrengthEnum } from "../PasswordValidationBox";

type Props = {|
  email: string,
  password: string,
  error?: React.Node,
  passwordConfirm: string,
  emailHint?: string,
  emailError?: string,
  passwordConfirmError?: string,
  passwordStrength: PasswordStrengthEnum,
  isLoading?: boolean,
  onEmailBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onPasswordChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onPasswordBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onPasswordConfirmChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onPasswordConfirmBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onContinue: (ev: SyntheticEvent<HTMLFormElement>) => void,
|};

// Adjusts the spacing for the password and validator inside the stack
const PasswordFieldWrapper = styled.div`
  div {
    margin-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  }
`;

PasswordFieldWrapper.defaultProps = {
  theme: themeDefault,
};

const CreateAccount = ({
  email,
  onEmailBlur,
  onEmailChange,
  onContinue,
  password,
  error,
  emailHint,
  emailError,
  passwordStrength,
  passwordConfirmError,
  isLoading,
  passwordConfirm,
  onPasswordChange,
  onPasswordBlur,
  onPasswordConfirmChange,
  onPasswordConfirmBlur,
}: Props) => (
  <Consumer>
    {intl => (
      <>
        <Header>
          <Illustration name="EnjoyApp" size="small" />
          <Heading element="h2">
            <Translate t="account.create_account" />
          </Heading>
          <Text t="account.create_account_description" />
        </Header>
        <Section dataTest="MagicLogin-CreateAccount">
          <form onSubmit={onContinue}>
            <Stack spacing="comfy">
              {error && (
                <Alert type="critical" icon>
                  {error}
                </Alert>
              )}
              <InputField
                label={intl.translate(__("account.email"))}
                placeholder={intl.translate(__("account.email_placeholder"))}
                error={emailError}
                help={emailHint}
                value={email}
                onChange={onEmailChange}
                onBlur={onEmailBlur}
                name="email"
                dataTest="MagicLogin-Email"
              />
              <PasswordFieldWrapper>
                <InputField
                  label={intl.translate(__("account.password"))}
                  type="password"
                  name="passwordNew"
                  value={password}
                  onChange={onPasswordChange}
                  onBlur={onPasswordBlur}
                  dataTest="MagicLogin-Password"
                />
                <PasswordValidationBox passwordStrength={passwordStrength} />
              </PasswordFieldWrapper>
              <InputField
                label={intl.translate(__("account.password_confirmaiton"))}
                error={passwordConfirmError}
                type="password"
                name="passwordRepeat"
                value={passwordConfirm}
                onChange={onPasswordConfirmChange}
                onBlur={onPasswordConfirmBlur}
                dataTest="MagicLogin-PasswordConfirm"
              />
              <Button submit loading={isLoading}>
                <Translate t="account.create" />
              </Button>
              <Text size="small" t="account.registration_privacy_policy" html />
            </Stack>
          </form>
        </Section>
      </>
    )}
  </Consumer>
);

export default CreateAccount;
