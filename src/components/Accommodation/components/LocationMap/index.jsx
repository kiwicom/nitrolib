// @flow strict

import * as React from "react";
import styled from "styled-components";
import ReactMapGL, { Marker } from "react-map-gl";

import Pin from "./components/Pin";
import type { LocationType } from "../../records/LocationMap";

type Props = LocationType;

type Viewport = {|
  latitude: number,
  longitude: number,
  zoom?: number,
|};

type State = {
  viewport: Viewport,
};

const MapWrapper = styled.div``;

class LocationMap extends React.Component<Props, State> {
  static defaultProps = {
    zoom: 10,
  };

  constructor(props: Props) {
    super(props);
    const { longitude, latitude, zoom } = props;

    this.state = {
      viewport: {
        zoom,
        longitude,
        latitude,
      },
    };
  }

  updateViewport = (viewport: Viewport) => {
    this.setState({ viewport });
  };

  render() {
    const { longitude, latitude, hotelName, mapboxToken } = this.props;
    const { viewport } = this.state;

    return (
      <MapWrapper>
        <ReactMapGL
          mapStyle="mapbox://styles/mapbox/streets-v10"
          onViewportChange={this.updateViewport}
          mapboxApiAccessToken={mapboxToken}
          {...viewport}
          width="100%"
          height={434}
        >
          <Marker latitude={latitude} longitude={longitude}>
            <Pin>{hotelName}</Pin>
          </Marker>
        </ReactMapGL>
      </MapWrapper>
    );
  }
}

export default LocationMap;
