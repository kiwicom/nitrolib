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
  +onChangeEmail: () => void,
  +onAskSignInLink: () => void,
  +onPasswordChange: () => void,
  +onSignIn: () => void,
|};

class InputDate extends React.PureComponent<Props> {
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
      <React.Fragment>
        <Illustration name="Login" size="small" />
        <SpacingXSmall>
          <Heading element="h2">Manage your bookings</Heading>
        </SpacingXSmall>
        <Text>Sign in to access all of your bookings, Price Alerts, and Kiwi.com Credit.</Text>
        <Ruler />
        <SpacingMedium>
          <Text>Email</Text>
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
              label="Password"
              type="password"
              onChange={onPasswordChange}
              value={password}
            />
          </span>
          <Button onClick={onSignIn}>Sign In</Button>
        </Flex>

        <Ruler />
        <SpacingXSmall>
          <Text>
            Send <b>{email}</b> a link to sign in:
          </Text>
        </SpacingXSmall>
        <Button type="secondary" onClick={onAskSignInLink}>
          Receive a sign in link email
        </Button>
      </React.Fragment>
    );
  }
}

export default InputDate;
