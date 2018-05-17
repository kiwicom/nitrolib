// @flow strict
import { getToken } from "client/services/booking/api";

type Input = {
  lang: string,
  bid: string,
  email: string,
  iata: string,
  departure: Date,
};

async function mmbRedirect({ lang, bid, email, iata, departure }: Input) {
  const token = await getToken({ bid, email, iata, departure });

  window.location = `/${lang}/manage/${bid}/${token}`;
}

export default mmbRedirect;
