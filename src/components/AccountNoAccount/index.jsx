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

import Translate from "../Translate";

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
    <Header>
      <Illustration name="NoBookings" size="small" />
      <Heading element="h2">
        <Translate t={__("account.no_bookings_or_account")} />
      </Heading>
      <OrbitText>
        <Translate t={__("account.no_bookings_or_account_description")} />
      </OrbitText>
    </Header>
    <Section>
      <Stack desktop={{ spacing: "natural" }}>
        <Button onClick={onRegister}>
          <Translate t={__("account.register")} />
        </Button>
        <Align>
          <ButtonLink type="secondary" iconLeft={<ChevronLeft />} onClick={onBack}>
            <Translate t={__("account.back")} />
          </ButtonLink>
        </Align>
      </Stack>
    </Section>
    <Section suppressed>
      <OrbitText weight="bold" spaceAfter="medium">
        <Translate t={__("account.or_social_account")} />
      </OrbitText>
      <Stack desktop={{ spacing: "natural", direction: "row" }}>
        <Button type="facebook" block bordered icon={<FacebookIcon />} onClick={onFacebookLogin}>
          <Translate t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
        </Button>
        <Button type="google" block bordered icon={<GoogleIcon />} onClick={onGoogleLogin}>
          <Translate t={__("account.log_in_with")} values={{ provider: "Google" }} />
        </Button>
      </Stack>
    </Section>
  </>
);

export default AccountNoAccount;
