
export type Sector = {
  from: string,
  to: string,
  stops: "0" | "1" | "2" | "3",
  note: string,
};

export type TravelArrangement = {
  takeOff: Sector,
  landing: Sector,
};
