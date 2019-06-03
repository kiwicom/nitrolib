// @flow strict
import fetchMock from "fetch-mock";

import config from "../../../consts/config";
import * as api from "../api";

describe("#api", () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  describe("getMyBookingToken()", () => {
    const input = {
      bid: "123",
      email: "lol@kek.bur",
      iata: "VIE",
      departure: new Date(Date.UTC(2020, 0, 1)),
    };

    const bookingLoginUrl = `${
      config.bookingApiUrl
    }/api/v0.1/users/get_simple_token/123?email=lol%40kek.bur&src=VIE&dtime=01%2F01%2F2020`;

    test("ok", async () => {
      fetchMock.mock(bookingLoginUrl, { body: { simple_token: "token" }, status: 200 });
      const res = await api.getMyBookingToken(input);
      expect(res).toBe("token");
    });

    test("not ok", async () => {
      fetchMock.mock(bookingLoginUrl, { status: 400, body: { msg: "asdf" } });
      const res = await api.getMyBookingToken(input).catch(String);
      expect(res).toBe("Error: asdf");
    });
  });

  describe("getTokenUser()", () => {
    test("ok", async () => {
      fetchMock.mock(`${config.apiAuthUrl}/v1/user.get`, {
        body: [
          {
            brand: "kiwicom",
            email: "a",
            email_verified: true,
            first_name: "b",
            last_name: "c",
            user_id: "d",
          },
        ],
        status: 200,
      });

      const res = await api.getTokenUser("my.secret.token");
      expect(res).toMatchObject({
        id: expect.any(String),
        email: expect.any(String),
        verified: expect.any(Boolean),
        firstname: expect.any(String),
        lastname: expect.any(String),
      });
    });

    test("not ok", async () => {
      fetchMock.mock(`${config.apiAuthUrl}/v1/user.get`, {
        body: { error_code: "INVALID_ARGUMENT_AUTH" },
        status: 200,
      });

      expect.hasAssertions();
      try {
        await api.getTokenUser("my.secret.token");
      } catch (e) {
        expect(e.message).toEqual("API error when retrieving user");
      }
    });
  });
});
