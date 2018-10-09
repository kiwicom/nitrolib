// @flow strict
import * as React from "react";
import styled from "styled-components";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
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
  onEmailChange: (ev: SyntheticEvent<HTMLInputElement>) => void,
  onPasswordChange: (ev: SyntheticEvent<HTMLInputElement>) => void,
  onPasswordConfirmChange: (ev: SyntheticEvent<HTMLInputElement>) => void,
  onContinue: (ev: SyntheticEvent<HTMLButtonElement>) => void,
|};

const AccountCreate = ({
  email,
  onEmailChange,
  onContinue,
  password,
  passwordConfirm,
  onPasswordChange,
  onPasswordConfirmChange,
}: Props) => (
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
          <Text t={__("account.terms_and_privacy_policy")} html />
        </OrbitText>
      </React.Fragment>
    )}
  </Consumer>
);

export default AccountCreate;
