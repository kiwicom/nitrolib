// @flow
import type { Event } from "../../../records/Event";

export const MAGIC_LOGIN_MODAL_SHOWN: Event = {
  category: "Nitro",
  subCategory: "MagicLogin",
  action: "ModalShown",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
  },
};

export const SCREEN_CHANGED: Event = {
  category: "Nitro",
  subCategory: "MagicLogin",
  action: "ScreenChanged",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
  },
};

export const LOGGED_WITH_ACCOUNT: Event = {
  category: "Nitro",
  subCategory: "MagicLogin",
  action: "LoggedInWithAccount",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
  },
};

export const ASK_FOR_MAGIC_LINK: Event = {
  category: "Nitro",
  subCategory: "MagicLogin",
  action: "AskForMagicLink",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
  },
};

export const MAGIC_LINK_SENT: Event = {
  category: "Nitro",
  subCategory: "MagicLogin",
  action: "MagicLinkSent",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
  },
};

export const CHANGE_EMAIL: Event = {
  category: "Nitro",
  subCategory: "MagicLogin",
  action: "ChangeEmail",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
  },
};

export const LOGIN_VIA_SOCIAL: Event = {
  category: "Nitro",
  subCategory: "MagicLogin",
  action: "LoginViaSocialProvider",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
  },
};

export const CONTINUE_WITH_REGISTER: Event = {
  category: "Nitro",
  subCategory: "MagicLogin",
  action: "ContinueWithRegister",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
  },
};

export const REGISTRATION_SENT: Event = {
  category: "Nitro",
  subCategory: "MagicLogin",
  action: "RegistrationSent",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
  },
};

export const LOGIN_ABANDONED: Event = {
  category: "Nitro",
  subCategory: "MagicLogin",
  action: "LoginAbandoned",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
  },
};

export const LOGIN_PATH_FULFILLED = {
  category: "Nitro",
  subCategory: "MagicLogin",
  action: "LoginPathFulfilled",
  destinations: {
    exponea: true,
    ga: false,
    logmole: false,
  },
};
