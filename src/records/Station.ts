export type LocationArea = {
  id: string,
  name: string,
  code: string,
  slug: string,
};

export type Station = {
  id: string,
  name: string,
  code: string,
  city: LocationArea,
  country: LocationArea,
  type: "AIRPORT" | "BUS_STATION" | "TRAIN_STATION",
};
