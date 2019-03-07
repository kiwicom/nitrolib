// @flow strict

import * as React from "react";
import styled from "styled-components";
import AccommodationIcon from "@kiwicom/orbit-components/lib/icons/Accommodation";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Text from "@kiwicom/orbit-components/lib/Text";

import Translate from "../../Translate";
import { themeDefault } from "../../../records/Theme";
import type { RoomType } from "../../../records/Room";

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
  theme: themeDefault,
};

const Description = styled.div`
  margin-top: ${({ theme }) => theme.orbit.spaceXXSmall};
`;

Description.defaultProps = {
  theme: themeDefault,
};

const SingleRoom = ({ id, roomType, occupancy, boardType }: RoomType) => (
  <>
    <HeadingWrapper>
      <AccommodationIcon color="primary" />
      <Heading element="h5" type="title4">
        <Translate t="holidays.accommodation.room_x" values={{ id }} />
      </Heading>
    </HeadingWrapper>
    <Description>
      {roomType && <Text>{roomType}</Text>}
      {occupancy && <Text>{occupancy}</Text>}
      {boardType && <Text>{boardType}</Text>}
    </Description>
  </>
);

export default SingleRoom;
