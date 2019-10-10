// @flow strict

import fetchMock from "fetch-mock";

import config from "../../../../consts/config";
import processKWToken from "../processKWToken";

jest.mock("js-cookie");
jest.mock("../../../log/logger");

describe("#processKWToken", () => {
  beforeEach(() => {
    // $FlowExpected: jest bug
    fetchMock.reset();
  });

  test("retrieves user by kwAuthToken from cookie", async () => {
    // $FlowExpected: jest bug
    fetchMock.mock(`${config.bookingApiUrl}/api/v0.1/users/self`, {
      body: {
        accounts: [],
        affiliate_id: null,
        card_payment_discount: 0,
        credits: 0,
        credits_payment_discount: 0,
        email: "joe.doe@example.com",
        search_token: "abc123",
        status: "ok",
      },
      status: 200,
    });
    expect(await processKWToken("someJWTToken")).toEqual({
      token: "",
      type: "user",
      user: {
        affiliateId: "",
        apiToken: "abc123",
        balanceDiscount: 0,
        balances: [],
        cardDiscount: 0,
        email: "joe.doe@example.com",
        firstname: "",
        id: "",
        lastname: "",
        verified: false,
      },
    });
  });
});
