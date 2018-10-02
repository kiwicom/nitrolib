// @flow strict
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";

import Flex from "../../primitives/Flex";
import Trans from "../Text";
import { themeDefault } from "../../records/Theme";

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
  +onNoAccount: () => void,
  +onGoogleLogin: () => void,
  +onFacebookLogin: () => void,
  +onEmailChange: () => void,
  +onContinue: () => void,
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
          <Text weight="bold">Sign in with your email address</Text>
        </SpacingMedium>
        <Flex y="flex-end">
          <span style={{ flexGrow: 1, marginRight: "8px" }}>
            <InputField
              label="Email"
              placeholder="e.g. your@email.com"
              type="email"
              onChange={this.props.onEmailChange}
            />
          </span>
          <Button onClick={this.props.onContinue}>Continue</Button>
        </Flex>
        <Rectangle>
          <Text weight="bold">Or use social account</Text>
          <Flex>
            <span style={{ flexGrow: 1, marginRight: "4px" }}>
              <Button
                type="facebook"
                block
                bordered
                icon={<FacebookIcon />}
                onClick={this.props.onFacebookLogin}
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
                onClick={this.props.onGoogleLogin}
              >
                <Trans t={__("account.log_in_with")} values={{ provider: "Google" }} />
              </Button>
            </span>
          </Flex>
        </Rectangle>
        <TextLink type="secondary" onClick={this.props.onNoAccount}>
          I don’t have an account
        </TextLink>
      </React.Fragment>
    );
  }
}

export default InputDate;
