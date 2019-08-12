// @flow strict
import type { User } from "./User";

export type AuthUser = {|
  type: "user",
  user: User,
  token: string,
|};

export type PasswordStrengthEnum = "WEAK" | "MEDIUM" | "STRONG";

export type AuthMagic = {|
  type: "magic",
  email: string,
  token: string,
|};

export type AuthToken = {|
  type: "token",
  bid: number,
  token: string,
|};

export type Auth = AuthUser | AuthMagic | AuthToken;

export type SocialProvider = "facebook" | "google";

export const getEmail = (a: Auth): string => {
  if (a.type === "user") {
    return a.user.email;
  }

  if (a.type === "magic") {
    return a.email;
  }

  return "";
};

// eslint-disable-next-line import/prefer-default-export
export const authDefault: Auth | null = null;
