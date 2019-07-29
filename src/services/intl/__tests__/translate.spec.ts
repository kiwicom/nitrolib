import translate from "../translate";

const translations = {
  kek: "bur",
  lol: "__x__ omg, __y__ bbq, __x__ rofl",
};

describe("#translate", () => {
  test("missing translation", () => {
    expect(translate(translations, "lmao")).toBe("lmao");
  });

  test("basic translation", () => {
    expect(translate(translations, "kek")).toBe("bur");
  });

  test("placeholders", () => {
    const res = translate(translations, "lol", {
      x: "as",
      y: "df",
    });

    expect(res).toBe("as omg, df bbq, as rofl");
  });
});
