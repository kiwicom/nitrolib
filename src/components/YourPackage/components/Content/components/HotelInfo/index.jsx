// @flow strict

import * as React from "react";
import styled from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import RatingStars from "@kiwicom/orbit-components/lib/RatingStars";
import Button from "@kiwicom/orbit-components/lib/Button";

import Room from "../Room";
import Translate from "../../../../../Translate";
import { type Hotel as HotelType } from "../../../../records/Hotel";
import { themeDefault } from "../../../../../../records/Theme";

type Props = {|
  hotel: HotelType,
  search?: boolean,
|};

const Header = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};
`;

Header.defaultProps = {
  theme: themeDefault,
};

const HeadingWrapper = styled.div`
  margin-right: ${({ theme }) => theme.orbit.spaceXSmall};
`;

HeadingWrapper.defaultProps = {
  theme: themeDefault,
};

const RoomWrapper = styled.div`
  :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.orbit.spaceSmall};
  }
`;

RoomWrapper.defaultProps = {
  theme: themeDefault,
};

function Hotel(props: Props) {
  const { hotel, search } = props;
  const { name, rating, rooms } = hotel;

  return (
    <>
      <Header>
        <HeadingWrapper>
          <Heading element="h4" type="title3">
            {name}
          </Heading>
        </HeadingWrapper>
        {!!rating && <RatingStars rating={rating} color="secondary" />}
      </Header>
      <Stack spaceAfter={search ? "large" : "medium"}>
        {rooms.map(room => (
          <RoomWrapper key={room.id}>
            <Room {...room} />
          </RoomWrapper>
        ))}
      </Stack>
      {search && (
        <Button block type="secondary">
          <Translate t="holidays.detail.show_rooms_button" />
        </Button>
      )}
    </>
  );
}
export default Hotel;
