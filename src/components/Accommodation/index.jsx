// @flow

import * as React from "react";
import styled, { css } from "styled-components";
import AccommodationIcon from "@kiwicom/orbit-components/lib/icons/Accommodation";
import Separator from "@kiwicom/orbit-components/lib/Separator";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import HotelInfo from "../HotelInfo";
import Rooms from "../Rooms";
import Header from "./components/Header";
import AccommodationModal from "./components/AccommodationModal";
import { themeDefault } from "../../records/Theme";
import type { LocationType } from "./records/LocationMap";
import type { RoomType } from "../Rooms";
import type { HotelType } from "../HotelInfo";
import type { ThemeProps } from "../../records/Theme";

export type Props = {|
  hotel: HotelType,
  rooms: Array<RoomType>,
  location: LocationType,
|};

type State = {
  isModalOpen: boolean,
};

const Wrapper = styled.div`
  margin-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceMedium};
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge}
    ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  border-width: ${({ theme }: ThemeProps) => theme.orbit.borderWidthCard};
  border-style: ${({ theme }: ThemeProps) => theme.orbit.borderStyleCard};
  border-color: ${({ theme }: ThemeProps) => theme.orbit.borderColorCard};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowElevatedLevel1};

  ${mq.tablet(css`
    padding: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  `)};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

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
  margin-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceMedium};
  overflow: hidden;

  ${mq.largeMobile(css`
    flex-basis: 160px;
    flex-shrink: 0;
    height: 162px;
    margin-right: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  `)};
`;

Photo.defaultProps = {
  theme: themeDefault,
};

const Img = styled.img`
  width: 100%;

  ${mq.largeMobile(css`
    height: 100%;
    width: auto;
  `)};
`;

export default class Accommodation extends React.Component<Props, State> {
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
            <Img src={hotel.photoUrl} alt="hotel" />
          </Photo>
          <div>
            <HotelInfo hotel={hotel} onShownOnMapClick={this.openAccommodationModal} />
            <Separator />
            <Rooms rooms={rooms} />
          </div>
        </ContentWrapper>
        {isModalOpen && (
          <AccommodationModal
            address={hotel.address}
            location={location}
            onClose={this.closeAccommodationModal}
          />
        )}
      </Wrapper>
    );
  }
}
