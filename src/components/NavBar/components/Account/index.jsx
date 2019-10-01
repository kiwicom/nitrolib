// @flow strict
import * as React from "react";
import styled from "styled-components";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";

import type { Auth } from "../../../../records/Auth";
import Text from "../../../Text";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import { useIntl } from "../../../../services/intl/context";
import LoginButton from "../LoginButton";

type Props = {|
  auth: Auth,
|};

const UserPhoto = styled.img`
  width: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  height: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusCircle};
`;

UserPhoto.defaultProps = {
  theme: themeDefault,
};

const Account = ({ auth }: Props) => {
  const intl = useIntl();

  return (
    <>
      {auth.type === "user" && auth.user.photo ? (
        <>
          <ButtonLink
            iconLeft={<UserPhoto src={auth.user.photo} />}
            href={`/${intl.language.id}/account`}
            type="secondary"
          >
            <Text t="account.logged_in" weight="bold" />
          </ButtonLink>
        </>
      ) : (
        <>
          <ButtonLink href={`/${intl.language.id}/account`} type="secondary">
            <LoginButton>
              <Text t="account.logged_in" weight="bold" />
            </LoginButton>
          </ButtonLink>
        </>
      )}
    </>
  );
};

export default Account;
