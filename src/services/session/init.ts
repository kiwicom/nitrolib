import qs from "query-string";

import handleUserId from "./services/handleUserId";
import handleSessionId from "./services/handleSessionId";
import { makePageViewId } from "./ids";
import handleAffiliateId from "./services/handleAffiliateId";
import handleDeeplinkId from "./services/handleDeeplinkId";
import handleUTMs from "./services/handleUTMs";
import { Session } from "../../records/Session";

const init = (): Session => {
  const {
    userId,
    user_id, // deprecated format, force 'userId'
    affilId,
    affilid, // deprecated format, force 'affilId'
    deeplinkId,
    ...rest
  } = qs.parse(window.location.search);

  return {
    userId: handleUserId((userId || user_id) && String(userId || user_id)),
    sessionId: handleSessionId(),
    pageViewId: makePageViewId(),
    deeplinkId: handleDeeplinkId(deeplinkId && String(deeplinkId)),
    affiliate: handleAffiliateId((affilId || affilid) && String(affilId || affilid), rest),
    UTMs: handleUTMs(rest),
  };
};

export default init;
