// @flow strict
import * as React from "react";
import styled from "styled-components";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";

import { Consumer } from "../../services/intl/context";
import Text from "../Text";

const SpacingXSmall = styled.div`
  margin-bottom: 8px;
`;

const SpacingMedium = styled.div`
  margin-bottom: 16px;
`;

type Props = {|
  email: string,
  password: string,
  passwordConfirm: string,
  onEmailChange: (ev: SyntheticEvent<>) => void,
  onPasswordChange: (ev: SyntheticEvent<>) => void,
  onPasswordConfirmChange: (ev: SyntheticEvent<>) => void,
  onContinue: (ev: SyntheticEvent<>) => void,
  onTermsOfUse: (ev: SyntheticEvent<>) => void,
  onPrivacyPolicy: (ev: SyntheticEvent<>) => void,
|};

class AccountCreate extends React.PureComponent<Props> {
  render() {
    const {
      email,
      onEmailChange,
      onContinue,
      password,
      passwordConfirm,
      onPasswordChange,
      onPasswordConfirmChange,
      onTermsOfUse,
      onPrivacyPolicy,
    } = this.props;
    return (
      <Consumer>
        {intl => (
          <React.Fragment>
            <Illustration name="EnjoyApp" size="small" />
            <SpacingXSmall>
              <Heading element="h2">
                <Text t={__("account.create_account")} />
              </Heading>
            </SpacingXSmall>
            <SpacingXSmall>
              <Text t={__("account.create_account_description")} />
            </SpacingXSmall>
            <SpacingMedium>
              <InputField
                label={intl.translate(__("account.email"))}
                placeholder={intl.translate(__("account.email_placeholder"))}
                type="email"
                value={email}
                onChange={onEmailChange}
              />
            </SpacingMedium>
            <SpacingMedium>
              <InputField
                label={intl.translate(__("account.password"))}
                type="password"
                value={password}
                onChange={onPasswordChange}
              />
            </SpacingMedium>
            <SpacingMedium>
              <InputField
                label={intl.translate(__("account.password_confirmaiton"))}
                type="password"
                value={passwordConfirm}
                onChange={onPasswordConfirmChange}
              />
            </SpacingMedium>
            <SpacingMedium>
              <Button onClick={onContinue}>
                <Text t={__("account.create")} />
              </Button>
            </SpacingMedium>
            <OrbitText size="small">
              The registration and subsequent use of your account is governed by these{" "}
              <TextLink type="secondary" onClick={onTermsOfUse}>
                Terms of Use
              </TextLink>
              . Your personal data will be processed according to our{" "}
              <TextLink type="secondary" onClick={onPrivacyPolicy}>
                Privacy Policy
              </TextLink>
              .
            </OrbitText>
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

export default AccountCreate;
