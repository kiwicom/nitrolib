// @flow strict
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Edit from "@kiwicom/orbit-components/lib/icons/Edit";

import Flex from "../../primitives/Flex";
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

const Ruler = styled.div`
  & {
    width: 100%;
    height: 1px;
    background: red;
    margin-top: 24px;
    margin-bottom: 24px;
    background-color: #e8edf1;
  }
`;

type Props = {|
  +email: string,
  +password: string,
  +onChangeEmail: (ev: SyntheticEvent<>) => void,
  +onAskSignInLink: (ev: SyntheticEvent<>) => void,
  +onPasswordChange: (ev: SyntheticEvent<>) => void,
  +onSignIn: (ev: SyntheticEvent<>) => void,
|};

class AccountPassword extends React.PureComponent<Props> {
  render() {
    const {
      email,
      password,
      onChangeEmail,
      onAskSignInLink,
      onPasswordChange,
      onSignIn,
    } = this.props;

    return (
      <Consumer>
        {intl => (
          <React.Fragment>
            <Illustration name="Login" size="small" />
            <SpacingXSmall>
              <Heading element="h2">{intl.translate(__("account.manage_your_bookings"))}</Heading>
            </SpacingXSmall>
            <Text weight="bold">{intl.translate(__("account.sign_in_description"))}</Text>
            <Ruler />
            <SpacingMedium>
              <Text>{intl.translate(__("account.email"))}</Text>
              <Text weight="bold">
                {email}
                <TextLink type="primary" onClick={onChangeEmail}>
                  <Edit size="small" />
                </TextLink>
              </Text>
            </SpacingMedium>
            <Flex y="flex-end">
              <span style={{ flexGrow: 1, marginRight: "8px" }}>
                <InputField
                  label={intl.translate(__("account.password"))}
                  type="password"
                  onChange={onPasswordChange}
                  value={password}
                />
              </span>
              <Button onClick={onSignIn}>{intl.translate(__("account.sign_in"))}</Button>
            </Flex>

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

export default AccountPassword;
