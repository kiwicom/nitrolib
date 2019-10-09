// @flow strict

import * as React from "react";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import Translate from "../../../../Translate";
import TranslateRef from "../../../../TranslateRef";

type Props = {|
  email: string,
  reason: "magicLink" | "signUpConfirmation" | "resetPassword",
|};

const getText = reason => {
  switch (reason) {
    case "magicLink":
      return __("account.check_email_magic_link");
    case "signUpConfirmation":
      return __("account.check_email_sign_up");
    case "resetPassword":
      return __("account.you_will_recieve_password");
    default:
      // Remove next line after
      // eslint-disable-next-line no-unused-expressions
      (reason: empty);
      return __("account.check_email_magic_link");
  }
};

const CheckEmail = ({ email, reason }: Props) => (
  <ModalSection dataTest="MagicLogin-CheckEmail">
    <Heading element="h2" spaceAfter="small">
      <Translate t="account.check_email" />
    </Heading>

    <Illustration name="Mailbox" size="medium" spaceAfter="large" />

    <OrbitText>
      <TranslateRef
        t={getText(reason)}
        values={{ email }}
        render={() => <OrbitText weight="bold">{email}</OrbitText>}
      />
    </OrbitText>
  </ModalSection>
);

export default CheckEmail;
