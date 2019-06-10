// @flow strict
import oneWay from "./Itinerary/ItineraryOneWay";
import type { StarredItem } from "../Starred";

const starred: StarredItem = {
  id: "cheburek",
  form: {
    origin: "bur",
    destination: "lal",
    outboundDate: "2019-03-18T06:30:00.000Z",
    inboundDate: "2019-03-18T06:30:00.000Z",
    multicity: "kek",
    salesman: "1",
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    cabinClass: "economy",
    filters: null,
    lang: "ru",
    places: [{ id: "RU", slug: "RU" }],
    returnUrl: "url",
    starType: "search",
  },
  lastPrice: 150,
  itinerary: {
    ...oneWay,
  },
  priceUpdatedAt: new Date("2019-03-18T06:30:00.000Z"),
  createdAt: new Date("2019-03-18T06:30:00.000Z"),
  updatedAt: new Date("2019-03-18T06:30:00.000Z"),
};

export default starred;
