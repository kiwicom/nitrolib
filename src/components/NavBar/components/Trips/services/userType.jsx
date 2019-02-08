// @flow strict
import type { Auth } from "../../../../../records/Auth";

const userName = (auth: Auth) => {
  switch (auth.type) {
    case "user":
      return `${auth.user.firstname} ${auth.user.lastname}`;
    case "magic":
      return auth.email;
    case "token":
      return "";
    default:
      return auth.email;
  }
};

export default userName;
