// @flow

import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Text from "@kiwicom/orbit-components/lib/Text";
import Translate from "../Translate";
// For DummRoomComponent
import AccommodationIcon from "@kiwicom/orbit-components/lib/icons/Accommodation";
// End For DummRoomComponent
import { themeDefault } from "../../records/Theme";

// import type { RoomType } from "./types";

export const DummyRoom = ({
  id,
  description
}: {
  id: string,
  description: string
}) => (
  <>
    <HeadingWrapper>
      <AccommodationIcon color="primary" />
      <Heading element="h5" type="title4">
        <Translate t="holidays.accommodation.room_x" values={{ id }} />
      </Heading>
    </HeadingWrapper>
    <Description>
      {description.split(";").map((d, index) => (
        <Text key={index}>{d}</Text>
      ))}
    </Description>
  </>
);

export type RoomType = {|
  +id: string,
  +description: string
|};

export type Props = {|
  rooms: ?(RoomType[])
|};

const RoomsList = styled.div`
  ${mq.largeMobile(css`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -${({ theme }) => theme.orbit.spaceMedium};
  `)};
`;

RoomsList.defaultProps = {
  theme: themeDefault
};

const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - 12px);
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};
  flex-wrap: wrap;
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

RoomWrapper.defaultProps = {
  theme: themeDefault
};

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;

  > * {
    :last-child {
      margin-left: ${({ theme }) => theme.orbit.spaceXXSmall};
    }
  }
`;

HeadingWrapper.defaultProps = {
  theme: themeDefault
};

const Description = styled.div`
  margin-top: ${({ theme }) => theme.orbit.spaceXXSmall};
`;

Description.defaultProps = {
  theme: themeDefault
};

const Rooms = ({ rooms }: Props) => (
  <>
    <Heading element="h4" type="title3" spaceAfter="medium">
      <Translate t="holidays.accommodation.rooms" />
    </Heading>
    {rooms && (
      <RoomsList>
        {rooms.map(({ id, description }: RoomType) => (
          <RoomWrapper key={id}>
            <DummyRoom description={description} id={id} />
          </RoomWrapper>
        ))}
      </RoomsList>
    )}
  </>
);

export default Rooms;
