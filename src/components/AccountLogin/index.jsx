// @flow strict
import * as React from "react";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Section, { StyledModalSection } from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import styled from "styled-components";

import Text from "../Text";
import { Consumer } from "../../services/intl/context";

// temporary fix for InputField width, will be fixed in orbit-components ASAP
// TODO: replace with fragment
const Wrapper = styled.div`
  ${StyledModalSection} label {
    width: 100%;
  }
`;

type IllustrationType = "Login" | "Help" | "InviteAFriend" | "AirHelp";

type Props = {|
  illustration?: IllustrationType,
  text?: string,
  email: string,
  onNoAccount: (ev?: SyntheticEvent<HTMLLinkElement>) => void,
  onGoogleLogin: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onContinue: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
|};

const AccountLogin = ({
  email,
  text,
  illustration,
  onNoAccount,
  onGoogleLogin,
  onFacebookLogin,
  onEmailChange,
  onContinue,
}: Props) => (
  <Consumer>
    {intl => (
      <Wrapper>
        <Section>
          <Illustration name={illustration || "Login"} size="small" spaceAfter="small" />
          <Heading element="h2" spaceAfter="small">
            {text || <Text t={__("account.manage_your_bookings")} />}
          </Heading>
          <OrbitText spaceAfter="large">
            <Text t={__("account.sign_in_description")} />
          </OrbitText>
        </Section>
        <Section>
          <OrbitText weight="bold" spaceAfter="medium">
            <Text t={__("account.sign_in_description")} />
          </OrbitText>
          <Stack
            spaceAfter="small"
            desktop={{
              spacing: "condensed",
              direction: "row",
              align: "end",
            }}
          >
            <InputField
              label={intl.translate(__("account.email"))}
              placeholder={intl.translate(__("account.email_placeholder"))}
              type="email"
              value={email}
              onChange={onEmailChange}
            />
            <Button onClick={onContinue}>
              <Text t={__("account.continue")} />
            </Button>
          </Stack>
          <OrbitText size="small">
            <TextLink type="secondary" onClick={onNoAccount}>
              <Text t={__("account.i_dont_have_account")} />
            </TextLink>
          </OrbitText>
        </Section>
        <Section suppressed>
          <OrbitText weight="bold" spaceAfter="medium">
            <Text t={__("account.or_social_account")} />
          </OrbitText>
          <Stack desktop={{ spacing: "natural", direction: "row", align: "end" }}>
            <Button
              type="facebook"
              block
              bordered
              icon={<FacebookIcon />}
              onClick={onFacebookLogin}
            >
              <Text t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
            </Button>
            <Button type="google" block bordered icon={<GoogleIcon />} onClick={onGoogleLogin}>
              <Text t={__("account.log_in_with")} values={{ provider: "Google" }} />
            </Button>
          </Stack>
        </Section>
      </Wrapper>
    )}
  </Consumer>
);

export default AccountLogin;
