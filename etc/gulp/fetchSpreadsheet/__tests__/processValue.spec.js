import processValue from "../processValue";

describe("#processValue", () => {
  test("not string", () => {
    expect(processValue(123)).toBe(123);
  });

  test("array", () => {
    expect(processValue("[lol]")).toEqual(["lol"]);
    expect(processValue("[lol,kek]")).toEqual(["lol", "kek"]);
  });

  test("true", () => {
    expect(processValue("TRUE")).toBe(true);
  });

  test("false", () => {
    expect(processValue("FALSE")).toBe(false);
  });

  test("anything", () => {
    expect(processValue("anything")).toBe("anything");
  });
});
