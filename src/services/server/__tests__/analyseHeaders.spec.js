// @flow strict
import analyseHeaders from "../analyseHeaders";

const generateCookie = (size, name) => `${name}=${"x".repeat(size - name.length)}`;

describe("#analyseHeaders", () => {
  test("normal", () => {
    expect(analyseHeaders({ bam: "asdf" }, "/booking")).toEqual({
      total: 18,
      url: 8,
      headers: 10,
      cookies: {
        total: 0,
        recentSearch: 0,
        splitster: 0,
        other: 0,
      },
      cookiesToRemove: [],
    });
  });

  test("empty", () => {
    expect(analyseHeaders({}, "")).toEqual({
      total: 0,
      url: 0,
      headers: 0,
      cookies: {
        total: 0,
        recentSearch: 0,
        splitster: 0,
        other: 0,
      },
      cookiesToRemove: [],
    });
  });

  test("higher than limit", () => {
    expect(
      analyseHeaders(
        {
          cookie: [
            generateCookie(1000, "nejaky_forter"),
            generateCookie(1000, "treba_exponea"),
            generateCookie(1000, "Splitster_something"),
            generateCookie(4000, "recentSearch"),
          ].join("; "),
        },
        "",
      ),
    ).toEqual({
      total: 7019,
      url: 0,
      headers: 7019,
      cookies: {
        total: 7011,
        recentSearch: 4003,
        splitster: 1003,
        other: 2005,
      },
      cookiesToRemove: ["Splitster_something", "recentSearch"],
    });
  });
});
