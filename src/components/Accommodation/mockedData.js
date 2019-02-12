// @flow

import type { Props } from ".";
import { accommodation as accommodationMock } from "./components/AccommodationModal/mockedData";
import location from "./components/LocationMap/mockedData";

const accommodation: Props = {
  hotel: {
    name: "Golden Rock Coast Hotel",
    rating: 5,
    photoUrl: "https://satyr.io/320x213-240",
    address: accommodationMock.address,
  },
  rooms: [
    {
      id: "1",
      description: "1x Deluxe Room with Free Daily Activities; 2x Adult, 1x Child; Half board",
    },
    {
      id: "2",
      description: "1x Deluxe Pool View Room with Free Daily Activities; 1x Adult",
    },
    {
      id: "3",
      description: "1x Deluxe Pool View Room with Free Daily Activities; 1x Adult",
    },
  ],
  location,
};

export default accommodation;
