// @flow strict
import * as React from "react";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import Header from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import Section from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Translate from "../Translate";

type Props = {|
  email: string,
  onAskSignInLink: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
  onGoogleLogin: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
|};

const AccountSocialLogin = ({ onAskSignInLink, onFacebookLogin, onGoogleLogin, email }: Props) => (
  <>
    <Header>
      <Illustration name="Login" size="small" />
      <Heading element="h2">
        <Translate t={__("account.manage_your_bookings")} />
      </Heading>
      <OrbitText weight="bold">
        <Translate t={__("account.sign_in_description")} />
      </OrbitText>
    </Header>
    <Section>
      <Stack desktop={{ direction: "row" }}>
        <Button type="facebook" bordered icon={<FacebookIcon />} onClick={onFacebookLogin}>
          <Translate t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
        </Button>
        <Button type="google" bordered icon={<GoogleIcon />} onClick={onGoogleLogin}>
          <Translate t={__("account.log_in_with")} values={{ provider: "Google" }} />
        </Button>
      </Stack>
    </Section>
    <Section>
      <OrbitText spaceAfter="normal">
        <Translate t={__("account.send_link_to")} values={{ email }} />
      </OrbitText>
      <Button type="secondary" onClick={onAskSignInLink}>
        <Translate t={__("account.ask_sign_in_link")} />
      </Button>
    </Section>
  </>
);

export default AccountSocialLogin;
