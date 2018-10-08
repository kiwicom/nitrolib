// @flow strict
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";

import Trans from "../Text";
import { Consumer } from "../../services/intl/context";

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
  onAskSignInLink: (ev: SyntheticEvent<>) => void,
  onFacebookLogin: (ev: SyntheticEvent<>) => void,
|};

class AccountPairedFacebook extends React.PureComponent<Props> {
  render() {
    const { onAskSignInLink, onFacebookLogin, email } = this.props;

    return (
      <Consumer>
        {intl => (
          <React.Fragment>
            <Illustration name="Login" size="small" />
            <SpacingXSmall>
              <Heading element="h2">{intl.translate(__("account.manage_your_bookings"))}</Heading>
            </SpacingXSmall>
            <SpacingBig>
              <Text weight="bold">{intl.translate(__("account.sign_in_description"))}</Text>
            </SpacingBig>
            <Button type="facebook" bordered icon={<FacebookIcon />} onClick={onFacebookLogin}>
              <Trans t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
            </Button>
            <Ruler />
            <SpacingXSmall>
              <Text>{intl.translate(__("account.send_link_to"), { email })}</Text>
            </SpacingXSmall>
            <Button type="secondary" onClick={onAskSignInLink}>
              {intl.translate(__("account.ask_sign_in_link"))}
            </Button>
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

export default AccountPairedFacebook;
