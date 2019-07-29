import * as React from "react";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Section from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import Text from "../../../../Text";
import Translate from "../../../../Translate";

type Props = {
  email: string,
  reason: "magicLink" | "signUpConfirmation" | "resetPassword",
};

const CheckEmail = ({ email, reason }: Props) => (
  <Section dataTest="MagicLogin-CheckEmail">
    <Heading element="h2" spaceAfter="small">
      <Translate t="account.check_email" />
    </Heading>

    <Illustration name="Mailbox" size="medium" spaceAfter="large" />

    {reason === "magicLink" && <Text t="account.check_email_magic_link" values={{ email }} />}

    {reason === "signUpConfirmation" && <Text t="account.check_email_sign_up" values={{ email }} />}

    {reason === "resetPassword" && <Text t="account.you_will_recieve_password" />}
  </Section>
);

export default CheckEmail;
