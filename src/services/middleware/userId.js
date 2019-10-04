// @flow strict
import type { $Request, $Response, NextFunction } from "express";

import isUUID from "../utils/isUUID";
import { makeUserId } from "../session/ids";
import { USER_ID } from "../../consts/cookies";

const addCookie = (req: $Request, res: $Response) => {
  if (req.cookies[USER_ID] && isUUID(req.cookies[USER_ID])) {
    // https://stackoverflow.com/questions/44664555/extending-express-request-class-in-flow
    // $FlowExpected: assigning request property
    req[USER_ID] = req.cookies[USER_ID];
    return;
  }

  const newId = makeUserId();
  // $FlowExpected: assigning request property
  req[USER_ID] = newId;
  res.cookie(USER_ID, newId);
};

function userMiddleWare(req: $Request, res: $Response, next: NextFunction) {
  addCookie(req, res);

  return next();
}

export default userMiddleWare;
