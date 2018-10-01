// @flow strict
import type { User } from "./User";

export type Auth = {|
  user: User,
  token: string,
|};

export type SocialProvider = "facebook" | "google";

// eslint-disable-next-line import/prefer-default-export
export const authDefault: Auth | null = null;
