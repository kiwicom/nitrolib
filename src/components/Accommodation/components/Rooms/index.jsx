// @flow

import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Heading from "@kiwicom/orbit-components/lib/Heading";
// For DummRoomComponent
import AccommodationIcon from "@kiwicom/orbit-components/lib/icons/Accommodation";
// End For DummRoomComponent

import type { Room as RoomType } from "./types";
import Translate from "../../../Translate";

const DummyRoom = ({ id }: { id: string }) => (
  <>
    <AccommodationIcon color="primary" />
    <Heading element="h5" type="title4">
      <Translate t="holidays.accommodation.room_x" values={{ id }} />
    </Heading>
  </>
);

type Props = {|
  rooms: ?(RoomType[]),
|};

const RoomsList = styled.div`
  ${mq.largeMobile(css`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -${({ theme }) => theme.orbit.spaceMedium};
  `)};
`;

const RoomWrapper = styled.div`
  flex-basis: calc(50% - 12px);
  margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};
  :last-child {
    margin-bottom: 0;
  }

  :nth-child(odd) {
    margin-right: ${({ theme }) => theme.orbit.spaceLarge};
  }

  ${mq.largeMobile(css`
    :last-child {
      margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};
    }
  `)};
`;

const Rooms = ({ rooms }: Props) => (
  <>
    <Heading element="h4" type="title3" spaceAfter="medium">
      <Translate t="holidays.accommodation.rooms" />
    </Heading>
    {rooms && (
      <RoomsList>
        {rooms.map(({ id }: RoomType) => (
          <RoomWrapper key={id}>
            <DummyRoom id={id} />
          </RoomWrapper>
        ))}
      </RoomsList>
    )}
  </>
);

export default Rooms;
