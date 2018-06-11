// @flow strict
import getCandidate from "../getCandidate";

const input = {
  initial: "kek",
  country: "bur",
  lang: "lmao",
};

describe("#getCandidate", () => {
  test("from initial", () => {
    expect(getCandidate(input)).toBe("kek");
  });

  test("from country", () => {
    expect(getCandidate({ ...input, initial: "" })).toBe("bur");
  });

  test("from lang", () => {
    expect(getCandidate({ ...input, initial: "", country: "" })).toBe("lmao");
  });
});
