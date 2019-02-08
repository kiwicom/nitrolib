// @flow

import * as React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Button from '@kiwicom/orbit-components/lib/Button';
import styled from 'styled-components';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import Translate from '@kiwicom/nitro/lib/components/Translate';
import RatingStars from '@kiwicom/orbit-components/lib/RatingStars';
import animateScrollTo from 'animated-scroll-to';

import Room from '../Room';
import { MediaContext } from '../media/MediaStore';
import type { Hotel as HotelType } from './__generated__/Hotel.graphql';

type Props = {|
  data: HotelType,
  checkout: boolean,
|};

const Header = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};
`;

const HeadingWrapper = styled.div`
  margin-right: ${({ theme }) => theme.orbit.spaceXSmall};
`;

const RoomWrapper = styled.div`
  :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.orbit.spaceSmall};
  }
`;

class Hotel extends React.Component<Props> {
  static contextType = MediaContext;

  scrollToSelectYourRoom = () => {
    animateScrollTo(document.getElementById('select-your-room'), {
      offset: this.context.isMobile ? -20 : -70,
    });
  };

  render() {
    const { data, checkout } = this.props;
    const { name, rating, rooms } = data;
    return (
      <>
        <Header>
          <HeadingWrapper>
            <Heading element="h4" type="title3">
              {name}
            </Heading>
          </HeadingWrapper>
          {rating && <RatingStars rating={rating} color="secondary" />}
        </Header>
        <Stack spaceAfter={checkout ? 'large' : 'medium'}>
          {rooms.map((room, index) => (
            <RoomWrapper key={room.id}>
              <Room data={room} index={index + 1} />
            </RoomWrapper>
          ))}
        </Stack>
        {!checkout && (
          <Stack spaceAfter="large">
            <Button
              size="small"
              type="secondary"
              block
              onClick={this.scrollToSelectYourRoom}
            >
              <Translate t="holidays.detail.show_rooms_button" />
            </Button>
          </Stack>
        )}
      </>
    );
  }
}

export default createFragmentContainer(
  Hotel,
  graphql`
    fragment Hotel on HotelInfo {
      name
      rating
      rooms {
        id
        ...Room
      }
    }
  `,
);
