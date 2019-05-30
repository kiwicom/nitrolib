// @flow strict
import * as cookies from "../session/cookies";
import { AFFILIATE_ID, USER_ID } from "../../consts/cookies";
import * as session from "../session/session";
import { DEEPLINK_ID, SESSION_ID, BOOKING_SESSION_ID } from "../../consts/session";
import type { Globals } from "../../records/Loglady";
import { make } from "../../records/Event";
import type { Event, Props } from "../../records/Event";
import api from "./api";

export type Statics = {|
  project?: string,
  module?: string,
  pageName?: string,
  langId?: string,
  pageViewId?: string,
  brandingId: string,
  bid?: number,
  splitster?: { [key: string]: string },
  isLoggedIn?: boolean,
  affilParams?: { [key: string]: string },
  UTMs: { [key: string]: string },
|};

export const statics: Statics = {
  project: "",
  module: "",
  pageName: "",
  langId: "",
  pageViewId: "",
  brandingId: "",
  bid: 0,
  splitster: {},
  isLoggedIn: false,
  affilParams: {},
  UTMs: {},
};

export const getGlobals = (): Globals => ({
  ...statics,
  userId: cookies.load(USER_ID) || "",
  affilId: cookies.load(AFFILIATE_ID) || "",
  sessionId: session.load(SESSION_ID) || "",
  deeplinkId: session.load(DEEPLINK_ID) || "",
  bookingSessionId: session.load(BOOKING_SESSION_ID) || "",
  url: window.location.href,
  browserPrivacyMode: window.browserPrivacyMode,
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
  viewportWidth: window.innerWidth,
  viewportHeight: window.innerHeight,
  timestamp: Date.now(),
});

export const log = (evs: Event[], props: Props): Promise<void> =>
  api({ events: evs.map(ev => make(ev, props)), global: getGlobals() });
