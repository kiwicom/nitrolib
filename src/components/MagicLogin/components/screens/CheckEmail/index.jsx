// @flow strict
import * as React from "react";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Modal, { ModalHeader } from "@kiwicom/orbit-components/lib/Modal";

import Text from "../../../../Text";
import Translate from "../../../../Translate";

type Props = {|
  email: string,
  reason: "magicLink" | "signUpConfirmation" | "resetPassword",
|};

const Description = ({ reason, email }: Props) => {
  switch (reason) {
    case "signUpConfirmation":
      return <Text t="account.check_email_sign_up" values={{ email }} />;

    case "resetPassword":
      return <Text t="account.you_will_recieve_password" />;

    default:
      return <Text t="account.check_email_magic_link" values={{ email }} />;
  }
};

const CheckEmail = ({ reason, email }: Props) => (
  <Modal>
    <ModalHeader
      dataTest="MagicLogin-CheckEmail"
      title={
        <Heading element="h2" spaceAfter="small">
          <Translate t="account.check_email" />
        </Heading>
      }
      description={<Description reason={reason} email={email} />}
      illustration={<Illustration name="Mailbox" size="medium" spaceAfter="large" />}
    />
  </Modal>
);

export default CheckEmail;
