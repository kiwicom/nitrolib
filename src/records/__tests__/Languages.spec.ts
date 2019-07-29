import * as languages from "../Languages";

describe("#Languages", () => {
  test("get by continent", () => {
    const ph = {
      id: "ph",
      name: "English (Philippines)",
      flag: "ph",
      defaultCountry: "ph",
      continent: "ap",
    };

    const cz = {
      continent: "eu",
      defaultCountry: "cz",
      flag: "cz",
      id: "cz",
      name: "Čeština",
    };

    expect(languages.getByContinent([ph, cz], "eu")).toEqual([cz]);
  });

  test("get by continent - language with multiple continents", () => {
    const tr = {
      id: "tr",
      name: "Türkçe",
      flag: "tr",
      defaultCountry: "tr",
      continent: ["eu", "mea"],
    };

    const xx = {
      id: "xx",
      name: "XX",
      flag: "xx",
      defaultCountry: "xx",
      continent: ["ap", "mea"],
    };

    expect(languages.getByContinent([tr, xx], "eu")).toEqual([tr]);
  });
});
