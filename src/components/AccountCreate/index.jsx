// @flow strict
import * as React from "react";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Header from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import Section, { StyledModalSection } from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import styled from "styled-components";

import { Consumer } from "../../services/intl/context";
import Text from "../Text";

type Props = {|
  email: string,
  password: string,
  passwordConfirm: string,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onPasswordChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onPasswordConfirmChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onContinue: (ev: SyntheticEvent<HTMLButtonElement>) => void,
|};

// temporary fix for InputField width, will be fixed in orbit-components ASAP
// TODO: replace with fragment
const Wrapper = styled.div`
  ${StyledModalSection} label {
    width: 100%;
  }
`;

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
      <Wrapper>
        <Header>
          <Illustration name="EnjoyApp" size="small" />
          <Heading element="h2">
            <Text t={__("account.create_account")} />
          </Heading>
          <Text t={__("account.create_account_description")} />
        </Header>
        <Section>
          <Stack desktop={{ spacing: "comfy" }}>
            <InputField
              label={intl.translate(__("account.email"))}
              placeholder={intl.translate(__("account.email_placeholder"))}
              type="email"
              value={email}
              onChange={onEmailChange}
            />
            <InputField
              label={intl.translate(__("account.password"))}
              type="password"
              value={password}
              onChange={onPasswordChange}
            />
            <InputField
              label={intl.translate(__("account.password_confirmaiton"))}
              type="password"
              value={passwordConfirm}
              onChange={onPasswordConfirmChange}
            />
            <Button onClick={onContinue}>
              <Text t={__("account.create")} />
            </Button>
            <OrbitText size="small">
              <Text t={__("account.terms_and_privacy_policy")} html />
            </OrbitText>
          </Stack>
        </Section>
      </Wrapper>
    )}
  </Consumer>
);

export default AccountCreate;
