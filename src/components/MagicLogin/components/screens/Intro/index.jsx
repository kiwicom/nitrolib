// @flow strict
import * as React from "react";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Modal, { ModalHeader, ModalSection } from "@kiwicom/orbit-components/lib/Modal";

import Translate from "../../../../Translate";
import Text from "../../../../Text";
import { useIntl } from "../../../../../services/intl/context";
import { useBrand } from "../../../../../services/brand/context";

type LoginType = "mmb" | "help" | "refer";

type Props = {|
  type?: LoginType,
  email: string,
  error?: React.Node,
  emailError?: string,
  isLoading?: boolean,
  disableSocialLogin?: boolean,
  onGoogleLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onEmailBlur: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onContinue: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onIncorrectEmail: () => void,
|};

const ILLUSTRATION = {
  help: "Help",
  refer: "ReferAFriend",
  mmb: "Login",
};

const TITLE_TKEY = {
  help: __("account.login_title.get_help"),
  refer: __("account.login_title.refer"),
  mmb: __("account.manage_your_bookings"),
};

const DESC_TKEY = {
  help: __("account.login_description.help"),
  refer: __("account.login_description.refer"),
  mmb: __("account.sign_in_description"),
};

const Intro = ({
  type = "mmb",
  email,
  error,
  isLoading,
  emailError,
  disableSocialLogin,
  onGoogleLogin,
  onFacebookLogin,
  onEmailChange,
  onEmailBlur,
  onContinue,
  onIncorrectEmail,
}: Props) => {
  const intl = useIntl();
  const brand = useBrand();

  return (
    <Modal>
      <ModalHeader
        title={
          <Heading element="h2" spaceAfter="small">
            <Translate t={TITLE_TKEY[type]} />
          </Heading>
        }
        description={<Text t={DESC_TKEY[type]} values={{ brandName: brand.name }} />}
        illustration={<Illustration name={ILLUSTRATION[type]} size="small" spaceAfter="small" />}
      />
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
              <Button submit loading={isLoading}>
                <Translate t="account.continue" />
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalSection>
      {!disableSocialLogin && (
        <ModalSection suppressed dataTest="MagicLogin-LoginViaSocials">
          <Text weight="bold" spaceAfter="medium" t="account.or_social_account" />
          <Stack spacing="natural" align="end">
            <Button
              type="facebook"
              block
              bordered
              icon={<FacebookIcon />}
              onClick={onFacebookLogin}
            >
              <Translate t="account.log_in_with" values={{ provider: "Facebook" }} />
            </Button>
            <Button type="google" block bordered icon={<GoogleIcon />} onClick={onGoogleLogin}>
              <Translate t="account.log_in_with" values={{ provider: "Google" }} />
            </Button>
          </Stack>
        </ModalSection>
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
    </Modal>
  );
};

export default Intro;
