// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import type { Environment } from "react-relay";
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
import Flex from "../../../../primitives/Flex";
import mq from "../../../../styles/mq";

type Props = {|
  auth: Auth,
  env: Environment,
  onSelect: (bid: string) => void,
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
  ${mq.ltMiddleMobile(css`
    display: none;
  `)};
`;

const HideOnLower = styled.div`
  display: block;
  @media (max-width: 975px) {
    display: none;
  }
`;

const Trips = ({ auth, env, onSelect }: Props) => (
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
            <TripDataList env={env} onSelect={onSelect} />
          </ClickOutside>
        )}
        <Desktop display="flex">
          <Flex y="center">
            <Passenger size="small" />
            <Button onClick={onToggle}>
              <HideOnLower>
                <Text t={__("account.my_bookings_action")} />
              </HideOnLower>
              <UserStyle>({`${auth.user.firstname}...`})</UserStyle>
            </Button>
          </Flex>
        </Desktop>
        <Mobile display="flex">
          <Button onClick={onToggle} y="center">
            <Passenger size="small" />
            <UserStyle>{`${auth.user.firstname} ${auth.user.lastname}`}</UserStyle>
          </Button>
        </Mobile>
      </div>
    )}
  </Toggle>
);

export default Trips;
