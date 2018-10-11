// @flow strict
import * as React from "react";
import styled from "styled-components";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import FacebookIcon from "@kiwicom/orbit-components/lib/icons/Facebook";
import GoogleIcon from "@kiwicom/orbit-components/lib/icons/Google";
import ChevronLeft from "@kiwicom/orbit-components/lib/icons/ChevronLeft";

import Flex from "../../primitives/Flex";
import Text from "../Text";
import type { ThemeProps } from "../../records/Theme";

const SpacingXSmall = styled.div`
  margin-bottom: 8px;
`;

const SpacingMedium = styled.div`
  margin-bottom: 16px;
`;

const SpacingBig = styled.div`
  margin-bottom: 32px;
`;

const Rectangle = styled.div`
  border-top: 1px solid ${({ theme }: ThemeProps) => theme.orbit.backgroundSeparator};
  width: 100%;
  height: 128px;
  background-color: ${({ theme }: ThemeProps) => theme.orbit.backgroundBody};
  padding-top: 24px;
  padding-bottom: 24px;
  margin-top: 50px;
  margin-bottom: 16px;
`;

type Props = {|
  onBack: (ev: SyntheticEvent<HTMLDivElement> | SyntheticEvent<HTMLButtonElement>) => void,
  onRegister: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onFacebookLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onGoogleLogin: (ev: SyntheticEvent<HTMLButtonElement>) => void,
|};

const AccountNoAccount = ({ onBack, onRegister, onFacebookLogin, onGoogleLogin }: Props) => (
  <React.Fragment>
    <Illustration name="NoBookings" size="small" />
    <SpacingXSmall>
      <Heading element="h2">
        <Text t={__("account.no_bookings_or_account")} />
      </Heading>
    </SpacingXSmall>
    <SpacingBig>
      <OrbitText>
        <Text t={__("account.no_bookings_or_account_description")} />
      </OrbitText>
    </SpacingBig>
    <SpacingMedium>
      <Button onClick={onRegister}>
        <Text t={__("account.register")} />
      </Button>
    </SpacingMedium>
    <SpacingMedium>
      <ButtonLink type="secondary" iconLeft={<ChevronLeft />} onClick={onBack}>
        <Text t={__("account.back")} />
      </ButtonLink>
    </SpacingMedium>
    <Rectangle>
      <OrbitText weight="bold">
        <Text t={__("account.or_social_account")} />
      </OrbitText>
      <Flex>
        <span style={{ flexGrow: 1, marginRight: "4px" }}>
          <Button type="facebook" block bordered icon={<FacebookIcon />} onClick={onFacebookLogin}>
            <Text t={__("account.log_in_with")} values={{ provider: "Facebook" }} />
          </Button>
        </span>
        <span style={{ flexGrow: 1, marginLeft: "4px" }}>
          <Button type="google" block bordered icon={<GoogleIcon />} onClick={onGoogleLogin}>
            <Text t={__("account.log_in_with")} values={{ provider: "Google" }} />
          </Button>
        </span>
      </Flex>
    </Rectangle>
  </React.Fragment>
);

export default AccountNoAccount;
