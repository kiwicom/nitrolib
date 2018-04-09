// @flow
export type Values = { [key: string]: string | number };
export type Translate = (key: string, values?: Values) => string;
export type Translations = { [key: string]: string };

function translate(translations: Translations, key: string, values: Values = {}) {
  const translation = translations[key];
  if (!translation) {
    return key;
  }

  return Object.keys(values).reduce(
    (acc, placeholder) =>
      acc.replace(new RegExp(`__${placeholder}__`, "g"), String(values[placeholder])),
    translation,
  );
}

export default translate;
