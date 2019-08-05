// @flow
import type { Event } from "../../../records/Event";

export const MAGIC_LOGIN_MODAL_SHOWN: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "ModalShown",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const SCREEN_CHANGED: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "ScreenChanged",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const LOGGED_WITH_ACCOUNT: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "LoggedInWithAccount",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const ASK_FOR_MAGIC_LINK: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "AskForMagicLink",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const MAGIC_LINK_SENT: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "MagicLinkSent",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const CHANGE_EMAIL: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "ChangeEmail",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const LOGIN_VIA_SOCIAL: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "LoginViaSocialProvider",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const CONTINUE_WITH_REGISTER: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "ContinueWithRegister",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const REGISTRATION_SENT: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "RegistrationSent",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const SIMPLE_TOKEN_RETRIEVED: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "SimpleTokenRetrieved",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const GET_SIMPLE_TOKEN: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "GetSimpleToken",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const LOGIN_ABANDONED: Event = {
  category: "General",
  subCategory: "MagicLogin",
  action: "LoginAbandoned",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};

export const LOGIN_PATH_FULFILLED = {
  category: "General",
  subCategory: "MagicLogin",
  action: "LoginPathFulfilled",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
    bigQuery: true,
  },
};
