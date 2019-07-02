// @flow strict
import handleAffiliateId from "../handleAffiliateId";
import * as cookies from "../../cookies";
import * as local from "../../local";
import { AFFILIATE_ID } from "../../../../consts/cookies";
import { AFFILIATE_PARAMS } from "../../../../consts/local";

const mock = (fn: any) => fn;

jest.mock("../../cookies");
jest.mock("../../local");

describe("#handleAffiliateId", () => {
  test("url", () => {
    const res = handleAffiliateId("lol", { kek: "bur" });

    expect(res).toEqual({ id: "lol", params: { kek: "bur" } });
    expect(cookies.save).toBeCalledWith(AFFILIATE_ID, "lol", { expires: 30 });
    expect(local.save).toBeCalledWith(AFFILIATE_PARAMS, JSON.stringify({ kek: "bur" }));
  });

  test("cookies", () => {
    mock(cookies.load).mockReturnValue("lol");
    mock(local.load).mockReturnValue(JSON.stringify({ kek: "bur" }));

    const res = handleAffiliateId(null, {});

    expect(res).toEqual({ id: "lol", params: { kek: "bur" } });
    expect(cookies.load).toBeCalledWith(AFFILIATE_ID);
    expect(local.load).toBeCalledWith(AFFILIATE_PARAMS);
  });

  test("none", () => {
    mock(cookies.load).mockReturnValue(null);
    mock(local.load).mockReturnValue(null);

    const res = handleAffiliateId(null, {});

    expect(res).toBeNull();
    expect(cookies.remove).toBeCalledWith(AFFILIATE_ID);
    expect(local.remove).toBeCalledWith(AFFILIATE_PARAMS);
  });
});
