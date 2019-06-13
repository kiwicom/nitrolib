// @flow strict
import type { EventPayload } from "./Event";

export type Globals = {|
  project?: string,
  userId: string,
  accountId?: string,
  module?: string,
  pageName?: string,
  langId?: string,
  sessionId?: string,
  deeplinkId?: string,
  pageViewId?: string,
  affilId: string,
  affilParams?: { [key: string]: string },
  brandingId: string,
  timestamp?: number,
  url: string,
  bid?: number,
  splitster?: { [key: string]: string },
  UTMs: { [key: string]: string },
  bookingSessionId?: string,
  screenWidth?: number,
  screenHeight?: number,
  viewportWidth?: number,
  viewportHeight?: number,
  isLoggedIn?: boolean,
  browserPrivacyMode?: string,
|};

export type Loglady = {|
  events: EventPayload[],
  global: Globals,
|};
