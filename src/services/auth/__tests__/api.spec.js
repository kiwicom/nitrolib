// @flow strict
import { Response } from "node-fetch";

import config from "../../../consts/config";
import * as api from "../api";

const input = {
  bid: "123",
  email: "lol@kek.bur",
  iata: "VIE",
  departure: new Date(Date.UTC(2020, 0, 1)),
};

describe("#api", () => {
  test("get token ok", async () => {
    window.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(new Response(JSON.stringify({ simple_token: "token" }), { status: 200 })),
      );

    const res = await api.getMyBookingToken(input);

    expect(window.fetch).toBeCalledWith(
      `${
        config.bookingApiUrl
      }/api/v0.1/users/get_simple_token/123?email=lol%40kek.bur&src=VIE&dtime=01%2F01%2F2020`,
    );
    expect(res).toBe("token");
  });

  test("get token not ok", async () => {
    window.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(new Response(JSON.stringify({ msg: "asdf" }), { status: 400 })),
      );

    const res = await api.getMyBookingToken(input).catch(String);

    expect(window.fetch).toBeCalledWith(
      `${
        config.bookingApiUrl
      }/api/v0.1/users/get_simple_token/123?email=lol%40kek.bur&src=VIE&dtime=01%2F01%2F2020`,
    );
    expect(res).toBe("asdf");
  });
});
