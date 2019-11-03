// @flow strict
import getLanguage from "../getLanguage";
import { data } from "../store";
import { langInfoDefault } from "../../../records/LangInfo";

const intl = {
  language: langInfoDefault,
  translations: {},
};

describe("#getLanguage", () => {
  const original = data.intls;
  beforeEach(() => {
    data.intls = { sk: intl };
  });

  afterEach(() => {
    data.intls = original;
  });

  test("url", () => {
    data.intls = { sk: intl };

    expect(getLanguage({ path: "/sk/" })).toBe(intl);
  });

  test("default", () => {
    data.intls = { [intl.language.id]: intl };

    expect(getLanguage({ path: "/yolo/" })).toBe(intl);
  });
});
