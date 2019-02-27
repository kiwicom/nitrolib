// @flow strict

import type { Props } from ".";

const accommodation: Props = {
  hotel: {
    name: "Golden Rock Coast Hotel",
    rating: 5,
    photoUrl: "https://satyr.io/320x213-240",
    address: {
      fullAddress: "Golden Rock Coast Hotel, City centre of Ubud 23",
    },
    isMMB: true,
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
  location: {
    center: {
      latitude: 38.104542,
      longitude: 23.980237,
    },
    label: "Golden Coast Hotel",
    zoom: 10,
    desktopWidth: 377,
    mapboxToken:
      "pk.eyJ1IjoibWljaGFlbGtpd2kiLCJhIjoiY2l3aHRiN2ZqMDAycjJ6cXduNDU5djkweCJ9.XuamwcGDtyovJEMaSWtFkg",
  },
};

export default accommodation;
