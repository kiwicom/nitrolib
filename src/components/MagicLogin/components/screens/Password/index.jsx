// @flow strict
import * as React from "react";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Edit from "@kiwicom/orbit-components/lib/icons/Edit";
import Modal, { ModalHeader, ModalSection } from "@kiwicom/orbit-components/lib/Modal";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import { useIntl } from "../../../../../services/intl/context";
import { useBrand } from "../../../../../services/brand/context";
import Translate from "../../../../Translate";
import Text from "../../../../Text";

type Props = {|
  email: string,
  password: string,
  error?: React.Node,
  passwordError?: string,
  isSigningIn?: boolean,
  isSendingEmail?: boolean,
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
  onChangeEmail,
  onAskSignInLink,
  onPasswordChange,
  onForgotPassword,
  onSignIn,
}: Props) => {
  const intl = useIntl();
  const brand = useBrand();

  return (
    <Modal>
      <ModalHeader
        illustration={<Illustration name="Login" size="small" />}
        title={
          <Heading element="h2">
            <Translate t="account.manage_your_bookings" />
          </Heading>
        }
        description={<Text t="account.sign_in_description" values={{ brandName: brand.name }} />}
      />
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
    </Modal>
  );
};

export default Password;
