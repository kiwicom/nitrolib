// @flow strict

import * as React from "react";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Heading from "@kiwicom/orbit-components/lib/Heading";

import SingleRoom from "./SingleRoom";
import Translate from "../Translate";
import { themeDefault } from "../../records/Theme";
import type { RoomType } from "../../records/Room";

export type Props = {|
  rooms: Array<RoomType>,
|};

const RoomsList = styled.div`
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

RoomWrapper.defaultProps = {
  theme: themeDefault,
};

const Rooms = ({ rooms }: Props) => (
  <>
    <Heading element="h4" type="title3" spaceAfter="medium">
      <Translate t="holidays.accommodation.rooms" />
    </Heading>
    {rooms && (
      <RoomsList>
        {rooms.map(room => (
          <RoomWrapper key={room.id}>
            <SingleRoom {...room} />
          </RoomWrapper>
        ))}
      </RoomsList>
    )}
  </>
);

export default Rooms;
