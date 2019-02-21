// @flow strict
import * as React from "react";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import Translate from "../Translate";
import Text from "../Text";
import { Consumer as IntlConsumer } from "../../services/intl/context";
import { Consumer as BrandConsumer } from "../../services/brand/context";

type LoginType = "mmb" | "help" | "refer";

type Props = {|
  type?: LoginType,
  email: string,
  error?: React.Node,
  isLoading?: boolean,
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
  type = "mmb",
  email,
  error,
  isLoading,
  onGoogleLogin,
  onFacebookLogin,
  onEmailChange,
  onContinue,
}: Props) => (
  <IntlConsumer>
    {intl => (
      <BrandConsumer>
        {brand => (
          <>
            <ModalSection>
              <Illustration name={ILLUSTRATION[type]} size="small" spaceAfter="small" />
              <Heading element="h2" spaceAfter="small">
                <Translate t={TITLE_TKEY[type]} />
              </Heading>
              <Text t={DESC_TKEY[type]} values={{ brandName: brand.name }} />
            </ModalSection>
            <ModalSection dataTest="AccountLogin">
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
                      dataTest="Email"
                    />
                    <Button submit loading={isLoading}>
                      <Translate t="account.continue" />
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </ModalSection>
            <ModalSection suppressed>
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
          </>
        )}
      </BrandConsumer>
    )}
  </IntlConsumer>
);

export default AccountLogin;
