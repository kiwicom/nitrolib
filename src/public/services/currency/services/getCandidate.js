// @flow strict
type Input = {
  initial: string,
  country: string,
  lang: string,
};

function getCandidate({ initial, country, lang }: Input) {
  if (initial !== "") {
    return initial;
  }

  if (country) {
    return country;
  }

  return lang;
}

export default getCandidate;
