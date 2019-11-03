// @flow strict
import getAffiliate, { formatSimple } from "../getAffiliate";

const input = {
  queryAffilId: null,
  cookiesAffilId: null,
};

describe("#getLanguage", () => {
  test("none", () => {
    expect(getAffiliate(input)).toBeNull();
  });

  test("query", () => {
    expect(getAffiliate({ cookiesAffilId: "swag", queryAffilId: "yolo" })).toBe("yolo");
  });

  test("cookies", () => {
    expect(getAffiliate({ ...input, cookiesAffilId: "swag" })).toBe("swag");
  });

  test("formatSimple", () => {
    expect(formatSimple("yolo_swag")).toBe("yolo");
  });
});
