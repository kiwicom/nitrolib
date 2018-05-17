// @flow strict
import querystring from "querystring";
import format from "date-fns/format";

import config from "client/consts/config";

type Input = {
  lang: string,
  bid: string,
  email: string,
  iata: string,
  departure: Date,
};

async function mmbRedirect({ lang, bid, email, iata, departure }: Input) {
  const query = {
    email,
    src: iata,
    dtime: format(departure, config.apiDateFormat),
  };

  const token = await fetch(
    `${config.bookingApiUrl}/api/v0.1/users/get_simple_token/${bid}/?${querystring.stringify(
      query,
    )}`,
  )
    .then(res => res.json())
    .then(res => res.simple_token);

  window.location = `/${lang}/manage/${bid}/${token}`;
}

export default mmbRedirect;
