export type Airline = {
  id: string,
  lcc: number,
  name: string,
};

export type Airlines = {
    [key: string]: Airline,
  };

// eslint-disable-next-line import/prefer-default-export
export const airlineDefault: Airline = { id: "xx", lcc: 0, name: "Default airline" };
