// @flow strict
import * as React from "react";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
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
import { Consumer } from "../../services/intl/context";

type Props = {|
  email: string,
  illustration?: "Login" | "Help" | "InviteAFriend" | "AirHelp",
  text?: React.Node,
  onNoAccount: (ev: SyntheticEvent<HTMLLinkElement>) => void,
  onGoogleLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onContinue: (ev: SyntheticEvent<HTMLButtonElement>) => void,
|};

const AccountLogin = ({
  email,
  text,
  illustration,
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
          <Illustration name={illustration || "Login"} size="small" spaceAfter="small" />
          <Heading element="h2" spaceAfter="small">
            {text || <Translate t="account.manage_your_bookings" />}
          </Heading>
          <OrbitText spaceAfter="large">
            <Translate t="account.sign_in_description" />
          </OrbitText>
        </Section>
        <Section>
          <OrbitText weight="bold" spaceAfter="medium">
            <Translate t="account.sign_in_description" />
          </OrbitText>
          <Stack spaceAfter="small" spacing="condensed" align="end">
            <InputField
              label={intl.translate(__("account.email"))}
              placeholder={intl.translate(__("account.email_placeholder"))}
              type="email"
              value={email}
              onChange={onEmailChange}
            />
            <Button onClick={onContinue}>
              <Translate t="account.continue" />
            </Button>
          </Stack>
          <OrbitText size="small">
            <TextLink type="secondary" onClick={onNoAccount}>
              <Translate t="account.i_dont_have_account" />
            </TextLink>
          </OrbitText>
        </Section>
        <Section suppressed>
          <OrbitText weight="bold" spaceAfter="medium">
            <Translate t="account.or_social_account" />
          </OrbitText>
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

export default AccountLogin;
