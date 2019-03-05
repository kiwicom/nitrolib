// @flow strict
export type HotelType = {|
  name: ?string,
  photoUrl: ?string,
  address: ?{|
    fullAddress: ?string,
  |},
  rating: ?number,
  isMMB: ?boolean,
|};
