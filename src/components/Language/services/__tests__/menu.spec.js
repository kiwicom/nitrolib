// @flow srict
import { getLanguageWrapperWidth, getLanguageWrapperHeight } from "../menu";

describe("#Menu service", () => {
  test("Calculates width for language picker correctly", () => {
    const emptyFilteredLanguages = [];
    const filteredLanguages = [
      { id: "cz", continent: "eu", defaultCountry: "cz", flag: "cz", name: "Czech" },
      { id: "en", continent: "eu", defaultCountry: "uk", flag: "uk", name: "English (UK)" },
      { id: "dk", continent: "eu", defaultCountry: "dk", flag: "dk", name: "Danish" },
      { id: "se", continent: "eu", defaultCountry: "sv", flag: "se", name: "Swedish" },
      { id: "fi", continent: "eu", defaultCountry: "fi", flag: "fi", name: "Finnish" },
      { id: "de", continent: "eu", defaultCountry: "de", flag: "de", name: "German" },
    ];

    expect(getLanguageWrapperWidth(emptyFilteredLanguages, false)).toBe(360);
    expect(getLanguageWrapperWidth(filteredLanguages, false)).toBe(540);
  });

  test("Calculates height for language picker correctly", () => {
    const emptyFilteredLanguages = [];
    const filteredLanguages = [
      { id: "cz", continent: "eu", defaultCountry: "cz", flag: "cz", name: "Czech" },
      { id: "en", continent: "eu", defaultCountry: "uk", flag: "uk", name: "English (UK)" },
      { id: "dk", continent: "eu", defaultCountry: "dk", flag: "dk", name: "Danish" },
      { id: "se", continent: "eu", defaultCountry: "sv", flag: "se", name: "Swedish" },
      { id: "fi", continent: "eu", defaultCountry: "fi", flag: "fi", name: "Finnish" },
      { id: "de", continent: "eu", defaultCountry: "de", flag: "de", name: "German" },
    ];
    const longFilteredLanguages = Array(62).fill({
      id: "cz",
      continent: "eu",
      defaultCountry: "cz",
      flag: "cz",
      name: "Czech",
    });

    expect(getLanguageWrapperHeight(emptyFilteredLanguages, false)).toBe(0);
    expect(getLanguageWrapperHeight(filteredLanguages, false)).toBe(62);
    expect(getLanguageWrapperHeight(longFilteredLanguages, false)).toBe(651);
  });
});
