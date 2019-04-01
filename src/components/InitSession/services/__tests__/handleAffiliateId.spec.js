// @flow strict
import handleAffiliateId from "../handleAffiliateId";
import * as cookies from "../../../../services/session/cookies";
import * as storage from "../../../../services/session/storage";
import { AFFILIATE_ID } from "../../../../consts/cookies";
import { AFFILIATE_PARAMS } from "../../../../consts/storage";

jest.mock("../../../../services/session/cookies");
jest.mock("../../../../services/session/storage");

describe("#handleAffiliateId", () => {
  test("url", () => {
    const res = handleAffiliateId("lol", { kek: "bur" });

    expect(res).toEqual({ id: "lol", params: { kek: "bur" } });
    expect(cookies.save).toBeCalledWith(AFFILIATE_ID, "lol", { expires: 30 });
    expect(storage.save).toBeCalledWith(AFFILIATE_PARAMS, JSON.stringify({ kek: "bur" }));
  });

  test("cookies", () => {
    cookies.load.mockReturnValue("lol");
    storage.load.mockReturnValue(JSON.stringify({ kek: "bur" }));

    const res = handleAffiliateId(null, {});

    expect(res).toEqual({ id: "lol", params: { kek: "bur" } });
    expect(cookies.load).toBeCalledWith(AFFILIATE_ID);
    expect(storage.load).toBeCalledWith(AFFILIATE_PARAMS);
  });

  test("none", () => {
    cookies.load.mockReturnValue(null);
    storage.load.mockReturnValue(null);

    const res = handleAffiliateId(null, {});

    expect(res).toBeNull();
    expect(cookies.remove).toBeCalledWith(AFFILIATE_ID);
    expect(storage.remove).toBeCalledWith(AFFILIATE_PARAMS);
  });
});
