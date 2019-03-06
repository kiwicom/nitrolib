// @flow strict
import type { Affiliate } from "./Affiliate";

export type Session = {|
  userId: string,
  sessionId: string,
  affiliate: Affiliate | null,
  UTMs: { [key: string]: string },
|};

// eslint-disable-next-line import/prefer-default-export
export const sessionDefault: Session = {
  userId: "",
  sessionId: "",
  affiliate: null,
  UTMs: {},
};
