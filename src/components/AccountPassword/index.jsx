// @flow strict
import * as React from "react";
import styled from "styled-components";
import OrbitText from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Edit from "@kiwicom/orbit-components/lib/icons/Edit";

import Flex from "../../primitives/Flex";
import { Consumer } from "../../services/intl/context";
import Text from "../Text";
import type { ThemeProps } from "../../records/Theme";

const SpacingXSmall = styled.div`
  margin-bottom: 8px;
`;

const SpacingMedium = styled.div`
  margin-bottom: 16px;
`;

const Ruler = styled.div`
  width: 100%;
  height: 1px;
  background: red;
  margin-top: 24px;
  margin-bottom: 24px;
  background-color: ${({ theme }: ThemeProps) => theme.orbit.backgroundSeparator};
`;

type Props = {|
  email: string,
  password: string,
  onChangeEmail: (ev: SyntheticEvent<HTMLLinkElement>) => void,
  onAskSignInLink: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onPasswordChange: (ev: SyntheticEvent<HTMLInputElement>) => void,
  onSignIn: (ev: SyntheticEvent<HTMLButtonElement>) => void,
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
      <React.Fragment>
        <Illustration name="Login" size="small" />
        <SpacingXSmall>
          <Heading element="h2">
            <Text t={__("account.manage_your_bookings")} />
          </Heading>
        </SpacingXSmall>
        <OrbitText weight="bold">
          <Text t={__("account.sign_in_description")} />
        </OrbitText>
        <Ruler />
        <SpacingMedium>
          <OrbitText>
            <Text t={__("account.email")} />
          </OrbitText>
          <OrbitText weight="bold">
            {email}
            <TextLink type="primary" onClick={onChangeEmail}>
              <Edit size="small" />
            </TextLink>
          </OrbitText>
        </SpacingMedium>
        <Flex y="flex-end">
          <span style={{ flexGrow: 1, marginRight: "8px" }}>
            <InputField
              label={intl.translate(__("account.password"))}
              type="password"
              onChange={onPasswordChange}
              value={password}
            />
          </span>
          <Button onClick={onSignIn}>
            <Text t={__("account.sign_in")} />
          </Button>
        </Flex>

        <Ruler />
        <SpacingXSmall>
          <OrbitText>
            <Text t={__("account.send_link_to")} values={{ email }} />
          </OrbitText>
        </SpacingXSmall>
        <Button type="secondary" onClick={onAskSignInLink}>
          <Text t={__("account.ask_sign_in_link")} />
        </Button>
      </React.Fragment>
    )}
  </Consumer>
);

export default AccountPassword;
