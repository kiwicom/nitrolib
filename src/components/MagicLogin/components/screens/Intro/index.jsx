// @flow strict
import * as React from "react";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import Button from "../../../../Button";
import Translate from "../../../../Translate";
import Text from "../../../../Text";
import IntlContext from "../../../../../services/intl/context";
import LoginViaSocials from "../../LoginViaSocials";

type Props = {|
  email: string,
  error?: React.Node,
  emailError?: string,
  isLoading?: boolean,
  disableSocialLogin?: boolean,
  tailoredHeader: React.Node,
  onGoogleLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onEmailBlur: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onContinue: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onIncorrectEmail: () => void,
|};

const Intro = ({
  email,
  error,
  isLoading,
  emailError,
  disableSocialLogin,
  tailoredHeader,
  onGoogleLogin,
  onFacebookLogin,
  onEmailChange,
  onEmailBlur,
  onContinue,
  onIncorrectEmail,
}: Props) => {
  const intl = React.useContext(IntlContext);

  return (
    <>
      {tailoredHeader}
      <ModalSection dataTest="MagicLogin-Intro">
        <form onSubmit={onContinue}>
          <Stack>
            {error && (
              <Alert type="critical" icon>
                {error}
              </Alert>
            )}
            <Text weight="bold" t="account.sign_in_hint" />
            <Stack spaceAfter="small" spacing="condensed" align="end">
              <InputField
                label={intl.translate(__("account.email"))}
                placeholder={intl.translate(__("account.email_placeholder"))}
                value={email}
                error={emailError && intl.translate(emailError)}
                onChange={onEmailChange}
                onBlur={onEmailBlur}
                name="email"
                dataTest="MagicLogin-Email"
              />
              <Button
                t="account.continue"
                submit
                loading={isLoading}
                dataTest="MagicLogin-CheckEmail"
              />
            </Stack>
          </Stack>
        </form>
      </ModalSection>
      {!disableSocialLogin && (
        <LoginViaSocials onGoogleLogin={onGoogleLogin} onFacebookLogin={onFacebookLogin} />
      )}
      <ModalSection>
        <TextLink
          type="secondary"
          size="small"
          dataTest="MagicLogin-IncorrectEmail"
          onClick={onIncorrectEmail}
        >
          <Translate t="account.incorrect_booking_email" />
        </TextLink>
      </ModalSection>
    </>
  );
};

export default Intro;
