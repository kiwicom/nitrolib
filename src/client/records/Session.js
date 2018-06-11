// @flow strict
export type Session = {|
  userId: string,
  sessionId: string,
  affiliate: string,
|};

// eslint-disable-next-line import/prefer-default-export
export const sessionDefault = {
  userId: "userId",
  sessionId: "sessionId",
  affiliate: "",
};
