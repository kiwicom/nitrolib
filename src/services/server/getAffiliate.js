// @flow strict
const filter = (entry: string): ?string => {
  if (/^[a-z0-9_-]*$/.test(entry)) {
    return entry;
  }
  return null;
};

export const formatSimple = (entry: string): string =>
  entry.includes("_") ? entry.split("_")[0] : entry;

type Input = {|
  queryAffilId: string, // affilid
  cookiesAffilId: string, // AFFILIATE_ID in 'consts/cookies'
|};

const getAffiliate = ({ queryAffilId, cookiesAffilId }: Input): string | null => {
  if (queryAffilId && filter(queryAffilId)) {
    return queryAffilId;
  }

  if (cookiesAffilId && filter(cookiesAffilId)) {
    return cookiesAffilId;
  }

  return null;
};

export default getAffiliate;
