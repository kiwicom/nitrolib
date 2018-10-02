// @flow strict
import * as React from "react";
import styled from "styled-components";

import { themeDefault } from "../../records/Theme";
import Text from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Flex from "../../primitives/Flex";
import Trans from "../Text";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import Edit from "@kiwicom/orbit-components/lib/icons/Edit";

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
|};

class InputDate extends React.PureComponent<Props> {
  render() {
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
            {this.props.email} <Edit size="small" />
          </Text>
        </SpacingMedium>
        <Flex y="flex-end">
          <span style={{ flexGrow: 1, marginRight: "8px" }}>
            <InputField label="Password" type="password" />
          </span>
          <Button>Sign In</Button>
        </Flex>

        <Ruler />
        <SpacingXSmall>
          <Text>
            Send <b>{this.props.email}</b> a link to sign in:
          </Text>
        </SpacingXSmall>
        <Button type="secondary">Receive a sign in link email</Button>
      </React.Fragment>
    );
  }
}

export default InputDate;
