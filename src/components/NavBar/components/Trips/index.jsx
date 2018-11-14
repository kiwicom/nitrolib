// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import type { Environment } from "react-relay";
import Passenger from "@kiwicom/orbit-components/lib/icons/Passenger";

import Button from "../../primitives/Button";
import ClickOutside from "../../../ClickOutside";
import Desktop from "../../../Desktop";
import Mobile from "../../../Mobile";
import Translate from "../../../Translate";
import type { Auth } from "../../../../records/Auth";
import { themeDefault } from "../../../../records/Theme";
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

const UserName = styled.div`
  max-width: 65px;
  display: inline;
  overflow: hidden;
  direction: ltr;
  text-overflow: ellipsis;
`;

const UserWrapper = styled.div`
  display: flex;
  padding-left: 5px;
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightNormal};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLightActive};
  ${mq.ltMiddleMobile(css`
    display: none;
  `)};
`;

UserWrapper.defaultProps = {
  theme: themeDefault,
};

const HideOnLower = styled.div`
  display: block;
  margin-left: ${({ theme }) => theme.orbit.spaceXXSmall};
  @media (max-width: 975px) {
    display: none;
  }
`;

HideOnLower.defaultProps = {
  theme: themeDefault,
};

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
            <Button onClick={onToggle} color="secondary">
              <HideOnLower>
                <Translate t={__("account.my_bookings_action")} />
              </HideOnLower>
              <UserWrapper>
                <span>(</span>
                <UserName>{`${auth.user.firstname}...`}</UserName>
                <span>)</span>
              </UserWrapper>
            </Button>
          </Flex>
        </Desktop>
        <Mobile display="flex">
          <Button onClick={onToggle} y="center" color="secondary">
            <Passenger size="small" />
            <UserWrapper>
              <UserName>{`${auth.user.firstname} ${auth.user.lastname}`}</UserName>
            </UserWrapper>
          </Button>
        </Mobile>
      </div>
    )}
  </Toggle>
);

export default Trips;
