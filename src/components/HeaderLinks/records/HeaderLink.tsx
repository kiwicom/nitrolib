export type HeaderLink = {
  id: string,
  translation: string,
  newWindow: boolean,
  url: string,
};

export type SearchForm = {
  mode: string,
  destination: { type: string, name: string }, // TODO move proper search form into records @vacuum
  checkIn: Date,
  checkOut: Date | null,
  adults: number,
  children: number,
};

export type HeaderLinksContext =
  | "holidays"
  | "booking"
  | "kiwicom"
  | "pulkovoairport"
  | "kayakholidays";
