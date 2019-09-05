// @flow strict
import type { $Request } from "express";

import { makeUserId } from "../session/ids";
import isUUID from "../utils/isUUID";
import { USER_ID } from "../../consts/cookies";

type Query = {|
  userId: string,
  user_id?: string,
|};

type reqInfo = {|
  req: $Request,
  query: Query,
|};

const handleUserId = (id: string) => (isUUID(id) ? id : makeUserId());

const userMiddleware = ({ req, query }: reqInfo) => {
  const { userId, user_id } = query;

  return handleUserId(userId || user_id || (req.cookies && req.cookies[USER_ID]));
};

export default userMiddleware;
