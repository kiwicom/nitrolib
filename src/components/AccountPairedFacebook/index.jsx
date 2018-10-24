// @flow strict
import * as React from "react";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import Header from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import Section from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import Text from "../Text";

type Props = {|
  email: string,
  onAskSignInLink: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
|};

const AccountPairedFacebook = ({ onAskSignInLink, onFacebookLogin, email }: Props) => (
  <>
    <Header>
      <Illustration name="Login" size="small" />
      <Heading element="h2">
        <Text t={__("account.manage_your_bookings")} />
      </Heading>
      <OrbitText weight="bold">
        <Text t={__("account.sign_in_description")} />
      </OrbitText>
    </Header>
    <Section>
      <Button type="facebook" bordered icon={<FacebookIcon />} onClick={onFacebookLogin}>
        <Text t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
      </Button>
    </Section>
    <Section>
      <OrbitText spaceAfter="normal">
        <Text t={__("account.send_link_to")} values={{ email }} />
      </OrbitText>
      <Button type="secondary" onClick={onAskSignInLink}>
        <Text t={__("account.ask_sign_in_link")} />
      </Button>
    </Section>
  </>
);

export default AccountPairedFacebook;
