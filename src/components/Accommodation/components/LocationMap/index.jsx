// @flow
/* eslint-disable react/destructuring-assignment */

import * as React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import Pin from "./components/Pin";
import type { LocationType } from "../../records/LocationMap";

const MAPXBOX_TOKEN =
  "pk.eyJ1IjoibWljaGFlbGtpd2kiLCJhIjoiY2l3aHRiN2ZqMDAycjJ6cXduNDU5djkweCJ9.XuamwcGDtyovJEMaSWtFkg";

type Props = LocationType;

type Viewport = {|
  latitude: number,
  longitude: number,
  zoom: number,
  width: number,
|};

type State = {
  viewport: Viewport,
};

class LocationMap extends React.Component<Props, State> {
  static defaultProps = {
    zoom: 10,
  };

  state = {
    viewport: {
      latitude: this.props.center.latitude,
      longitude: this.props.center.longitude,
      zoom: this.props.zoom,
      width: this.props.desktopWidth,
    },
  };

  updateViewport = (viewport: Viewport) => {
    this.setState({ viewport });
  };

  render() {
    const { center, label } = this.props;
    const { viewport } = this.state;

    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v10"
        onViewportChange={this.updateViewport}
        height={434}
        mapboxApiAccessToken={MAPXBOX_TOKEN}
        {...viewport}
      >
        <Marker latitude={center.latitude} longitude={center.longitude}>
          <Pin>{label}</Pin>
        </Marker>
      </ReactMapGL>
    );
  }
}

export default LocationMap;
