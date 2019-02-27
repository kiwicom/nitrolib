// @flow strict

import * as React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import Pin from "./components/Pin";
import type { LocationType } from "../../records/LocationMap";

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

  constructor(props: Props) {
    super(props);
    const { center, zoom, desktopWidth } = props;

    this.state = {
      viewport: { zoom, width: desktopWidth, ...center },
    };
  }

  updateViewport = (viewport: Viewport) => {
    this.setState({ viewport });
  };

  render() {
    const { center, label, mapboxToken } = this.props;
    const { viewport } = this.state;

    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v10"
        onViewportChange={this.updateViewport}
        height={434}
        mapboxApiAccessToken={mapboxToken}
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
