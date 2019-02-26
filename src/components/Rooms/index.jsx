// @flow strict

import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Text from "@kiwicom/orbit-components/lib/Text";
import AccommodationIcon from "@kiwicom/orbit-components/lib/icons/Accommodation";

import Translate from "../Translate";
import { themeDefault } from "../../records/Theme";

export const DummyRoom = ({ id, description }: { id: string, description: string }) => (
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

export type RoomType = {|
  +id: string,
  +description: string,
|};

export type Props = {|
  rooms: Array<RoomType>,
|};

const RoomsList = styled.div`
  display: flex;
  flex-direction: column;
  ${mq.largeMobile(css`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -${({ theme }) => theme.orbit.spaceMedium};
  `)};
`;

RoomsList.defaultProps = {
  theme: themeDefault,
};

const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};
  flex-wrap: wrap;
  :last-child {
    margin-bottom: 0;
  }

  ${mq.largeMobile(css`
    :last-child {
      margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};
    }
  `)};
`;

RoomWrapper.defaultProps = {
  theme: themeDefault,
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

const Rooms = ({ rooms }: Props) => (
  <>
    <Heading element="h4" type="title3" spaceAfter="medium">
      <Translate t="holidays.accommodation.rooms" />
    </Heading>
    {rooms && (
      <RoomsList>
        {rooms.map(({ id, description }) => (
          <RoomWrapper key={id}>
            <DummyRoom description={description} id={id} />
          </RoomWrapper>
        ))}
      </RoomsList>
    )}
  </>
);

export default Rooms;
