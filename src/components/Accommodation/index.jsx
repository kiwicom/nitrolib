// @flow

import * as React from "react";
import styled, { css } from "styled-components";
import AccommodationIcon from "@kiwicom/orbit-components/lib/icons/Accommodation";
import Separator from "@kiwicom/orbit-components/lib/Separator";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import HotelInfo from "./components/HotelInfo";
import Rooms from "./components/Rooms";
import Header from "./components/Header";
import AccommodationModal from "./components/AccommodationModal";
import type { Location as LocationType } from "./components/LocationMap/types";
import type { Room as RoomType } from "./components/Rooms/types";

export type Props = {|
  +hotel: ?{|
    +name: ?string,
    +photoUrl: ?string,
    +address: ?{|
      +fullAddress: ?string,
    |},
    +rating: ?number,
  |},
  rooms: Array<RoomType>,
  location: LocationType,
|};

type State = {
  isModalOpen: boolean,
};

const Wrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};
  padding: ${({ theme }) => theme.orbit.spaceLarge} ${({ theme }) => theme.orbit.spaceSmall};
  background: ${({ theme }) => theme.orbit.paletteWhite};
  border-width: ${({ theme }) => theme.orbit.borderWidthCard};
  border-style: ${({ theme }) => theme.orbit.borderStyleCard};
  border-color: ${({ theme }) => theme.orbit.borderColorCard};
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal};
  box-shadow: ${({ theme }) => theme.orbit.boxShadowElevatedLevel1};

  ${mq.tablet(css`
    padding: ${({ theme }) => theme.orbit.spaceLarge};
  `)};
`;

const ContentWrapper = styled.div`
  ${mq.largeMobile(css`
    display: flex;
  `)};
`;

const Photo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};
  overflow: hidden;

  ${mq.largeMobile(css`
    flex-basis: 160px;
    flex-shrink: 0;
    height: 162px;
    margin-right: ${({ theme }) => theme.orbit.spaceLarge};
  `)};
`;

const Img = styled.img`
  width: 100%;

  ${mq.largeMobile(css`
    height: 100%;
    width: auto;
  `)};
`;

class Accommodation extends React.Component<Props, State> {
  state = {
    isModalOpen: false,
  };

  openAccommodationModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeAccommodationModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { hotel, rooms, location } = this.props;
    const { isModalOpen } = this.state;
    return (
      <Wrapper>
        <Header icon={<AccommodationIcon />} t="holidays.accommodation.title" />
        <ContentWrapper>
          <Photo>
            <Img src={hotel?.photoUrl} alt="hotel" />
          </Photo>
          <div>
            <HotelInfo
              name={hotel?.name}
              rating={hotel?.rating}
              address={hotel?.address}
              onShownOnMapClick={this.openAccommodationModal}
            />
            <Separator />
            <Rooms rooms={rooms} />
          </div>
        </ContentWrapper>
        {isModalOpen && (
          <AccommodationModal
            address={hotel?.address}
            location={location}
            onClose={this.closeAccommodationModal}
          />
        )}
      </Wrapper>
    );
  }
}

export default Accommodation;
