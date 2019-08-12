// @flow strict
import * as React from "react";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import ModalHeader from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import IntlContext from "../../../../../services/intl/context";
import Translate from "../../../../Translate";
import Text from "../../../../Text";

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

const CreateAccount = ({
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
}: Props) => {
  const intl = React.useContext(IntlContext);

  return (
    <>
      <ModalHeader
        title={intl.translate(__("account.create_account"))}
        description={intl.translate(__("account.create_account_description"))}
        illustration={<Illustration name="EnjoyApp" size="small" />}
      />
      <ModalSection dataTest="MagicLogin-CreateAccount">
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
            <InputField
              label={intl.translate(__("account.password"))}
              error={passwordError}
              type="password"
              name="passwordNew"
              value={password}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
              dataTest="MagicLogin-Password"
            />
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
      </ModalSection>
    </>
  );
};

export default CreateAccount;
