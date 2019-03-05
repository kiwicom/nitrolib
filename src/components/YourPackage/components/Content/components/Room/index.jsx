// @flow strict

import * as React from "react";
import styled from "styled-components";
import AccommodationIcon from "@kiwicom/orbit-components/lib/icons/Accommodation";
import Heading from "@kiwicom/orbit-components/lib/Heading";

import Translate from "../../../../../Translate";
import Text from "../../../../../Text";
import { type Room as RoomType } from "../../../../records/Room";
import { themeDefault } from "../../../../../../records/Theme";

const RoomName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.orbit.spaceXSmall};
`;

RoomName.defaultProps = {
  theme: themeDefault,
};

const RoomHeading = styled.div`
  margin-left: ${({ theme }) => theme.orbit.spaceSmall};
`;

RoomHeading.defaultProps = {
  theme: themeDefault,
};

const Facilities = styled.div`
  display: flex;
  flex-direction: column;
`;

Facilities.defaultProps = {
  theme: themeDefault,
};

type Props = RoomType;

const Room = ({ id, description }: Props) => (
  <>
    <RoomName>
      <AccommodationIcon color="primary" />
      <RoomHeading>
        <Heading element="h5" type="title4">
          <Translate t="holidays.accommodation.room_x" values={{ id }} />
        </Heading>
      </RoomHeading>
    </RoomName>
    <Facilities>
      {description.split(";").map(facility => (
        <Text key={facility} t={facility} />
      ))}
    </Facilities>
  </>
);

export default Room;
