// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import Passenger from "@kiwicom/orbit-components/lib/icons/Passenger";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Mobile from "@kiwicom/orbit-components/lib/Mobile";
import Desktop from "@kiwicom/orbit-components/lib/Desktop";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import useOnClickOutside from "@kiwicom/orbit-components/lib/hooks/useClickOutside";

import Translate from "../../../Translate";
import type { Auth } from "../../../../records/Auth";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import TripDataList from "./components/TripDataList";
import SingleTripData from "./components/SingleTripData";
import userType from "./services/userType";

type Props = {|
  auth: Auth,
  onSelect: (bid: string) => void,
|};

const UserName = styled.div`
  max-width: 60px;
  display: block;
  overflow: hidden;
  direction: ltr;
  text-overflow: ellipsis;
`;

const TextWrapper = styled.div`
  white-space: nowrap;
`;

const UserWrapper = styled.div`
  display: none;

  ${mq.mediumMobile(css`
    display: flex;
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

const Trips = ({ auth, onSelect }: Props) => {
  const node = React.useRef(null);
  const [isOpen, setOpen] = React.useState(false);

  useOnClickOutside(node, () => setOpen(false));

  return (
    <div ref={node}>
      {isOpen &&
        (auth.type === "token" ? (
          <SingleTripData singleBid={auth.bid} onSelect={onSelect} />
        ) : (
          <TripDataList onSelect={onSelect} />
        ))}

      <Desktop>
        <ButtonLink transparent onClick={() => setOpen(true)} type="secondary">
          <TextWrapper>
            <Stack inline align="center" spacing="condensed">
              <Translate html t="account.my_bookings_action" />
              <UserWrapper>
                <span>(</span>
                <UserName>{`${userType(auth)}...`}</UserName>
                <span>)</span>
              </UserWrapper>
            </Stack>
          </TextWrapper>
        </ButtonLink>
      </Desktop>
      <Mobile>
        <ButtonLink onClick={() => setOpen(true)} type="secondary" transparent>
          <TextWrapper>
            <Stack flex align="center" spacing="tight">
              <Passenger size="small" />
              <UserWrapper>
                <UserName>{userType(auth)}</UserName>
              </UserWrapper>
            </Stack>
          </TextWrapper>
        </ButtonLink>
      </Mobile>
    </div>
  );
};

export default Trips;
