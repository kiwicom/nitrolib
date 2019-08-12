// @flow strict
import * as React from "react";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import Edit from "@kiwicom/orbit-components/lib/icons/Edit";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import IntlContext from "../../../../../services/intl/context";
import Translate from "../../../../Translate";
import Text from "../../../../Text";

type Props = {|
  email: string,
  password: string,
  error?: React.Node,
  passwordError?: string,
  isSigningIn?: boolean,
  isSendingEmail?: boolean,
  tailoredHeader: React.Node,
  onChangeEmail: (ev: SyntheticEvent<HTMLLinkElement>) => void,
  onForgotPassword: (ev: SyntheticEvent<HTMLLinkElement>) => void,
  onAskSignInLink: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onPasswordChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onSignIn: (ev: SyntheticEvent<HTMLFormElement>) => void,
|};

const Password = ({
  email,
  password,
  error,
  passwordError,
  isSigningIn,
  isSendingEmail,
  tailoredHeader,
  onChangeEmail,
  onAskSignInLink,
  onPasswordChange,
  onForgotPassword,
  onSignIn,
}: Props) => {
  const intl = React.useContext(IntlContext);

  return (
    <>
      {tailoredHeader}
      <ModalSection dataTest="MagicLogin-Password">
        <form onSubmit={onSignIn}>
          <Stack>
            {error && (
              <Alert type="critical" icon>
                {error}
              </Alert>
            )}
            <Stack spacing="tight" flex align="center">
              <OrbitText weight="bold">{email}</OrbitText>
              <TextLink type="primary" onClick={onChangeEmail}>
                <Edit size="small" />
              </TextLink>
            </Stack>
            <Stack align="end" spacing="condensed">
              <InputField
                label={intl.translate(__("account.password_input"))}
                error={passwordError && intl.translate(passwordError)}
                type="password"
                onChange={onPasswordChange}
                value={password}
                name="password"
                dataTest="MagicLogin-PasswordInput"
              />
              <Button submit loading={isSigningIn}>
                <Translate t="account.sign_in" />
              </Button>
            </Stack>
            <TextLink type="secondary" size="small" onClick={onForgotPassword}>
              <Translate t="account.forgot_password" />
            </TextLink>
          </Stack>
        </form>
      </ModalSection>
      <ModalSection>
        <Text spaceAfter="normal" t="account.send_link_to" values={{ email }} />
        <Button
          type="secondary"
          onClick={onAskSignInLink}
          loading={isSendingEmail}
          dataTest="MagicLogin-AskForMagic"
        >
          <Translate t="account.ask_sign_in_link" />
        </Button>
      </ModalSection>
    </>
  );
};

export default Password;
