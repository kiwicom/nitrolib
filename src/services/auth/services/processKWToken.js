// @flow strict

import jsCookie from "js-cookie";

import config from "../../../consts/config";
import { KW_AUTH_TOKEN } from "../../../consts/cookies";
import { JSON_BOTH } from "../../fetch/headers";
import { log } from "../../log/logger";
import {
  MAGIC_LINK_USED,
  MAGIC_LINK_EXPIRED,
  MAGIC_LINK_FAILED,
} from "../../../components/MagicLogin/consts/events";
import type { AuthUser } from "../../../records/Auth";
import type { Event } from "../../../records/Event";

type Payload = {
  +accounts: $ReadOnlyArray<{| +user_credits: string, currency?: string |}>,
  +affiliate_id: ?string,
  +card_payment_discount: number,
  +credits: number,
  +credits_payment_discount: number,
  +email: string,
  +search_token: string,
  +status: "ok",
};

const processError = (error: Error, event: Event) => {
  log(event, { error: String(error) });
  jsCookie.remove(KW_AUTH_TOKEN);
  return Promise.reject(error);
};

const processPayload = (payload: Payload) => {
  return {
    type: "user",
    user: {
      id: "",
      email: payload.email,
      verified: false,
      firstname: "",
      lastname: "",
      apiToken: payload.search_token,
      affiliateId: payload.affiliate_id || "",
      cardDiscount: payload.card_payment_discount,
      balanceDiscount: payload.credits_payment_discount,
      balances: payload.accounts.map(balance => ({
        amount: Number(balance.user_credits),
        currency: (balance.currency || "").toLowerCase(),
      })),
    },
    token: "",
  };
};

const processKWToken = async (kwAuthToken: string): Promise<AuthUser> => {
  const bookingSignUrl = `${config.bookingApiUrl}/api/v0.1/users/self`;
  const headers = { "KW-Auth-Token": kwAuthToken };

  const response = await fetch(bookingSignUrl, {
    method: "GET",
    headers: {
      ...JSON_BOTH,
      ...headers,
    },
  });
  if (response.status === 403) {
    return processError(new Error("FORBIDDEN: Invalid or expired token."), MAGIC_LINK_EXPIRED);
  }

  if (response.status !== 200) {
    return processError(
      new Error(`UNEXPECTED: Request to "users/self" failed for "Kw-Auth-Token" cookie.`),
      MAGIC_LINK_FAILED,
    );
  }

  try {
    const payload: Payload = await response.json();
    log(MAGIC_LINK_USED, { email: payload.email });
    return processPayload(payload);
  } catch (e) {
    return processError(
      new Error(`UNEXPECTED: Error while parsing json response ${String(e)}`),
      MAGIC_LINK_FAILED,
    );
  }
};

export default processKWToken;
