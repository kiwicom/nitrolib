// @flow strict

export type TravelArrangement = {
  itineraryOutbound: $ReadOnlyArray<{|
    departure: string,
    destination: string,
    numberOfStops: ?number,
    note: string,
  |}>,
  itineraryInbound: $ReadOnlyArray<{|
    departure: string,
    destination: string,
    numberOfStops: ?number,
    note: string,
  |}>,
};
