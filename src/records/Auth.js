// @flow strict
import type { User } from "./User";

export type AuthUser = {|
  type: "user",
  user: User,
  token: string,
|};

export type AuthMagic = {|
  type: "magic",
  email: string,
  token: string,
|};

export type Auth = AuthUser | AuthMagic;

export type SocialProvider = "facebook" | "google";

// eslint-disable-next-line import/prefer-default-export
export const authDefault: Auth | null = null;
