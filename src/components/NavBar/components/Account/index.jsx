// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import styled from "styled-components";

import type { Auth } from "../../../../records/Auth";
import ButtonLink from "../../primitives/ButtonLink";
import Text from "../../../Text";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import { useIntl } from "../../../../services/intl/context";
import LoginButton from "../LoginButton";

type Props = {|
  auth: Auth,
  inverted: boolean,
|};

const UserPhoto = styled.img`
  width: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  height: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusCircle};
`;

UserPhoto.defaultProps = {
  theme: themeDefault,
};

const Account = ({ inverted, auth }: Props) => {
  const intl = useIntl();

  return (
    <Stack inline align="center" grow={false} spacing="condensed">
      {auth.type === "user" && auth.user.photo ? (
        <>
          <UserPhoto src={auth.user.photo} />
          <ButtonLink
            href={`/${intl.language.id}/account`}
            color={inverted ? "white" : "secondary"}
          >
            <Text t="account.logged_in" size="small" />
          </ButtonLink>
        </>
      ) : (
        <>
          <ButtonLink
            href={`/${intl.language.id}/account`}
            color={inverted ? "white" : "secondary"}
          >
            <LoginButton>
              <Text t="account.logged_in" size="small" />
            </LoginButton>
          </ButtonLink>
        </>
      )}
    </Stack>
  );
};

export default Account;
