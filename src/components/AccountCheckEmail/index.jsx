// @flow strict
import * as React from "react";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Section from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import Translate from "../Translate";

type Props = {|
  email: string,
  reason: "magicLink" | "signUpConfirmation",
|};

const AccountCheckEmail = ({ email, reason }: Props) => (
  <Section>
    <Heading element="h2" spaceAfter="small">
      <Translate t="account.check_email" />
    </Heading>
    <Illustration name="Mailbox" size="medium" spaceAfter="large" />
    {reason === "magicLink" && (
      <OrbitText>
        <Translate t="account.check_email_magic_link" values={{ email }} />
      </OrbitText>
    )}
    {reason === "signUpConfirmation" && (
      <OrbitText>
        <Translate t="account.check_email_sign_up" values={{ email }} />
      </OrbitText>
    )}
  </Section>
);

export default AccountCheckEmail;
