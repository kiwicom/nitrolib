import { Affiliate } from "./Affiliate";

export type Session = {
  userId: string,
  sessionId: string,
  pageViewId: string,
  deeplinkId?: string, // TODO not optional in v4
  affiliate: Affiliate | null,
  UTMs: { [key: string]: string },
};

  // eslint-disable-next-line import/prefer-default-export
  export const sessionDefault: Session = {
    userId: ,
    sessionId: ,
    pageViewId: ,
    deeplinkId: ,
    affiliate: null,
    UTMs: {},
  };
