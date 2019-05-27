// @flow strict
import qs from "query-string";

import handleUserId from "./services/handleUserId";
import handleSessionId from "./services/handleSessionId";
import { makePageViewId } from "./ids";
import handleAffiliateId from "./services/handleAffiliateId";
import handleDeeplinkId from "./services/handleDeeplinkId";
import handleUTMs from "./services/handleUTMs";
import type { Session } from "../../records/Session";

const init = (): Session => {
  const {
    userId,
    affilId,
    affilid, // deprecated format, force 'affilId'
    deeplinkId,
    ...rest
  } = qs.parse(window.location.search);

  return {
    userId: handleUserId(userId && String(userId)),
    sessionId: handleSessionId(),
    pageViewId: makePageViewId(),
    deeplinkId: handleDeeplinkId(deeplinkId && String(deeplinkId)),
    affiliate: handleAffiliateId((affilId || affilid) && String(affilId || affilid), rest),
    UTMs: handleUTMs(rest),
  };
};

export default init;
