import * as cookies from "../session/cookies";
import { AFFILIATE_ID } from "../../consts/cookies";

const handleAffiliateId = (affiliateId: string) => {
  if (affiliateId) {
    cookies.save(AFFILIATE_ID, affiliateId);
  } else {
    cookies.remove(AFFILIATE_ID);
  }
};

export default handleAffiliateId;
