// @flow strict
import mmbRedirect from "../mmbRedirect";

const date = new Date(Date.UTC(2020, 0, 1));
const input = {
  lang: "en",
  bid: "1234",
  email: "lol@kek.bur",
  iata: "VIE",
  departure: date,
};

describe("#mmbRedirect", () => {
  test("redirect", async () => {
    window.location.assign = jest.fn();
    const call = jest.fn().mockImplementation(() => Promise.resolve("asdf"));

    await mmbRedirect(input, call);

    expect(window.location.assign).toBeCalledWith("/en/manage/1234/asdf");
    expect(call).toBeCalledWith({
      bid: input.bid,
      email: input.email,
      iata: input.iata,
      departure: input.departure,
    });
  });
});
