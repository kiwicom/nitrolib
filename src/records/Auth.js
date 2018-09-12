// @flow strict
import type { User } from "./User";

export type Auth = {|
  user: User,
  token: string,
|};

// eslint-disable-next-line import/prefer-default-export
export const authDefault: Auth | null = null;
