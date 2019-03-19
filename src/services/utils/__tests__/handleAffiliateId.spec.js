// @flow strict
import handleAffiliateId from "../handleAffiliateId";
import * as cookies from "../../session/cookies";
import { AFFILIATE_ID } from "../../../consts/cookies";

jest.mock("../../session/cookies");

describe("#handleAffiliateId", () => {
  test("cookie", () => {
    handleAffiliateId("lol");
    expect(cookies.save).toBeCalledWith(AFFILIATE_ID, "lol");
  });

  test("none", () => {
    handleAffiliateId(null);
    expect(cookies.remove).toBeCalledWith(AFFILIATE_ID);
  });
});
