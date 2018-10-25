// @flow strict
export const NONE: "" = "";
export const MY_BOOKING: "myBooking" = "myBooking";
export const REGISTER: "register" = "register";
export const SIGN_IN: "signIn" = "signIn";
export const FORGOT_PASSWORD: "forgotPassword" = "forgotPassword";
export const SIDE_NAV: "sideNav" = "sideNav";
export const CHAT: "chat" = "chat";
export const SUBSCRIPTION: "subscription" = "subscription";
export const DEBUG: "debug" = "debug";

export type AuthModal = "myBooking" | "register" | "signIn" | "forgotPassword";

export type Modal = AuthModal | "" | "sideNav" | "chat" | "subscription" | "debug";
