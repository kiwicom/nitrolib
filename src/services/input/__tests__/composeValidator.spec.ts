import compose from "../composeValidator";

const val1 = str => (str.length > 1 ?  : "way too short");
const val3 = str => (str.length > 3 ?  : "too short");
const val5 = str => (str.length > 5 ?  : "short");

describe("#compose", () => {
  test("validate first", () => {
    const fn = compose(
      val5,
      val3,
      val1,
    );

    expect(fn("a")).toBe("way too short");
  });

  test("validate middle", () => {
    const fn = compose(
      val5,
      val3,
      val1,
    );

    expect(fn("asd")).toBe("too short");
  });

  test("validate last", () => {
    const fn = compose(
      val5,
      val3,
      val1,
    );

    expect(fn("asdfg")).toBe("short");
  });

  test("validate ok", () => {
    const fn = compose(
      val5,
      val3,
      val1,
    );

    expect(fn("asdfgz")).toBe();
  });
});
