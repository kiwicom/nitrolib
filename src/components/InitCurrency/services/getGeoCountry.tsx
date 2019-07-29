const getGeoCountry = (ip: string): Promise<string> =>
  fetch(`https://geoip-api-prod.skypicker.com/geoip-api${ip && `?ip=${ip}`}`)
    .then(res => res.json())
    .then(data => data.isoCountryCode.toLowerCase())
    .catch(() => "gb"); // Safe fallback

export default getGeoCountry;
