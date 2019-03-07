// @flow strict

import type { RoomType } from "../../../records/Room";

export type AccommodationType = {|
  hotelName: string,
  rating: number,
  location: {|
    latitude: number,
    longitude: number,
  |},
  address: string,
  photoUrl: string,
  rooms: Array<RoomType>,
  mapboxToken: string,
  zoom?: number,
  isMMB: boolean,
|};
