// @flow strict
export type DepartureArrival = {|
  where: {
    code: string,
    id: string,
    lat: number,
    lng: number,
    name: string,
    station: string,
  },
  when: {
    local: Date,
    utc: Date,
  },
|};

export type Airline = {
  name: string,
  logo: string,
  code: string,
  closeBookingHours?: number,
};

export type PART_TYPE = "flight" | "train" | "bus";

export type Flight = {
  id: string,
  naturalId: ?string,
  departure: DepartureArrival,
  arrival: DepartureArrival,
  vehicle: Object,
  type: PART_TYPE,
  airline: Airline,
  seatmap: Object,
  number: ?number,
  bagsRecheckRequired: ?boolean,
  guarantee: ?boolean,
  isHidden: boolean,
  boardingPassAvailableAt: ?Date,
  priorityBoarding: boolean,
  isCabinBagsWithPriorityBoarding: boolean,
  operatingAirline: Object,
  pnr: string,
  status: Object,
  amenities: null,
  updatedArrival: null,
  updatedDeparture: null,
};
