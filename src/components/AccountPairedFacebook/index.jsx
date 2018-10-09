// @flow strict
import * as React from "react";
import styled from "styled-components";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";

import Text from "../Text";

const SpacingXSmall = styled.div`
  margin-bottom: 8px;
`;

const SpacingBig = styled.div`
  margin-bottom: 32px;
`;

const Ruler = styled.div`
  width: 100%;
  height: 1px;
  background: red;
  margin-top: 24px;
  margin-bottom: 24px;
  background-color: #e8edf1;
`;

type Props = {|
  email: string,
  onAskSignInLink: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
|};

const AccountPairedFacebook = ({ onAskSignInLink, onFacebookLogin, email }: Props) => (
  <React.Fragment>
    <Illustration name="Login" size="small" />
    <SpacingXSmall>
      <Heading element="h2">
        <Text t={__("account.manage_your_bookings")} />
      </Heading>
    </SpacingXSmall>
    <SpacingBig>
      <OrbitText weight="bold">
        <Text t={__("account.sign_in_description")} />
      </OrbitText>
    </SpacingBig>
    <Button type="facebook" bordered icon={<FacebookIcon />} onClick={onFacebookLogin}>
      <Text t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
    </Button>
    <Ruler />
    <SpacingXSmall>
      <OrbitText>
        <Text t={__("account.send_link_to")} values={{ email }} />
      </OrbitText>
    </SpacingXSmall>
    <Button type="secondary" onClick={onAskSignInLink}>
      <Text t={__("account.ask_sign_in_link")} />
    </Button>
  </React.Fragment>
);

export default AccountPairedFacebook;
