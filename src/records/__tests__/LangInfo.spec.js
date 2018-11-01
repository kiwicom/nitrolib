// @flow
import { fixDateFormat } from "../LangInfo";

describe("#fixFormat eee", () => {
  test("Should change ddd to eee", () => {
    const date = "ddd D MMM";
    expect(fixDateFormat(date)).toEqual("eee d MMM");
  });
});

describe("#fixFormat D", () => {
  test("Should change D to d", () => {
    const date = "D D D D D";
    expect(fixDateFormat(date)).toEqual("d d d d d");
  });
});

describe("#fixFormat YYYY", () => {
  test("Should change YYYY to yyyy", () => {
    const date = "YYYY yyy YY Y Y";
    expect(fixDateFormat(date)).toEqual("yyyy yyy YY Y Y");
  });
});

describe("#fixFormat DD", () => {
  test("Should change DD to dd", () => {
    const date = "DD DDD DD DD DDDD";
    expect(fixDateFormat(date)).toEqual("dd DDD dd dd DDDD");
  });
});
