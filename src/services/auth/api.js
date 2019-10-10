// @flow strict
import "isomorphic-fetch";
import format from "date-fns/format";
import querystring from "querystring";
import btoa from "btoa-lite";

import { mapUser } from "../../records/User";
import type { User } from "../../records/User";
import type { AuthUser } from "../../records/Auth";
import config from "../../consts/config";
import { handleError, handleJSON } from "../fetch/handlers";
import { JSON_BOTH } from "../fetch/headers";
import getOAuthRedirectUrl from "./services/getOAuthRedirectUrl";
import processKWToken from "./services/processKWToken";

// noinspection SpellCheckingInspection
const USER = "5433ecccaff67";

const makeAuthHeader = (token: string) => `Basic ${btoa(`${USER}:${token}`)}`;

type GetTokenUserRes = {|
  user_id: string,
  email: string,
  email_verified: boolean,
  first_name: string,
  last_name: string,
|};

type OnMyBookingArg = {|
  token: string,
  bid: number,
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

export type MyBookingInput = {|
  bid: string,
  email: string,
  iata: string,
  departure: Date,
|};

// eslint-disable-next-line import/prefer-default-export
export function getMyBookingToken({
  bid,
  email,
  iata,
  departure,
}: MyBookingInput): Promise<OnMyBookingArg> {
  const query = {
    email,
    src: iata,
    dtime: format(departure, config.apiDateFormat, { awareOfUnicodeTokens: true }),
  };

  return fetch(
    `${config.bookingApiUrl}/api/v0.1/users/get_simple_token/${bid}?${querystring.stringify(
      query,
    )}`,
  ).then((res: Response) => {
    if (!res.ok) {
      return res.json().then(body => Promise.reject(new Error(body.msg)));
    }

    return res.json().then(body => ({ token: body.simple_token, bid: Number(bid) }));
  });
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

export async function signIn(input: LoginInput): Promise<AuthUser> {
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

  return { type: "user", user, token: res.token };
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

export type RegisterInput = {|
  firstName: string,
  lastName: string,
  email: string,
  password: string,
|};

export function register(brand: string, input: RegisterInput): Promise<void> {
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
      brand,
    }),
  })
    .then(handleError)
    .then(() => {});
}

type SocialAuthProvider = "facebook" | "google";

export async function socialAuth(provider: SocialAuthProvider, url: string): Promise<string> {
  const res = await fetch(`${config.apiAuthUrl}/v1/oauth.getAuthorizationUrl`, {
    method: "POST",
    headers: JSON_BOTH,
    body: JSON.stringify({
      provider_id: provider,
      app_id: config.userAppAppId,
      redirect_url: getOAuthRedirectUrl(url),
    }),
  }).then(handleJSON);

  return res.authorization_url;
}

export function resetPassword(email: string, brandId: string) {
  return fetch(`${config.apiAuthUrl}/v1/user.resetPassword`, {
    method: "POST",
    headers: {
      ...JSON_BOTH,
      Authorization: makeAuthHeader(""),
    },
    body: JSON.stringify({
      login: email,
      brand: brandId,
    }),
  }).then(handleJSON);
}

export const getUserFromKWToken = processKWToken;
