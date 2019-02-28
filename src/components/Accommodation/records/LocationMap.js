// @flow strict

export type LocationType = {|
  center: {|
    latitude: number,
    longitude: number,
  |},
  label: string,
  zoom: number,
  desktopWidth: number,
  mapboxToken: string,
|};
