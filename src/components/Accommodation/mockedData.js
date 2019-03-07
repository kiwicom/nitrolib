// @flow strict

import type { AccommodationType } from "./records/Accommodation";

const accommodation: AccommodationType = {
  hotelName: "Golden Rock Coast Hotel",
  rating: 5,
  location: {
    latitude: 38.104542,
    longitude: 23.980237,
  },
  address: "Bali - Ubud, City centre of Ubud",
  photoUrl: "https://satyr.io/320x213-240",
  rooms: [
    {
      id: "1",
      roomType: "1x Deluxe Room with Free Daily Activities",
      occupancy: "2x Adult, 1x Child",
      boardType: "Half board",
    },
    {
      id: "2",
      roomType: "1x Deluxe Pool View Room with Free Daily Activities",
      occupancy: "1x Adult",
    },
    {
      id: "3",
      roomType: "1x Deluxe Pool View Room with Free Daily Activities",
      occupancy: "1x Adult",
    },
  ],
  mapboxToken:
    "pk.eyJ1IjoibWljaGFlbGtpd2kiLCJhIjoiY2l3aHRiN2ZqMDAycjJ6cXduNDU5djkweCJ9.XuamwcGDtyovJEMaSWtFkg",
  isMMB: true,
};

export default accommodation;
