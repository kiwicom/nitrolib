// @flow strict
import * as React from "react";
import styled from "styled-components";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";

import Flex from "../../primitives/Flex";
import Text from "../Text";

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
      <React.Fragment>
        <SpacingXSmall>
          <Heading element="h2">
            <Text t={__("account.check_email")} />
          </Heading>
        </SpacingXSmall>
        <Flex x="space-around">
          <Illustration name="Mailbox" size="medium" />
        </Flex>
        <SpacingXSmall>
          {reason === "magicLink" && (
            <OrbitText>
              <Text t={__("account.check_email_magic_link")} values={{ email }} />
            </OrbitText>
          )}
          {reason === "signUpConfirmation" && (
            <OrbitText>
              <Text t={__("account.check_email_sign_up")} values={{ email }} />
            </OrbitText>
          )}
        </SpacingXSmall>
      </React.Fragment>
    );
  }
}

export default AccountCheckEmail;
