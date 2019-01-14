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

import { Consumer } from "../../services/intl/context";
import Translate from "../Translate";
import Text from "../Text";

type Props = {|
  email: string,
  password: string,
  error?: React.Node,
  passwordConfirm: string,
  emailHint?: string,
  emailError?: string,
  passwordError?: string,
  passwordConfirmError?: string,
  isLoading?: boolean,
  onEmailBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onPasswordChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onPasswordBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onPasswordConfirmChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onPasswordConfirmBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onContinue: (ev: SyntheticEvent<HTMLFormElement>) => void,
|};

const AccountCreate = ({
  email,
  onEmailBlur,
  onEmailChange,
  onContinue,
  password,
  error,
  emailHint,
  emailError,
  passwordError,
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
          <Translate t="account.create_account_description" />
        </Header>
        <Section>
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
                type="email"
                value={email}
                onChange={onEmailChange}
                onBlur={onEmailBlur}
              />
              <InputField
                label={intl.translate(__("account.password"))}
                error={passwordError}
                type="password"
                value={password}
                onChange={onPasswordChange}
                onBlur={onPasswordBlur}
              />
              <InputField
                label={intl.translate(__("account.password_confirmaiton"))}
                error={passwordConfirmError}
                type="password"
                value={passwordConfirm}
                onChange={onPasswordConfirmChange}
                onBlur={onPasswordConfirmBlur}
              />
              <Button submit loading={isLoading}>
                <Translate t="account.create" />
              </Button>
              <Text size="small" t="account.terms_and_privacy_policy" html />
            </Stack>
          </form>
        </Section>
      </>
    )}
  </Consumer>
);

export default AccountCreate;
