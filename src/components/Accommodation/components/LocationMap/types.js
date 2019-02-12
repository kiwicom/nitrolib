// @flow

export type Location = {|
  center: {|
    +latitude: number,
    +longitude: number,
  |},
  label: string,
  zoom: number,
  desktopWidth: number,
|};
