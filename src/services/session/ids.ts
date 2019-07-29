import v4 from "uuid/v4";

export const makeUserId = () => v4();

export const makeSessionId = () => v4().substring(0, 8);

export const makePageViewId = () => v4().substring(0, 8);
