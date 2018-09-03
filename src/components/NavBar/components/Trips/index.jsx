// @flow
import * as React from "react";
import idx from "idx";
import styled, { css } from "styled-components";
import Passenger from "@kiwicom/orbit-components/lib/icons/Passenger";

import mq from "../../../../styles/mediaQuery";
import Button from "../../primitives/Button";
import ClickOutside from "../../../ClickOutside";
import Text from "../../../Text";
import type { ThemeProps } from "../../../../records/Theme";
import Toggle from "../../../Toggle";
import TripDataList from "./components/TripDataList";
import MenuSpacings from "../../primitives/MenuSpacings";

type UserData = {|
  firstname: string,
  lastname: string,
  verified: boolean,
  id: string,
  email: string,
|};

type Props = {|
  user?: UserData,
|};

const UserStyle = styled.div`
  direction: ltr;
  max-width: 65px;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  padding-left: 5px;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLightActive};
`;

const Desktop = styled.div`
  display: none;

  ${mq.gtTablet(css`
    display: flex;
  `)};
`;

const Mobile = styled.div`
  display: flex;

  ${mq.gtTablet(css`
    display: none;
  `)};
`;

const Trips = ({ user }: Props) => (
  <Toggle>
    {({ open, onToggle }) => (
      <>
        {open && (
          <ClickOutside onClickOutside={onToggle}>
            <TripDataList />
          </ClickOutside>
        )}
        <MenuSpacings>
          <Desktop>
            <Passenger size="small" />
            <Button
              fontSize="12px"
              marginLeft={3}
              marginRight={3}
              onClick={onToggle}
              direction="row"
              y="center"
            >
              <Text t={__("account.my_bookings_action")} />
            </Button>
            <UserStyle>({`${idx(user, _ => _.firstname) || " "}...`})</UserStyle>
          </Desktop>
          <Mobile>
            <Button fontSize="12px" marginRight={3} onClick={onToggle} y="center" direction="row">
              <Passenger size="small" />
              <UserStyle>
                {`${idx(user, _ => _.firstname) || " "} ${idx(user, _ => _.lastname) || " "}`}
              </UserStyle>
            </Button>
          </Mobile>
        </MenuSpacings>
      </>
    )}
  </Toggle>
);

export default Trips;
