// @flow strict

import { type Room } from "./Room";

export type Hotel = {|
  name: string,
  rating: ?number,
  rooms: Room[],
|};
