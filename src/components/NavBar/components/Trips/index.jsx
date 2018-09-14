// @flow
import * as React from "react";
import styled from "styled-components";
import Passenger from "@kiwicom/orbit-components/lib/icons/Passenger";

import Button from "../../primitives/Button";
import ClickOutside from "../../../ClickOutside";
import Desktop from "../../../Desktop";
import Mobile from "../../../Mobile";
import Text from "../../../Text";
import type { Auth } from "../../../../records/Auth";
import type { ThemeProps } from "../../../../records/Theme";
import Toggle from "../../../Toggle";
import TripDataList from "./components/TripDataList";
import MenuSpacings from "../../primitives/MenuSpacings";
import Flex from "../../../../primitives/Flex";

type Props = {|
  auth: Auth,
|};

const UserStyle = styled.div`
  direction: ltr;
  max-width: 65px;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightNormal};
  padding-left: 5px;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLightActive};
`;

const Trips = ({ auth }: Props) => (
  <Toggle>
    {({ open, onToggle }) => (
      <>
        {open && (
          <ClickOutside onClickOutside={onToggle}>
            <TripDataList token={auth.token} />
          </ClickOutside>
        )}
        <MenuSpacings>
          <Desktop display="flex">
            <Flex y="center">
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
              <UserStyle>({`${auth.user.firstname}...`})</UserStyle>
            </Flex>
          </Desktop>
          <Mobile display="flex">
            <Button fontSize="12px" marginRight={3} onClick={onToggle} y="center" direction="row">
              <Passenger size="small" />
              <UserStyle>{`${auth.user.firstname} ${auth.user.lastname}`}</UserStyle>
            </Button>
          </Mobile>
        </MenuSpacings>
      </>
    )}
  </Toggle>
);

export default Trips;
