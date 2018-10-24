// @flow strict
import * as React from "react";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import ChevronLeft from "@kiwicom/orbit-components/lib/icons/ChevronLeft";
import Header from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import Section from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import styled from "styled-components";

import Text from "../Text";

// TODO: remove it after nitro update
const Align = styled.div`
  align-self: flex-start;
`;

type Props = {|
  onBack: (ev?: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLButtonElement>) => void,
  onRegister: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
  onGoogleLogin: (ev?: SyntheticEvent<HTMLButtonElement>) => void,
|};

const AccountNoAccount = ({ onBack, onRegister, onFacebookLogin, onGoogleLogin }: Props) => (
  <>
    <Illustration name="NoBookings" size="small" />
    <Header>
      <Heading element="h2">
        <Text t={__("account.no_bookings_or_account")} />
      </Heading>
      <OrbitText>
        <Text t={__("account.no_bookings_or_account_description")} />
      </OrbitText>
    </Header>
    <Section>
      <Stack desktop={{ spacing: "natural" }}>
        <Button onClick={onRegister}>
          <Text t={__("account.register")} />
        </Button>
        <Align>
          <ButtonLink type="secondary" iconLeft={<ChevronLeft />} onClick={onBack}>
            <Text t={__("account.back")} />
          </ButtonLink>
        </Align>
      </Stack>
    </Section>
    <Section suppressed>
      <OrbitText weight="bold" spaceAfter="medium">
        <Text t={__("account.or_social_account")} />
      </OrbitText>
      <Stack desktop={{ spacing: "natural", direction: "row" }}>
        <Button type="facebook" block bordered icon={<FacebookIcon />} onClick={onFacebookLogin}>
          <Text t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
        </Button>
        <Button type="google" block bordered icon={<GoogleIcon />} onClick={onGoogleLogin}>
          <Text t={__("account.log_in_with")} values={{ provider: "Google" }} />
        </Button>
      </Stack>
    </Section>
  </>
);

export default AccountNoAccount;
