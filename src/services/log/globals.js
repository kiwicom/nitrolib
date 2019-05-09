// @flow strict
import * as session from "../session/session";
import { SESSION_ID } from "../../consts/session";
import * as cookies from "../session/cookies";
import { USER_ID, AFFILIATE_ID } from "../../consts/cookies";
import type { Globals } from "../../records/Loglady";

type Static = {|
  brandingId: string,
  UTMs: { [key: string]: string },
  affilParams: { [key: string]: string },
  // Optional
  langId?: string,
  project?: string,
  module?: string,
  pageName?: string,
  deeplinkId?: string,
  pageViewId?: string,
  bid?: number,
  splitster?: { [key: string]: string },
|};

const globals = (statics: Static): Globals => {
  const dynamic = {
    userId: cookies.load(USER_ID) || "",
    affilId: cookies.load(AFFILIATE_ID) || "",
    sessionId: session.load(SESSION_ID) || "",
    url: window.location.href,
  };

  return { ...statics, ...dynamic };
};

export default globals;
