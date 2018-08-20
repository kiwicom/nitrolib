// @flow strict
import { mapUser } from "../../records/User";
import type { User } from "../../records/User";
import config from "../../consts/config";
import { handleError, handleJSON } from "../fetch/handlers";
import { JSON_BOTH } from "../fetch/headers";
import getOAuthRedirectUrl from "./services/getOAuthRedirectUrl";

// noinspection SpellCheckingInspection
const USER = "5433ecccaff67";

const makeAuthHeader = (token: string) => `Basic ${window.btoa(`${USER}:${token}`)}`;

type GetTokenUserRes = {|
  user_id: string,
  email: string,
  email_verified: boolean,
  first_name: string,
  last_name: string,
|};

export async function getTokenUser(token: string): Promise<User> {
  const user: GetTokenUserRes = await fetch(`${config.apiAuthUrl}/v1/user.get`, {
    method: "POST",
    headers: {
      ...JSON_BOTH,
      Authorization: makeAuthHeader(token),
    },
    body: JSON.stringify({ user: "self" }),
  })
    .then(handleJSON)
    .catch(() => Promise.reject(new Error("API error when retrieving user")));

  if (!user) {
    return Promise.reject(new Error("API error when retrieving user"));
  }

  return mapUser(user[0]);
}

type LoginInput = {|
  email: string,
  password: string,
  brand: string,
|};

type LoginResponse = {|
  token: string,
  locks?: any[],
|};

export async function signIn(input: LoginInput): Promise<{ user: User, token: string }> {
  const res: LoginResponse = await fetch(`${config.apiAuthUrl}/v1/user.login`, {
    method: "POST",
    headers: {
      ...JSON_BOTH,
      Authorization: makeAuthHeader(""),
    },
    body: JSON.stringify({
      login: input.email,
      password: input.password,
      brand: input.brand,
    }),
  }).then(handleJSON);

  if (res.locks && res.locks.length > 0) {
    return Promise.reject(new Error("User is locked"));
  }

  const user = await getTokenUser(res.token);

  return { user, token: res.token };
}

export async function logout(token: string): Promise<void> {
  return fetch(`${config.apiAuthUrl}/v1/user.logout`, {
    method: "POST",
    headers: {
      ...JSON_BOTH,
      Authorization: makeAuthHeader(token),
    },
    body: JSON.stringify(token),
  })
    .then(handleError)
    .then(() => {});
}

type RegisterInput = {|
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  brand: string,
|};

export function register(input: RegisterInput): Promise<void> {
  return fetch(`${config.apiAuthUrl}/v1/user.save`, {
    method: "POST",
    headers: {
      ...JSON_BOTH,
      Authorization: makeAuthHeader(""),
    },
    body: JSON.stringify({
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName,
      login: input.email,
      password: input.password,
      brand: input.brand,
    }),
  })
    .then(handleError)
    .then(() => {});
}

type SocialAuthProvider = "facebook" | "google";

export async function socialAuth(
  provider: SocialAuthProvider,
  redirectUrl: string = window.location.href,
): Promise<boolean> {
  const response = await fetch(`${config.apiAuthUrl}/v1/oauth.getAuthorizationUrl`, {
    method: "POST",
    headers: JSON_BOTH,
    body: JSON.stringify({
      provider_id: provider,
      app_id: config.userAppAppId,
      redirect_url: getOAuthRedirectUrl(redirectUrl),
    }),
  }).then(handleJSON);

  if (response.authorization_url) {
    window.location.href = response.authorization_url;
    return true;
  }

  return false;
}
