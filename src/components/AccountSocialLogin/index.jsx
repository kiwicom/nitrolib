// @flow strict
import * as React from "react";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import Header from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import Section from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Translate from "../Translate";
import Text from "../Text";

type Props = {|
  email: string,
  onAskSignInLink: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onGoogleLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
|};

const AccountSocialLogin = ({ onAskSignInLink, onFacebookLogin, onGoogleLogin, email }: Props) => (
  <>
    <Header>
      <Illustration name="Login" size="small" />
      <Heading element="h2">
        <Translate t="account.manage_your_bookings" />
      </Heading>
      <Text t="account.sign_in_description" />
    </Header>
    <Section>
      <Stack flex direction="column" spacing="condensed" desktop={{ direction: "row" }}>
        <Button type="facebook" bordered icon={<FacebookIcon />} onClick={onFacebookLogin}>
          <Translate t="account.log_in_with" values={{ provider: "Facebook" }} />
        </Button>
        <Button type="google" bordered icon={<GoogleIcon />} onClick={onGoogleLogin}>
          <Translate t="account.log_in_with" values={{ provider: "Google" }} />
        </Button>
      </Stack>
    </Section>
    <Section>
      <Text spaceAfter="normal" t="account.send_link_to" values={{ email }} />
      <Button type="secondary" onClick={onAskSignInLink}>
        <Translate t="account.ask_sign_in_link" />
      </Button>
    </Section>
  </>
);

export default AccountSocialLogin;
