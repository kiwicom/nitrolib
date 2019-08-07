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

import Translate from "../../../Translate";
import Text from "../../../Text";

type Props = {|
  email: string,
  pairedWith: "facebook" | "google",
  onAskSignInLink: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onSocialLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
|};

const BUTTON_ICON = {
  facebook: <FacebookIcon />,
  google: <GoogleIcon />,
};

const PROVIDER = {
  google: "Google",
  facebook: "Facebook",
};

const SocialLogin = ({ onAskSignInLink, onSocialLogin, email, pairedWith }: Props) => (
  <>
    <Header>
      <Illustration name="Login" size="small" />
      <Heading element="h2">
        <Translate
          t="account.login_title.paired_with_social"
          values={{ provider: PROVIDER[pairedWith] }}
        />
      </Heading>
      <Text
        t="account.login_description.paired_with_social"
        values={{ provider: PROVIDER[pairedWith] }}
      />
    </Header>
    <Section dataTest="MagicLogin-SocialLogin">
      <Stack flex direction="column" spacing="condensed" desktop={{ direction: "row" }}>
        <Button type={pairedWith} bordered icon={BUTTON_ICON[pairedWith]} onClick={onSocialLogin}>
          <Translate t="account.log_in_with" values={{ provider: PROVIDER[pairedWith] }} />
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

export default SocialLogin;
