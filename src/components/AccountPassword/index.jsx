// @flow strict
import * as React from "react";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Edit from "@kiwicom/orbit-components/lib/icons/Edit";
import Header from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import Section, { StyledModalSection } from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import styled from "styled-components";

import { Consumer } from "../../services/intl/context";
import Text from "../Text";

// temporary fix for InputField width, will be fixed in orbit-components ASAP
// TODO: replace with fragment
const Wrapper = styled.div`
  ${StyledModalSection} label {
    width: 100%;
  }
`;

type Props = {|
  email: string,
  password: string,
  onChangeEmail: (ev?: SyntheticEvent<HTMLLinkElement>) => void,
  onAskSignInLink: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
  onPasswordChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onSignIn: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
|};

const AccountPassword = ({
  email,
  password,
  onChangeEmail,
  onAskSignInLink,
  onPasswordChange,
  onSignIn,
}: Props) => (
  <Consumer>
    {intl => (
      <Wrapper>
        <Header>
          <Illustration name="Login" size="small" />
          <Heading element="h2">
            <Text t={__("account.manage_your_bookings")} />
          </Heading>
          <OrbitText weight="bold">
            <Text t={__("account.sign_in_description")} />
          </OrbitText>
        </Header>
        <Section>
          <OrbitText weight="bold" spaceAfter="medium">
            <Stack direction="row" spacing="tight">
              <OrbitText weight="bold">{email}</OrbitText>
              <TextLink type="primary" onClick={onChangeEmail}>
                <Edit size="small" />
              </TextLink>
            </Stack>
          </OrbitText>
          <Stack desktop={{ direction: "row", spacing: "condensed", align: "end" }}>
            <InputField
              label={intl.translate(__("account.password"))}
              type="password"
              onChange={onPasswordChange}
              value={password}
            />
            <Button onClick={onSignIn}>
              <Text t={__("account.sign_in")} />
            </Button>
          </Stack>
        </Section>
        <Section>
          <OrbitText spaceAfter="normal">
            <Text t={__("account.send_link_to")} values={{ email }} />
          </OrbitText>
          <Button type="secondary" onClick={onAskSignInLink}>
            <Text t={__("account.ask_sign_in_link")} />
          </Button>
        </Section>
      </Wrapper>
    )}
  </Consumer>
);

export default AccountPassword;
