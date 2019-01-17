// @flow strict
import * as React from "react";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Section from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import Translate from "../Translate";
import Text from "../Text";
import { Consumer } from "../../services/intl/context";

type LoginType = "mmb" | "help" | "refer";

type Props = {|
  type: LoginType,
  email: string,
  error?: React.Node,
  isLoading?: boolean,
  onNoAccount: (ev: SyntheticEvent<HTMLLinkElement>) => void,
  onGoogleLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onContinue: (ev: SyntheticEvent<HTMLButtonElement>) => void,
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

const AccountLogin = ({
  type,
  email,
  error,
  isLoading,
  onNoAccount,
  onGoogleLogin,
  onFacebookLogin,
  onEmailChange,
  onContinue,
}: Props) => (
  <Consumer>
    {intl => (
      <>
        <Section>
          <Illustration
            name={ILLUSTRATION[type] || ILLUSTRATION.mmb}
            size="small"
            spaceAfter="small"
          />
          <Heading element="h2" spaceAfter="small">
            <Translate t={TITLE_TKEY[type] || TITLE_TKEY.mmb} />
          </Heading>
          <Text spaceAfter="large" t={DESC_TKEY[type] || DESC_TKEY.mmb} />
        </Section>
        <Section>
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
                  type="email"
                  value={email}
                  onChange={onEmailChange}
                />
                <Button submit loading={isLoading}>
                  <Translate t="account.continue" />
                </Button>
              </Stack>
              <TextLink size="small" type="secondary" onClick={onNoAccount}>
                <Translate t="account.i_dont_have_account" />
              </TextLink>
            </Stack>
          </form>
        </Section>
        <Section suppressed>
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
        </Section>
      </>
    )}
  </Consumer>
);

AccountLogin.defaultProps = {
  type: "mmb",
};

export default AccountLogin;
