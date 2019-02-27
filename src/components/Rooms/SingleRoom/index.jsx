// @flow strict

import * as React from "react";
import styled from "styled-components";
import AccommodationIcon from "@kiwicom/orbit-components/lib/icons/Accommodation";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Text from "@kiwicom/orbit-components/lib/Text";

import Translate from "../../Translate";
import { themeDefault } from "../../../records/Theme";

export type RoomType = {
  id: string,
  description: string,
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
  theme: themeDefault,
};

const Description = styled.div`
  margin-top: ${({ theme }) => theme.orbit.spaceXXSmall};
`;

Description.defaultProps = {
  theme: themeDefault,
};

const SingleRoom = ({ id, description }: RoomType) => (
  <>
    <HeadingWrapper>
      <AccommodationIcon color="primary" />
      <Heading element="h5" type="title4">
        <Translate t="holidays.accommodation.room_x" values={{ id }} />
      </Heading>
    </HeadingWrapper>
    <Description>
      {description.split(";").map(d => (
        <Text key={d}>{d}</Text>
      ))}
    </Description>
  </>
);

export default SingleRoom;
