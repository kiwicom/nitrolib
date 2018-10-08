// @flow strict
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";

import Flex from "../../primitives/Flex";
import { Consumer } from "../../services/intl/context";

const SpacingXSmall = styled.div`
  margin-bottom: 8px;
`;

type Props = {|
  email: string,
  reason: "magicLink" | "signUpConfirmation",
|};

class AccountCheckEmail extends React.PureComponent<Props> {
  render() {
    const { email, reason } = this.props;
    return (
      <Consumer>
        {intl => (
          <React.Fragment>
            <SpacingXSmall>
              <Heading element="h2">{intl.translate(__("account.check_email"))}</Heading>
            </SpacingXSmall>
            <Flex x="space-around">
              <Illustration name="Mailbox" size="medium" />
            </Flex>
            <SpacingXSmall>
              {reason === "magicLink" && (
                <Text>{intl.translate(__("account.check_email_magic_link"), { email })}</Text>
              )}
              {reason === "signUpConfirmation" && (
                <Text>{intl.translate(__("account.check_email_sign_up"), { email })}</Text>
              )}
            </SpacingXSmall>
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

export default AccountCheckEmail;
