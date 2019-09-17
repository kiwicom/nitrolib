// @flow strict
import type { $Request, $Response, NextFunction } from "express";

import isUUID from "../utils/isUUID";
import { makeUserId } from "../session/ids";
import { USER_ID } from "../../consts/cookies";

const addCookie = (req: $Request, res: $Response) => {
  if (req.cookies[USER_ID] && isUUID(req.cookies[USER_ID])) {
    return req.cookies[USER_ID];
  }

  return res.cookie(USER_ID, makeUserId());
};

function userMiddleWare(req: $Request, res: $Response, next: NextFunction) {
  addCookie(req, res);

  return next();
}

export default userMiddleWare;
