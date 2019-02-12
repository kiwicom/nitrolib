// @flow

import location from "../LocationMap/mockedData";
import type { Location } from "../LocationMap/types";

type Address = ?{|
  +fullAddress: ?string,
|};

type Accommodation = {
  address: Address,
  location: Location,
};

export const address: Address = {
  fullAddress: "Golden Rock Coast Hotel, City centre of Ubud 23",
};

export const accommodation: Accommodation = {
  address,
  location,
};
