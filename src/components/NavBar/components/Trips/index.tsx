import * as React from "react";
import styled, { css } from "styled-components";
import Passenger from "@kiwicom/orbit-components/lib/icons/Passenger";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import { Environment } from "@kiwicom/relay";

import Button from "../Button";
import ClickOutside from "../../../ClickOutside";
import Desktop from "../../../Desktop";
import Mobile from "../../../Mobile";
import Translate from "../../../Translate";
import { Auth } from "../../../../records/Auth";
import { themeDefault } from "../../../../records/Theme";
import { ThemeProps } from "../../../../records/Theme";
import Toggle from "../../../Toggle";
import TripDataList from "./components/TripDataList";
import SingleTripData from "./components/SingleTripData";
import userType from "./services/userType";

type Props = {
  auth: Auth,
  env: Environment,
  inverted: boolean,
  onSelect: (bid: string) => void,
};

const UserName = styled.div`
  max-width: 65px;
  display: inline;
  overflow: hidden;
  direction: ltr;
  text-overflow: ellipsis;
`;

const UserWrapper = styled.div`
  display: none;

  ${mq.mediumMobile(css`
    display: flex;
    padding-${/* sc-custom "left" */ left}: 5px;
    font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightNormal};
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLightActive};
  `)};
`;

UserWrapper.defaultProps = {
  theme: themeDefault,
};

const HideOnLower = styled.div`
  display: none;
  ${mq.tablet(css`
    display: block;
    margin-${/* sc-custom "left" */ left}: ${({ theme }: ThemeProps) => theme.orbit.spaceXXSmall};
  `)}
`;

HideOnLower.defaultProps = {
  theme: themeDefault,
};

const Trips = ({ auth, env, onSelect, inverted }: Props) => (
  <Toggle>
    {({ open, onToggle }) => (
      <div>
        {open && (
          <ClickOutside
            onClickOutside={ev => {
              ev.stopPropagation();
              onToggle();
            }}
          >
            {auth.type === "token" ? (
              <SingleTripData env={env} singleBid={auth.bid} onSelect={onSelect} />
            ) : (
              <TripDataList env={env} onSelect={onSelect} />
            )}
          </ClickOutside>
        )}
        <Desktop display="flex">
          <Stack align="center" spacing="none">
            <Passenger size="small" />
            <Button onClick={onToggle} color={inverted ? "white" : "secondary"}>
              <HideOnLower>
                <Translate t="account.my_bookings_action" />
              </HideOnLower>
              <UserWrapper>
                <span>(</span>
                <UserName>{`${userType(auth)}...`}</UserName>
                <span>)</span>
              </UserWrapper>
            </Button>
          </Stack>
        </Desktop>
        <Mobile display="flex">
          <Button onClick={onToggle} color={inverted ? "white" : "secondary"}>
            <Passenger size="small" />
            <UserWrapper>
              <UserName>{userType(auth)}</UserName>
            </UserWrapper>
          </Button>
        </Mobile>
      </div>
    )}
  </Toggle>
);

export default Trips;
