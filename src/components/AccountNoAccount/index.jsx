// @flow strict
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import ChevronLeft from "@kiwicom/orbit-components/lib/icons/ChevronLeft";

import Flex from "../../primitives/Flex";
import Trans from "../Text";
import { Consumer } from "../../services/intl/context";

const SpacingXSmall = styled.div`
  & {
    margin-bottom: 8px;
  }
`;

const SpacingMedium = styled.div`
  & {
    margin-bottom: 16px;
  }
`;

const SpacingBig = styled.div`
  & {
    margin-bottom: 32px;
  }
`;

const Rectangle = styled.div`
  & {
    border-top: 1px solid #e8edf1;
    width: 100%;
    height: 128px;
    background-color: #f5f7f9;
    padding-top: 24px;
    padding-bottom: 24px;
    margin-top: 50px;
    margin-bottom: 16px;
  }
`;

type Props = {|
  +onBack: (ev: SyntheticEvent<>) => void,
  +onRegister: (ev: SyntheticEvent<>) => void,
  +onFacebookLogin: (ev: SyntheticEvent<>) => void,
  +onGoogleLogin: (ev: SyntheticEvent<>) => void,
|};

class AccountNoAccount extends React.PureComponent<Props> {
  render() {
    const { onBack, onRegister, onFacebookLogin, onGoogleLogin } = this.props;
    return (
      <Consumer>
        {intl => (
          <React.Fragment>
            <Illustration name="NoBookings" size="small" />
            <SpacingXSmall>
              <Heading element="h2">{intl.translate(__("account.no_bookings_or_account"))}</Heading>
            </SpacingXSmall>
            <SpacingBig>
              <Text>{intl.translate(__("account.no_bookings_or_account_description"))}</Text>
            </SpacingBig>
            <SpacingMedium>
              <Button onClick={onRegister}>{intl.translate(__("account.register"))}</Button>
            </SpacingMedium>
            <SpacingMedium>
              <ButtonLink type="secondary" iconLeft={<ChevronLeft />} onClick={onBack}>
                {intl.translate(__("account.back"))}
              </ButtonLink>
            </SpacingMedium>
            <Rectangle>
              <Text weight="bold">{intl.translate(__("account.or_social_account"))}</Text>
              <Flex>
                <span style={{ flexGrow: 1, marginRight: "4px" }}>
                  <Button
                    type="facebook"
                    block
                    bordered
                    icon={<FacebookIcon />}
                    onClick={onFacebookLogin}
                  >
                    <Trans t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
                  </Button>
                </span>
                <span style={{ flexGrow: 1, marginLeft: "4px" }}>
                  <Button
                    type="google"
                    block
                    bordered
                    icon={<GoogleIcon />}
                    onClick={onGoogleLogin}
                  >
                    <Trans t={__("account.log_in_with")} values={{ provider: "Google" }} />
                  </Button>
                </span>
              </Flex>
            </Rectangle>
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

export default AccountNoAccount;
